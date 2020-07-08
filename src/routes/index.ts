import * as express from "express";
import {getRepository} from "typeorm";
import {Meta} from "../entity/Meta";
import {Seq} from "../entity/Seq";
import {Image} from "../entity/Image";


export const register = ( app: express.Application ) => {

    // define a route handler for the default home page
    app.get( "/", ( req, res ) => {
        res.send( "Hello world!" );
    } );

    app.get( "/meta", async (req, res, next) => {
        const metaRepository = getRepository(Meta)
        try {
            const results = await metaRepository.find()
            res.send(results)
        } catch(err) {
            next(err)
        }
    })

    app.get( "/sequences", async (req, res, next) => {
        const sequenceRepository = getRepository(Seq)
        try {
            const results = await sequenceRepository.find()
            res.send(results)
        } catch(err) {
            next(err)
        }
    })

    app.get( "/images", async (req, res, next) => {
        const imageRepository = getRepository(Image)
        try {
            const results = await imageRepository.find({take: 10})
            res.send(results)
        } catch(err) {
            next(err)
        }
    })

    app.get( "/images/count", async (req, res, next) => {
        const imageRepository = getRepository(Image)
        try {
            const results = await imageRepository.count()
            res.json({count: results})
        } catch(err) {
            next(err)
        }
    })

    app.get( "/images/:id", async (req, res, next) => {
        const imageRepository = getRepository(Image)
        const id = req.params.id

        try {
            const results = await imageRepository.find({where: { id }})
            res.send(results)
        } catch(err) {
            next(err)
        }
    })

};