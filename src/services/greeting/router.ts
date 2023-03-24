import { GreetingService } from '.';
import { Trpc } from '../../trpc';
export type GreetingRouter = ReturnType<typeof createGreetingRouter>;

export const createGreetingRouter = (
  greetingService: GreetingService,
  trpc: Trpc
) => {
  return trpc.router({
    hello: trpc.procedure.query(async () => {
      return greetingService.hello();
    })
  });
};
