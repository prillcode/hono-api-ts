import createApp from "@/lib/create-app";

//re-usable "createApp" function that adds all the middlewares, etc
const app = createApp();

//Routes...

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.get('/error', (c) => {
    throw new Error("This is an error");
});

export default app;
