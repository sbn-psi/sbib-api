import * as express from "express";
import {getRepository, FindManyOptions} from "typeorm";
import { Image } from "../entity/Image";

const router = express.Router()
const images = () => getRepository(Image);

router.use(express.json())

router.get( "/:imageId", async (req, res, next) => {
    const imageId = req.params.imageId
    try {
        const params: FindManyOptions = {where: { id: imageId }, relations: ['footprints']}
        const results = await images().find(params)
        console.log(results);
        res.send(results)
    } catch(err) {
        next(err)
    }
})

export default router