**Tutorial: [Build a documented / type-safe API with hono, drizzle, zod, OpenAPI and scalar ](https://www.youtube.com/watch?v=sNh9PoM9sUE)** 


**Install pnpm (if needed):**  
```
npm install pnpm -global
```

**Add Dependencies:**   
cd into project directory, then run:
```
pnpm install
```

**Create .env file in root**  
Add values:  
```
NODE_ENV=development
PORT=9000
LOG_LEVEL=debug
```

**Run App:**
```
pnpm run dev
open http://localhost:9000 (or whatever port is defined in env file)
```

## More Info  

Describe Scalar integration with Hono
[More Info](https://github.com/scalar/scalar/tree/701fd3f5482c045452acc0b41eb4ac23f1800038/integrations/hono)

