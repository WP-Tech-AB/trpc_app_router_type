import { GreetingServiceApi } from ".";
import { Trpc } from "../../trpc";
export type GreetingRouter = ReturnType<typeof createGreetingRouter>;

export const createGreetingRouter = (
  greetingServiceApi: GreetingServiceApi,
  trpc: Trpc
) => {
  return trpc.router({
    hello: trpc.procedure.query(async () => {
      return greetingServiceApi.hello();
    }),
  });
};
