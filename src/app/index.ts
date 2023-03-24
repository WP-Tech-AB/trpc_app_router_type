import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import {
  createGreetingRouter,
  createGreetingService
} from '../services';
import { createTrpc } from '../trpc';

function createAppRouter() {
  const trpc = createTrpc();

  const greetingService = createGreetingService();
  return createTrpc().router({
    greeting: createGreetingRouter(greetingService, trpc),
  });
}

export type AppRouter = ReturnType<typeof createAppRouter>;

export const app = async () => {
  const appRouter = createAppRouter();

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
