import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import fetch from 'cross-fetch';
import { AppRouter, main } from './app';

const run = async () => {
  await main();

  const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: 'http:localhost:3000/trpc', fetch })]
  });
  const hello = await trpcClient.greeting.hello.query();
  console.log({ hello });
};

run();
