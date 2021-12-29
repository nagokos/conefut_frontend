import { memo, useState, VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import { useSize } from '../../hooks/index';
import { TabCompetition } from '../index';
import { Divider, IconButton } from '@mui/material';

export const Header: VFC = memo(() => {
  const [search, setSearch] = useState<boolean>(false);
  const { isMobile } = useSize();

  const searchMove = () => {
    setSearch(true);
  };

  const searchLeave = () => {
    setSearch(false);
  };

  return (
    <>
      <AppBar sx={{ maxWidth: 1200, mx: 'auto' }} style={{ background: 'white' }} elevation={0} position="static">
        <Toolbar sx={{ mx: isMobile ? '' : 2 }}>
          <img src="/src/assets/img/main-logo.png" width="28" height="28" alt="app logo" />
          <Typography
            sx={{
              flexGrow: isMobile ? 1 : 1,
              mr: 3,
              ml: 0.8,
              display: { xs: 'flex', md: 'flex' },
              cursor: 'pointer',
            }}
            fontFamily={[
              'Nunito',
              'Roboto',
              'sans-serif',
              'IBM Plex Sans',
              '-apple-system',
              'BlinkMacSystemFont',
              'Segoe UI',
              'Helvetica Neue',
              'Arial',
              'Apple Color Emoji',
              'Segoe UI Emoji',
              'Segoe UI Symbol',
            ].join(',')}
            color="black"
            variant="h5"
            fontWeight="bold"
            component="div"
          >
            connefut
          </Typography>
          <IconButton
            onMouseMove={searchMove}
            onMouseLeave={searchLeave}
            style={{ color: search ? 'black' : '' }}
            disableRipple
          >
            <SearchIcon />
          </IconButton>
          <Button
            size={isMobile ? 'small' : 'medium'}
            disableRipple
            sx={{ mr: isMobile ? 0.5 : 2, fontSize: 12 }}
            variant="text"
          >
            ログイン
          </Button>
          <Button
            size={isMobile ? 'small' : 'medium'}
            disableRipple
            sx={{ fontSize: 12 }}
            disableElevation
            variant="contained"
          >
            {isMobile ? '登録' : '新規登録'}
          </Button>
        </Toolbar>
      </AppBar>
      <Box zIndex={100} component="nav" sx={{ position: 'sticky', top: 0, background: '#fff' }}>
        <Box component="div" maxWidth={1200} mx={'auto'}>
          <TabCompetition />
        </Box>
        <Divider />
      </Box>
    </>
  );
});
