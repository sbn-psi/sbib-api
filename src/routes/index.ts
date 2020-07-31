import * as express from "express";
import {getRepository} from "typeorm";
import {Target} from "../entity/Target";
import imageRoutes from "./images";
import placeRoutes from "./places";
import sequenceRoutes from "./sequences";


export const register = ( app: express.Application ) => {

    app.get( "/", ( req, res ) => {
        res.send( "Hello world!" )
    } )

    app.use( "/images", imageRoutes)
    app.use( "/places", placeRoutes)
    app.use( "/sequences", sequenceRoutes)

    app.get( "/targets", async (req, res, next) => {
        const targetRepository = getRepository(Target)
        try {
            const results = await targetRepository.find()
            res.send(results)
        } catch(err) {
            next(err)
        }
    })

};