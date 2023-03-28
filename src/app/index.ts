import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createGreetingService, GreetingService } from "../services";
import { createTrpc } from "../trpc";

type Services = { greeting: GreetingService };

function createAppRouter(services: Services) {
  const trpc = createTrpc();

  type AppRouter = {
    [k in keyof Services]: ReturnType<Services[k]["createRouter"]>;
  };

  const serviceEntries = Object.entries(services);

  const routerEntries = serviceEntries.map(([serviceName, service]) => {
    return [serviceName, service.createRouter(trpc)];
  });

  const appRouter = Object.fromEntries(routerEntries) as AppRouter;

  return createTrpc().router(appRouter);
}

export type AppRouter = ReturnType<typeof createAppRouter>;

export const app = async () => {
  const services = {
    greeting: createGreetingService(),
  };

  const appRouter = createAppRouter(services);

  const app = express();
  app.use(express.json());
  app.get("/", (req, res) => {
    res.sendStatus(200);
  });
  app.use("/trpc", trpcExpress.createExpressMiddleware({ router: appRouter }));
  const port = 3000;
  return new Promise<void>((resolve, reject) => {
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
      resolve();
    });
  });
};
