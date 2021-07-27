import * as express from "express";
import imageRoutes from "./images";
import placeRoutes from "./places";
import sequenceRoutes from "./sequences";
import missionPhaseRoutes from "./missionPhases";
import instrumentRoutes from "./instrument";
import targetRoutes from "./target";
import path from "path";

export const register = ( app: express.Application ) => {

    /* CLIENT APP */
    app.use( "/", express.static( path.resolve( __dirname, "../client" ) ) )

    app.get( "/ceres", (req, res) => { res.sendFile( path.resolve( __dirname, "../client/index.html" ) ) })
    app.get( "/eros", (req, res) => { res.sendFile( path.resolve( __dirname, "../client/index.html" ) ) })
    app.get( "/67p", (req, res) => { res.sendFile( path.resolve( __dirname, "../client/index.html" ) ) })

    /* API ENDPOINTS */
    app.get( "/api", ( req, res ) => {
        res.send( "Hello API world!" )
    } )

    app.use( "/api/images", imageRoutes )
    app.use( "/api/places", placeRoutes )
    app.use( "/api/sequences", sequenceRoutes )
    app.use( "/api/missionPhases", missionPhaseRoutes )
    app.use( "/api/instrument", instrumentRoutes )
    app.use( "/api/targets", targetRoutes )

    /* CATCH-ALL REDIRECT */
    app.use( "*", (req, res) => {
        res.sendFile( path.resolve( __dirname, "../client/index.html" ) )
    } )
};

const sbibParams: string[] = [
    'imageName',
    'latitude',
    'longitude',
    'sequenceTitles',
    'missionPhase',
    'instrument',
    'resolution',
    'targetId',
    // SQL parameters
    'page_size',
    'start',
];

export function parseQueryString( query: any ): object {
    const responseParams: {
        [index: string]: any
    } = {};

    // assure that only valid parameters are parsed
    sbibParams.map( ( param: string ) => {
        const value = query[param];
        responseParams[param] = value;
    });

    return responseParams;
}