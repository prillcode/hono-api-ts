import createApp from "@/lib/create-app";

import configureOpenAPI from "@/lib/configure-open-api";
import index from "@/routes/index.route"

//re-usable "createApp" function that adds all the middlewares, etc
const app = createApp();

//Routes...
const routes = [
    index,
];

configureOpenAPI(app);

routes.forEach((r) => {
    app.route("/", r);
});


export default app;
