import * as express from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { Seq } from "../entity/Seq";

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
    const targetId = req.params.targetId
    try {
        const results = await createQueryBuilder( Seq )
            .select( '*' )
            .where( { targetId: targetId } )
            .distinct( true )
            .getRawMany();
        res.json( results )
    } catch( err ) {
        next( err )
    }
})

router.get( "/count/:targetId", async (req, res, next) => {
    const targetId = req.params.targetId
    try {
        const params = targetId ? {where: {targetId: targetId}} : null
        const results = await sequenceRepository().count(params)
        res.json(results)
    } catch(err) {
        next(err)
    }
})

router.get( "/single/:targetId", async (req, res, next) => {
    const targetId = req.params.targetId
    try {
        const results = await sequenceRepository().find( { where: { targetId: targetId } } )
        res.json(results)
    } catch(err) {
        next(err)
    }
})

export default router