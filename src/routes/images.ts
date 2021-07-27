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

// i tried to refactor this function
// i tried
// i tried
// i could not get tests to pass
// i cried
// i cried
// why o why must this function be so in my head
// couldnt that ice cream truck have hit me instead

// function pnpoly(xp: Array<any>, yp: Array<any>, lon: number, lat: number): boolean {
//     var c = false;

//     for (let i = 0, j = xp.length - 1; i < xp.length; j = i++) {
//         const polyLat = xp[i];
//         const polyLon = yp[i];

//         const previousPolyLat = xp[j];
//         const previousPolyLon = yp[j];

//       if (( ((polyLon<=lat) && (lat<previousPolyLon)) ||
//            ((previousPolyLon<=lat) && (lat<polyLon)) ) &&
//           (lon < (previousPolyLat - polyLat) * (lat - polyLon) / (previousPolyLon - polyLon) + polyLat))
//         c = !c;
//     }

//     return c;
// };

function pnpoly( npol: number, xp: any[], yp: any[], x: number, y: number): boolean {
    let i = 0;
    let j = 0;
    let c = false;
    for (i = 0, j = npol-1; i < npol; j = i++) {
      if (
      (
        (
          (yp[i]<=y) && (y<yp[j])
        )
        ||
        (
          (yp[j]<=y) && (y<yp[i])
        )
      )
      &&
          (x < (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])
    ) {
      c = !c;
    }
    }// for
    return c;
  }

interface SearchResponse {
    data: Image[],
    records: number,
    page_size?: number,
    start?: number,
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
                if (!image.footprint) {
                    return null
                } else {
                    const footprintList: string[] = image.footprint.split(", ")

                    const polyX: any[] = []
                    const polyY: any[] = []

                    footprintList.forEach( (item: string ) => {
                        const coordinate = item.trim().split(" ")
                        polyX.push(parseFloat(coordinate[0]))
                        polyY.push(parseFloat(coordinate[1]))
                    })

                    const ans = pnpoly(polyX.length,polyX,polyY,lon,lat)
                    return (ans) ? image : null
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