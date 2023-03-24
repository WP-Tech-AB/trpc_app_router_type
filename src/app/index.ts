import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { createGreetingRouter, GreetingRouter } from '../services/greeting';
import { createTrpc, TrpcRouter } from '../trpc';
export type AppRouter = TrpcRouter<{ greeting: GreetingRouter }>;

export const app = async () => {
  const trpc = createTrpc();
  const appRouter: AppRouter = trpc.router({
    greeting: createGreetingRouter(trpc)
  });
  const app = express();
  app.use(express.json());
  app.get('/', (req, res) => {
    res.sendStatus(200);
  });
  app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));
  const port = 3000;
  return new Promise<void>((resolve, reject) => {
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
      resolve();
    });
  });
};
