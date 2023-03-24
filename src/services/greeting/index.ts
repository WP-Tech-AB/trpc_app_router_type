import { Trpc } from '../../trpc';

export type GreetingRouter = ReturnType<typeof createGreetingRouter>;

export const createGreetingRouter = (trpc: Trpc) => {
  return trpc.router({
    hello: trpc.procedure.query(async () => {
      return 'hello';
    })
  });
};
