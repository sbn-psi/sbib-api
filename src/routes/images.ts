import * as express from "express";
import {getRepository, FindManyOptions} from "typeorm";
import {Image} from "../entity/Image";

const router = express.Router()
const imageRepository = () => getRepository(Image)

router.use(express.json())

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
        const params = targetId ? {where: {target: {id: targetId}}} : null
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

export default router