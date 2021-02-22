import * as express from "express";
import { createQueryBuilder } from "typeorm";
import { Image } from "../entity/Image";

const router = express.Router()

router.use(express.json())

router.get( "/", async (req, res, next) => {
    try {
        res.send("hello, mission phases!")
    } catch (error) {
        next(error)
    }
})

router.get( "/all/:targetId", async (req, res, next) => {
    const targetId: string = req.params.targetId
    try {
        const results = await createQueryBuilder(Image)
            .select('mission_phase')
            .where({targetId})
            .distinct(true)
            .getRawMany();
        res.send(results)
    } catch (error) {
        next(error)
    }
})

export default router