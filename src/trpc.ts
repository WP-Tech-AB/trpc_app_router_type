import {
  DefaultDataTransformer,
  DefaultErrorShape,
  initTRPC,
  ProcedureRouterRecord,
  RootConfig,
  Router
} from '@trpc/server';

import { RouterDef } from '@trpc/server/dist/core/router';

export const createTrpc = () => {
  return initTRPC.create({});
};

export type Trpc = ReturnType<typeof createTrpc>;

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
