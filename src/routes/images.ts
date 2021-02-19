import * as express from "express";
import { getRepository, FindManyOptions, LessThanOrEqual, Like } from "typeorm";
import { Image } from "../entity/Image";

const router = express.Router()
const imageRepository = () => getRepository(Image)

router.use(express.json())

router.get( "/", async (req, res, next) => {
    try {
        const results = await imageRepository().find();
        res.send(results);
    } catch(err) {
        next(err);
    }
})

router.post( "/", async (req, res, next) => {
    try {
        const image = req.body
        if(Image.validate(image)) {
            imageRepository().save(image)
            res.sendStatus(201)
        } else {
            res.sendStatus(400)
        }
    } catch(err) {
        next(err)
    }
})

router.get( "/all/:target", async (req, res, next) => {
    const target = req.params.target
    try {
        const params: FindManyOptions = target ? {where: {target: {id: target}}} : {take: 10}
        params.select = Image.shortKeys
        const results = await imageRepository().find(params)
        res.send(results)
    } catch(err) {
        next(err)
    }
})

router.get( "/count/:target", async (req, res, next) => {
    const targetId = req.params.target
    try {
        const params: FindManyOptions = targetId ? {where: {target: {id: targetId}}} : null
        const results = await imageRepository().count(params)
        res.json({count: results})
    } catch(err) {
        next(err)
    }
})

router.get( "/single/:id", async (req, res, next) => {
    const id = req.params.id
    try {
        const results = await imageRepository().find({where: { id }})
        res.send(results)
    } catch(err) {
        next(err)
    }
})

const sbibParams: string[] = [
    'imageName',
    'latitude',
    'longitude',
    'sequence',
    'instrument',
    'resolution'
];

function pnpoly(xp: Array<any>, yp: Array<any>, lon: number, lat: number): boolean {
    var i = 0;
    var j = 0;
    var c = false;
    for (i = 0, j = xp.length - 1; i < xp.length; j = i++) {
        const polyLat = xp[i];
        const polyLon = yp[i];

        if (
            (
                (
                    (polyLon <= lon)
                    &&
                    (lon < yp[j])
                )
                ||
                (
                    (yp[j] <= lon)
                    &&
                    (lon < polyLon)
                )
            )
            &&
            (lat < (xp[j] - polyLat) * (lon - polyLon) / (yp[j] - polyLon) + polyLat)
        ) {
            c = !c;
        }
    }
    return c;
}

router.get( "/search", async ( req, res, next ) => {
    const queryParams: any = parseQueryString( req.query )

    let where: any = {
        target: { id: 2 },
        minRes: queryParams.resolution ? LessThanOrEqual(queryParams.resolution) : null,
        instrument: queryParams.instrument ? queryParams.instrument : null,
        imageName: queryParams.imageName ? Like(`%${queryParams.imageName}%`) : null,
        sequenceTitle: queryParams.sequence ? queryParams.sequence : null,
        // latitude: queryParams.latitude ? queryParams.latitude : null,
        // longitude: queryParams.longitude ? queryParams.longitude : null,
    };

    Object.keys(where).map(key => {
        if (where[key] === null) delete where[key];
    });

    let params: any = { where };

    try {
        const results = await (await imageRepository().find(params))
        if ( queryParams.latitude || queryParams.longitude ) {
            const lat = queryParams.latitude;
            const lon = queryParams.longitude;

            res.send(results.filter(function latLonFilter( image: Image, index: number, array: Image[] ) {
                const imageCoords = {
                    minLat: image.minLat,
                    maxLat: image.maxLat,
                    minLon: image.minLon,
                    maxLon: image.maxLon,
                };
                if (!image.footprint) {
                    return false;
                } else {
                    const footprintList: Array<string> = image.footprint.split(", ");
                    let polyX: Array<any> = [];
                    let polyY: Array<any> = [];
                    footprintList.forEach( (item: string, index: number ) => {
                        const coordinate = item.split(" ");
                        polyX.push(parseFloat(coordinate[0]));
                        polyY.push(parseFloat(coordinate[1]));
                    })

                    let ans = pnpoly(polyX,polyY,lon,lat);
                    if (ans) console.log('found one!!!');
                    return (ans) ? image : null;
                }
                return image
            }))
        } else {
            res.send(results)
        }
    } catch(err) {
        next(err)
    }
})

function parseQueryString( query: any ): Object {
    let responseParams: {
        [index: string]: any
    } = {};
    
    // assure that only valid parameters are parsed
    sbibParams.map( ( param: string ) => {
        const value = query[param]
        responseParams[param] = value;
    });
    
    return responseParams;
}

export default router