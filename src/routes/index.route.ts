import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";


const router = createRouter()
    .openapi(createRoute({
        method: "get",
        path: "/",
        tags: ["Index"],
        responses: {
            [HttpStatusCodes.OK]: jsonContent(
                createMessageObjectSchema("My Hono API"),
                "My Hono API Index"
            ),
        },
    }),
        (c) => {
            return c.json({
                message: "Welcome to My Hono API",
            }, HttpStatusCodes.OK);
        }
    );

export default router;

