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

router.get( "/all/:targetId", async (req, res, next) => {
    const targetId: string = req.params.targetId
    try {
        const params: FindManyOptions = {
            select: Image.shortKeys,
            where: targetId
        };
        const results = await imageRepository().find(params)
        res.send(results)
    } catch(err) {
        next(err)
    }
})

router.get( "/count/:targetId", async (req, res, next) => {
    const targetId: string = req.params.targetId
    try {
        const results = await imageRepository().count({where:{targetId}});
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
    'sequenceTitle',
    'missionPhase',
    'instrument',
    'resolution',
    'targetId',
];

function pnpoly(xp: Array<any>, yp: Array<any>, x: number, y: number): boolean {
    var i, j = 0;
    var c = false;
    
    for (i = 0, j = xp.length-1; i < xp.length; j = i++) {
  
      if (( ((yp[i]<=y) && (y<yp[j])) ||
           ((yp[j]<=y) && (y<yp[i])) ) &&
          (x < (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i]))
        c = !c;
    }

    return c;
};

router.get( "/search", async ( req, res, next ) => {
    const queryParams: any = parseQueryString( req.query )
    console.log(queryParams);

    let where: any = {
        targetId: queryParams.targetId ? queryParams.targetId : null,
        minRes: queryParams.resolution ? LessThanOrEqual(queryParams.resolution) : null,
        instrument: queryParams.instrument ? queryParams.instrument : null,
        imageName: queryParams.imageName ? Like(`%${queryParams.imageName}%`) : null,
        sequenceTitle: queryParams.sequenceTitle ? queryParams.sequenceTitle : null,
        missionPhase: queryParams.missionPhase ? queryParams.missionPhase : null,
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
                    return null;
                } else {
                    const footprintList: Array<string> = image.footprint.split(", ");
                    let polyX: Array<any> = [];
                    let polyY: Array<any> = [];
                    footprintList.forEach( (item: string ) => {
                        const coordinate = item.trim().split(" ");
                        polyX.push(parseFloat(coordinate[0]));
                        polyY.push(parseFloat(coordinate[1]));
                    })

                    console.log('polyX',polyX);
                    console.log('polyY',polyY);

                    let ans = pnpoly(polyX,polyY,lon,lat);
                    if (ans) console.log('found one!!!');
                    return (ans) ? image : null;
                }
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
        const value = query[param];
        responseParams[param] = value;
    });
    
    return responseParams;
}

export default router