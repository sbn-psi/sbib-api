import express from "express"
import dotenv from "dotenv";
import * as routes from "./routes";
import { createConnection } from 'typeorm';
import { backOff } from "exponential-backoff";

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const port = process.env.SERVER_PORT;

// Configure routes
routes.register( app );

async function connectToDatabase() {
    try {
        const backoffOptions = {
            delayFirstAttempt: true,
            startingDelay: 1000
        }
        await backOff(createConnection, backoffOptions);
    } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err)
        process.exit(1)
    }
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


