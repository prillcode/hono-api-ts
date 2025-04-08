import { OpenAPIHono } from "@hono/zod-openapi";
import { pinoLogger } from "hono-pino";
import { requestId } from "hono/request-id";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

//import typed env schema
import env from "@/env";

//log env values to console
console.log("PORT from .env:", env.PORT);
console.log("LOG_LEVEL from .env:", env.LOG_LEVEL);

//Default "createApp" function
export default function createApp() {
    //Main app object
    const app = new OpenAPIHono({
        strict: false,
    });

    //Add Middlewares...
    app.use(
        //requestId middleware from 'hono' library (so each request has a Guid)
        requestId(),
        //serve Emoji favicon middleware from CJ's 'stoker' library
        serveEmojiFavicon("🌱"),
        //pinoLogger with pino-pretty from 'hono-pino' library
        pinoLogger({
            pino: {
                level: env.LOG_LEVEL || "info",
                transport: {
                    target: "pino-pretty",
                },
            },
        }),
    );


    //Handle 404s
    app.notFound(notFound);
    //Hanlde Errors
    app.onError(onError);

    //Return the app object
    return app;
}
