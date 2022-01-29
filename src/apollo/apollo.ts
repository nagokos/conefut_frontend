import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  credentials: 'include',
  cache: new InMemoryCache(),
});
