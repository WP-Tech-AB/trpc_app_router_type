import { createGreetingRouter, GreetingRouter } from '../services/greeting';
import { createTrpc, TrpcRouter } from '../trpc';

export type AppRouter = TrpcRouter<{ greeting: GreetingRouter }>;

export const main = async () => {
  const trpc = createTrpc();
  const appRouter: AppRouter = trpc.router({
    greeting: createGreetingRouter(trpc)
  });
};
