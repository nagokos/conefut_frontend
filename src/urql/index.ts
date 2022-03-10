import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';

export const client = createClient({
  url: 'http://localhost:8080/query',
  exchanges: [devtoolsExchange, dedupExchange, cacheExchange, fetchExchange],
  fetchOptions: () => ({
    credentials: 'include',
  }),
});
