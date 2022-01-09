import { ThemeProvider } from '@emotion/react';
import { memo, VFC } from 'react';
import { Router } from './router/Router';
import { theme } from './assets/theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/index';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';

export const App: VFC = memo(() => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Header />
          <Router />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
});
