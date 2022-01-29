import { ThemeProvider } from '@emotion/react';
import { memo, VFC } from 'react';
import { routes } from './router/Router';
import { theme } from './assets/theme/theme';
import { Header, SnackbarNotification } from './components/index';
import { useGetCurrentUserQuery } from './generated/graphql';
import { currentUser } from './reactive/user';
import { useRoutes } from 'react-router-dom';
import { useLocationChange } from './hooks';

export const App: VFC = memo(() => {
  const { loading, data } = useGetCurrentUserQuery();
  currentUser(data?.getCurrentUser);

  useLocationChange(async () => {
    if (!currentUser()) {
      currentUser(data?.getCurrentUser);
    }
  });

  const routing = useRoutes(routes(!!currentUser()));

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
