import { Trpc } from "../../trpc";
import { createGreetingRouter } from "./router";

export * from "./router";

export const createGreetingService = () => {
  const api = {
    hello: () => {
      return "Hello, world!";
    },
  };

  return {
    api,
    createRouter: (trpc: Trpc) => createGreetingRouter(api, trpc),
  };
};

export type GreetingServiceApi = ReturnType<
  typeof createGreetingService
>["api"];

export type GreetingService = ReturnType<typeof createGreetingService>;
