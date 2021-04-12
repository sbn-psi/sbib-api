import * as express from "express";
import { getRepository, FindManyOptions, LessThanOrEqual, Like } from "typeorm";
import { Image } from "../entity/Image";
import { parseQueryString } from './index';

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

function pnpoly(xp: Array<any>, yp: Array<any>, lon: number, lat: number): boolean {
    var c = false;
    
    for (let i = 0, j = xp.length - 1; i < xp.length; j = i++) {
        const polyLat = xp[i];
        const polyLon = yp[i];

        const previousPolyLat = xp[j];
        const previousPolyLon = yp[j];
  
      if (( ((polyLon<=lat) && (lat<previousPolyLon)) ||
           ((previousPolyLon<=lat) && (lat<polyLon)) ) &&
          (lon < (previousPolyLat - polyLat) * (lat - polyLon) / (previousPolyLon - polyLon) + polyLat))
        c = !c;
    }

    return c;
};

router.get( "/search", async ( req, res, next ) => {
    const queryParams: any = parseQueryString( req.query )
    console.log(queryParams);

    if (!queryParams['page_size'] || !queryParams['start']) {
        let missing = []
        if (!queryParams['page_size']) missing.push('page_size')
        if (!queryParams['start']) missing.push('start')
        res.status(400).send(`Parameter(s) missing from request: ${missing.join(', ')}`)
    } else {
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
    
        let params: any = {
            where: where,
            take: queryParams.page_size,
            skip: queryParams.start,
            order: {
                id: 'ASC'
            },
        };
    
        try {
            const results = await (await imageRepository().find(params))
            if ( queryParams.latitude && queryParams.longitude ) {
                const lat = queryParams.latitude;
                const lon = queryParams.longitude;
    
                res.send(results.filter(function latLonFilter( image: Image, index: number, array: Image[] ) {
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
                console.log('no lat/lon search.')
                res.send(results)
            }
        } catch(err) {
            next(err)
        }
    }
})

export default router