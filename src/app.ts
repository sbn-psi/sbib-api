import express from "express"
import dotenv from "dotenv";
import * as routes from "./routes";
import { createConnection } from 'typeorm';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

// Configure routes
routes.register( app );

async function connectToDatabase() {
    const connection = await createConnection();
}
connectToDatabase().then(() => {
    // start the express server
    app.listen( port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );
}, (error: Error )=> {
    // tslint:disable-next-line:no-console
    console.log(error)
    process.exit(1)
})


