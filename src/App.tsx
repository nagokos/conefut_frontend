import { ThemeProvider } from '@emotion/react';
import { memo, VFC } from 'react';
import { routes } from './router/Router';
import { theme } from './assets/theme/theme';
import { Header, SnackbarNotification, EmailVerificationAlert } from './components/index';
import { EmailVerificationStatus, useGetCurrentUserQuery } from './generated/graphql';
import { useRoutes } from 'react-router-dom';
import { Box } from '@mui/material';
import { useLocationChange } from './hooks';

export const App: VFC = memo(() => {
  const [data] = useGetCurrentUserQuery();

  const routing = useRoutes(routes(!!data.data?.getCurrentUser));

  useLocationChange(() => {
    window.scrollTo(0, 0);
  });

  const isNeedAlert = (): boolean => {
    console.log(data.data?.getCurrentUser?.emailVerificationStatus);
    if (data.data?.getCurrentUser?.emailVerificationStatus !== EmailVerificationStatus.Pending) return false;
    return (
      location.pathname === '/' ||
      (location.pathname.includes('recruitments') &&
        !location.pathname.includes('new') &&
        !location.pathname.includes('edit'))
    );
  };

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
          {isNeedAlert() && <EmailVerificationAlert />}
          <SnackbarNotification />
          {routing}
          {/* <Divider sx={{ borderColor: '#ebf2f2' }} /> */}
          {/* <Footer /> */}
        </ThemeProvider>
      )}
    </>
  );
});
