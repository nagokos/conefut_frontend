import { ThemeProvider } from '@emotion/react';
import { memo, VFC } from 'react';
import { routes } from './router/Router';
import { theme } from './assets/theme/theme';
import { Header, SnackbarNotification } from './components/index';
import { useGetCurrentUserQuery } from './generated/graphql';
import { isLoggedIn } from './reactive/user';
import { useRoutes } from 'react-router-dom';

export const App: VFC = memo(() => {
  const { data, loading } = useGetCurrentUserQuery();

  const routing = useRoutes(routes(isLoggedIn(!!data?.getCurrentUser)));

  return (
    <ThemeProvider theme={theme}>
      {!loading && (
        <>
          <Header />
          <SnackbarNotification />
          {routing}
        </>
      )}
    </ThemeProvider>
  );
});
