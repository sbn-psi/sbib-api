import * as express from "express";
import imageRoutes from "./images";
import placeRoutes from "./places";
import sequenceRoutes from "./sequences";
import missionPhaseRoutes from "./missionPhases";
import instrumentRoutes from "./instrument";
import targetRoutes from "./target";

export const register = ( app: express.Application ) => {

    app.get( "/", ( req, res ) => {
        res.send( "Hello world!" )
    } )

    app.use( "/images", imageRoutes )
    app.use( "/places", placeRoutes )
    app.use( "/sequences", sequenceRoutes )
    app.use( "/missionPhases", missionPhaseRoutes )
    app.use( "/instrument", instrumentRoutes )
    app.use( "/targets", targetRoutes )
};