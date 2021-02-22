import * as express from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { Seq } from "../entity/Seq";
import { Image } from "../entity/Image";

const router = express.Router()
const sequenceRepository = () => getRepository(Seq)

router.use(express.json())

router.post( "/", async (req, res, next) => {
    try {
        const seq = req.body
        if(Seq.validate(seq)) {
            sequenceRepository().save(seq)
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
        const results = await createQueryBuilder(Image)
            .select('sequence_title')
            .where({targetId})
            .distinct(true)
            .getRawMany();
        res.send(results)
    } catch (error) {
        next(error)
    }
})

router.get( "/count/:targetId", async (req, res, next) => {
    const targetId: string = req.params.targetId
    try {
        const results = await sequenceRepository().count({where:{targetId}})
        res.json(results)
    } catch(err) {
        next(err)
    }
})

router.get( "/single/:id", async (req, res, next) => {
    const id = req.params.id
    try {
        const results = await sequenceRepository().find( { where: { id } } )
        res.json(results)
    } catch(err) {
        next(err)
    }
})

export default router