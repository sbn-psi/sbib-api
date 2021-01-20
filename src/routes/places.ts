import * as express from "express";
import {getRepository, FindManyOptions} from "typeorm";
import {Place} from "../entity/Place";

const router = express.Router()
const placesRepository = () => getRepository(Place)

router.use(express.json())

router.post( "/", async (req, res, next) => {
    try {
        const place = req.body
        if(Place.validate(place)) {
            placesRepository().save(place)
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
        const results = await placesRepository().find(params)
        res.send(results)
    } catch(err) {
        next(err)
    }
})

router.get( "/count/:target", async (req, res, next) => {
    const targetId = req.params.target
    try {
        const params = targetId ? {where: {target: {id: targetId}}} : null
        const results = await placesRepository().count(params)
        res.json({count: results})
    } catch(err) {
        next(err)
    }
})

router.get( "/single/:id", async (req, res, next) => {
    const id = req.params.id

    try {
        const results = await placesRepository().find({where: { id }})
        res.send(results)
    } catch(err) {
        next(err)
    }
})

export default router