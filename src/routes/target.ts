import * as express from "express";
import { getRepository, FindManyOptions, LessThanOrEqual, Like, createQueryBuilder } from "typeorm";
import { Target } from "../entity/Target";

const router = express.Router()
const targetRepository = () => getRepository(Target)

router.use(express.json())

router.get( "/", async (req, res, next) => {
    try {
        res.send("hello, targets!")
    } catch (error) {
        next(error)
    }
})

router.get( "/single/:id", async (req, res, next) => {
    const id: string = req.params.id
    try {
        const results = await targetRepository().find({where:{id}})
        res.send(results)
    } catch (error) {
        next(error)
    }
})

router.get( "/all", async (req, res, next) => {
    try {
        const results = await targetRepository().find()
        res.send(results)
    } catch(err) {
        next(err)
    }
})

export default router