import { serve } from "@hono/node-server";
import app from "./app";
import env from "./env";


//Serve the app...
serve({
  fetch: app.fetch,
  port: env.PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port} with LOG_LEVEL:${env.LOG_LEVEL}`);
});
