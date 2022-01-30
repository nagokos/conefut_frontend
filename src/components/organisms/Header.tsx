import { memo, MouseEvent, useState, VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from '@mui/material/Avatar';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MessageIcon from '@mui/icons-material/Message';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HelpIcon from '@mui/icons-material/Help';
import ArticleIcon from '@mui/icons-material/Article';

import { useSize } from '../../hooks/index';
import { TabCompetition } from '../index';
import { Divider, IconButton } from '@mui/material';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../reactive/user';
import { useGetCurrentUserQuery, useLogoutUserMutation } from '../../generated/graphql';

export const Header: VFC = memo(() => {
  const { data, loading } = useGetCurrentUserQuery();
  const [search, setSearch] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const { isMobile } = useSize();
  const location = useLocation();
  const navigate = useNavigate();

  const user = data?.getCurrentUser;

  const [logout] = useLogoutUserMutation();

  const searchMove = () => {
    setSearch(true);
  };

  const searchLeave = () => {
    setSearch(false);
  };

  const notificationMove = () => {
    setNotification(true);
  };

  const notificationLeave = () => {
    setNotification(false);
  };

  const isNeedHeader = (): boolean => {
    return (
      location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/recruitments/new'
    );
  };

  const pushHome = () => {
    navigate('/');
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    await logout();
    window.location.href = '/';
  };

  const transitionPage = (path: string) => [navigate(path)];

  return (
    <>
      {!isNeedHeader() && (
        <>
          <AppBar sx={{ maxWidth: 1200, mx: 'auto' }} style={{ background: 'white' }} elevation={0} position="static">
            <Toolbar sx={{ mx: isMobile ? '' : 2 }}>
              <Typography
                sx={{
                  flexGrow: isMobile ? 1 : 1,
                  mr: 3,
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
              >
                <Box display="flex">
                  <Box onClick={pushHome} display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                    <img
                      style={{ marginRight: 4 }}
                      src="/src/assets/img/main-logo.png"
                      width="28"
                      height="28"
                      alt="app logo"
                    />
                    connefut
                  </Box>
                </Box>
              </Typography>
              <IconButton
                onMouseMove={searchMove}
                onMouseLeave={searchLeave}
                style={{ color: search ? 'black' : '' }}
                disableRipple
              >
                <SearchIcon />
              </IconButton>
              {isLoggedIn() && (
                <>
                  <IconButton
                    onMouseMove={notificationMove}
                    onMouseLeave={notificationLeave}
                    style={{ color: notification ? 'black' : '' }}
                    disableRipple
                    sx={{ mr: 1.1 }}
                  >
                    <NotificationsNoneIcon />
                  </IconButton>
                  <Avatar sx={{ cursor: 'pointer' }} onClick={handleClick} src={user?.avatar} />
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      sx: {
                        boxShadow: '0 3px 12px -1px #04253f40;',
                        mt: 1.5,
                        width: 240,
                        borderRadius: 1,
                        '& .MuiList-root': {
                          py: 0,
                          '& .MuiDivider-root': {
                            my: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem disableRipple sx={{ py: 2 }}>
                      <Avatar sx={{ mr: 1.4, width: 35, height: 35 }} src={user?.avatar} />
                      {user?.name}
                    </MenuItem>
                    <Divider sx={{ borderColor: '#ebf2f2' }} />
                    <MenuItem onClick={() => transitionPage('/recruitments/new')} disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <ArticleIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>募集の作成</Box>
                    </MenuItem>
                    <MenuItem disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <EventNoteIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>応募済みの募集</Box>
                    </MenuItem>
                    <MenuItem disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <MessageIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>メッセージの管理</Box>
                    </MenuItem>
                    <MenuItem disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <BookmarkBorderIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>ストックした募集</Box>
                    </MenuItem>
                    <Divider sx={{ borderColor: '#ebf2f2' }} />
                    <MenuItem disableRipple sx={{ py: 1.2, fontSize: 13 }}>
                      <ListItemIcon>
                        <Settings sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>アカウント設定</Box>
                    </MenuItem>
                    <MenuItem disableRipple sx={{ py: 1.2, fontSize: 13 }}>
                      <ListItemIcon>
                        <HelpIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>お問い合わせ</Box>
                    </MenuItem>
                    <Divider sx={{ borderColor: '#ebf2f2' }} />
                    <MenuItem onClick={logoutUser} disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <Logout sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>ログアウト</Box>
                    </MenuItem>
                  </Menu>
                </>
              )}
              {!user && (
                <>
                  <Button
                    size={isMobile ? 'small' : 'medium'}
                    disableRipple
                    sx={{ mr: isMobile ? 0.5 : 2, fontSize: 12 }}
                    variant="text"
                    component={RouterLink}
                    to="/login"
                  >
                    ログイン
                  </Button>
                  <Button
                    size={isMobile ? 'small' : 'medium'}
                    disableRipple
                    sx={{ fontSize: 12 }}
                    disableElevation
                    variant="contained"
                    component={RouterLink}
                    to="/signup"
                  >
                    {isMobile ? '登録' : '新規登録'}
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
          <Box zIndex={100} component="nav" sx={{ position: 'sticky', top: 0, background: '#fff' }}>
            <Box component="div" maxWidth={1200} mx={'auto'}>
              <TabCompetition />
            </Box>
            <Divider sx={{ borderColor: '#ebf2f2' }} />
          </Box>
        </>
      )}
    </>
  );
});
