import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import fetch from 'cross-fetch';
import { AppRouter, main } from './app';
main();

const run = async () => {
  const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: 'http:localhost:3000/api/trpc', fetch })]
  });
  const hello = await trpcClient.greeting.hello.query();
  console.log({ hello });
};
run();
