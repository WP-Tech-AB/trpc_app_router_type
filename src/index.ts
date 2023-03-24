import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import fetch from 'cross-fetch';
import { app, AppRouter } from './app';

const main = async () => {
  await app();

  const trpcClient = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: 'http:localhost:3000/trpc', fetch })]
  });
  const helloGreeting = await trpcClient.greeting.hello.query();
  console.log({ helloGreeting });
};

main();
