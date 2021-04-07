import * as express from "express";
import { createQueryBuilder } from "typeorm";
import { Image } from "../entity/Image";

const router = express.Router()

router.use(express.json())

router.get( "/all/:targetId", async (req, res, next) => {
    const targetId = req.params.targetId
    try {
        const results = await createQueryBuilder( Image )
            .select( 'instrument' )
            .where( { targetId } )
            .distinct(true)
            .getRawMany();

        console.log(results)

        res.send( results )
    } catch( err ) {
        next( err )
    }
})

export default router