import {
  DefaultDataTransformer,
  DefaultErrorShape,
  initTRPC,
  ProcedureRouterRecord,
  RootConfig,
  Router
} from '@trpc/server';

import { RouterDef } from '@trpc/server/dist/core/router';

// Use factory instead of trpc singleton.
export const createTrpc = () => {
  return initTRPC.create({});
};

export type Trpc = ReturnType<typeof createTrpc>;

// TrpcRouter is needed to avoid singletons.
// ServiceRouter represents the routers the app wants to expose.
export type TrpcRouter<ServiceRouters extends ProcedureRouterRecord> = Router<
  RouterDef<
    RootConfig<{
      ctx: any;
      meta: any;
      errorShape: DefaultErrorShape;
      transformer: DefaultDataTransformer;
    }>,
    ServiceRouters
  >
>;
