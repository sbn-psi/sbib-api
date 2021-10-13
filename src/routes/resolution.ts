import * as express from "express";
import {getRepository, FindManyOptions} from "typeorm";
import { Image } from "../entity/Image";

const router = express.Router()
const images = () => getRepository(Image);

router.use(express.json())

router.get( "/:targetId", async (req, res, next) => {
    const targetId = req.params.targetId
    try {
        const params: FindManyOptions = {where: { targetId }, select: ['minRes']}
        const results = await images().find(params)
        results.sort( (a,b) => a.minRes < b.minRes ? -1 : 1 );
        res.send({
            min: results[0]['minRes'],
            max: results[results.length - 1]['minRes'],
        })
    } catch(err) {
        next(err)
    }
})

export default router