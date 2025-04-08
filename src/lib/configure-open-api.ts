import { AppOpenAPI } from "./types";

import packageJSON from '../../package.json';
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc("/docs", {
        openapi: "3.0.0",
        info: {
            version: packageJSON.version,
            title: "My Hono API",
        }
    });

    app.get(
        "/scalar",
        Scalar({
            theme: "kepler",
            url: "/docs",
            layout: "classic",
            defaultHttpClient: {
                targetKey: "js",
                clientKey: "axios"
            }
        })
    )
}
