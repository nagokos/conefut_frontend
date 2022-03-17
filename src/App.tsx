import { ThemeProvider } from '@emotion/react';
import { memo, VFC } from 'react';
import { routes } from './router/Router';
import { theme } from './assets/theme/theme';
import { Header, SnackbarNotification } from './components/index';
import { useGetCurrentUserQuery } from './generated/graphql';
import { useRoutes } from 'react-router-dom';
import { Box } from '@mui/material';

export const App: VFC = memo(() => {
  const [data] = useGetCurrentUserQuery();

  const routing = useRoutes(routes(!!data.data?.getCurrentUser));

  return (
    <>
      {data.fetching ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <Box>
            <img src="/src/assets/img/main-logo.png" width="30" height="30" />
          </Box>
        </Box>
      ) : (
        <ThemeProvider theme={theme}>
          <Header />
          <SnackbarNotification />
          {routing}
        </ThemeProvider>
      )}
    </>
  );
});
