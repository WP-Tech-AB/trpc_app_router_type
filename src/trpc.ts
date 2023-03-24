import {
  initTRPC
} from '@trpc/server';


// Use factory instead of trpc singleton.
export const createTrpc = () => {
  return initTRPC.create({});
};

export type Trpc = ReturnType<typeof createTrpc>;

