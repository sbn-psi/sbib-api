import * as express from "express";
import { Footprint } from "../entity/Footprint";
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

function pnpoly(npol: number, xp: any[], yp: any[], x: number, y: number): boolean {
    let i = 0;
    let j = 0;
    let c = false;
    for (i = 0, j = npol - 1; i < npol; j = i++) {
        if (
            (
                (
                    (yp[i] <= y) && (y < yp[j])
                )
                ||
                (
                    (yp[j] <= y) && (y < yp[i])
                )
            )
            &&
            (x < (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])
        ) {
            c = !c;
        }
    }
    return c;
}

interface SearchResponse {
    data: Image[],
    records: number,
    page_size?: number,
    start?: number,
}

function testPoly( footprint: Footprint, lon: number, lat: number ) {
    const footprintList: string[] = footprint.coordinates.split(", ");

    const polyX: any[] = [];
    const polyY: any[] = [];

    footprintList.forEach( ( item: string ) => {
        const coordinate = item.trim().split(" ");
        polyX.push(parseFloat(coordinate[0]));
        polyY.push(parseFloat(coordinate[1]));
    })

    return pnpoly(polyX.length,polyX,polyY,lon,lat);
}

router.get( "/search", async ( req, res, next ) => {
    const queryParams: any = parseQueryString( req.query )
    const where: object[] = [];

    if (queryParams.sequenceTitles) {
        queryParams.sequenceTitles.split(",").map(( seq: string ) => {
            where.push({
                targetId: queryParams.targetId ? queryParams.targetId : null,
                sequenceTitle: seq,
                missionPhase: queryParams.missionPhase ? queryParams.missionPhase : null,
                minRes: queryParams.resolution ? LessThanOrEqual(queryParams.resolution) : null,
                instrument: queryParams.instrument ? queryParams.instrument : null,
                imageName: queryParams.imageName ? Like(`%${queryParams.imageName}%`) : null,
            })
        })
    } else {
        where.push({
            targetId: queryParams.targetId ? queryParams.targetId : null,
            sequenceTitle: null,
            missionPhase: queryParams.missionPhase ? queryParams.missionPhase : null,
            minRes: queryParams.resolution ? LessThanOrEqual(queryParams.resolution) : null,
            instrument: queryParams.instrument ? queryParams.instrument : null,
            imageName: queryParams.imageName ? Like(`%${queryParams.imageName}%`) : null,
        })
    }

    where.map((list: object[]) => {
        Object.keys(list).map((key: any) => {
            if (list[key] === null) delete list[key];
        })
    })

    const params: any = {
        where,
        relations: ['footprints'],
    }

    if (!!queryParams.page_size && !!queryParams.start) {
        params.take = queryParams.page_size
        params.skip = queryParams.start
        params.order = { id: 'ASC' }
    }

    try {
        const response: SearchResponse = {
            data: null,
            records: null,
        }

        const data = await imageRepository().find(params)

        if ( queryParams.latitude && queryParams.longitude ) {
            const lat = queryParams.latitude
            const lon = queryParams.longitude

            response.data = data.filter(function latLonFilter( image: Image, index: number, array: Image[] ) {
                if (!image.footprints) {
                    return null
                } else {
                    let ans;
                    for (let i = 0; i < image.footprints.length; i++) {
                        ans = testPoly(image.footprints[i],lon,lat);
                        if (!!ans) return ans;
                    }
                    return ans;
                }
            })
        } else {
            console.log('no lat/lon search.')
            response.data = data
        }
        response.records = response.data.length
        res.send(response)
    } catch(err) {
        next(err)
    }
})

export default router