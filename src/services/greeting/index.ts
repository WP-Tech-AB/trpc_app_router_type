export * from './router';

export const createGreetingService = () => {
  return {
    hello: () => {
      return 'Hello, world!';
    }
  };
};

export type GreetingService = ReturnType<typeof createGreetingService>;
