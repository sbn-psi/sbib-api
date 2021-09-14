import * as express from "express";
import {getRepository, FindManyOptions} from "typeorm";
import {Footprint} from "../entity/Footprint";

const router = express.Router()
const footprint = () => getRepository(Footprint)

router.use(express.json())

router.get( "/:imageName", async (req, res, next) => {
    const imageName = req.params.imageName
    try {
        const params: FindManyOptions = {where: {imageName: imageName}}
        const results = await footprint().find(params)
        console.log(results);
        res.send(results)
    } catch(err) {
        next(err)
    }
})

export default router