import * as express from "express";
import { getRepository } from "typeorm";
import { Image } from "../entity/Image";

const router = express.Router()
const imageRepository = () => getRepository( Image )

router.use( express.json() )

router.get( "/", async ( req, res, next ) => {
    const params = parseQueryString( req.query )
    res.send( params )
})

function parseQueryString( query: any ): Object {
    let responseParams: {
        [index: string]: any
    } = {};
    // assure that only valid parameters are parsed
    const validParameters: {
        [index: string]: any
    } = [
        'searchString',
        'latitude',
        'longitude',
        'sequence',
        'instrument',
        'resolution'
    ];

    validParameters.map( ( param: string ) => {
        const value = query[param]
        responseParams[param] = value;
    });
    
    return responseParams;
}

export default router