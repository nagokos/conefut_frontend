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
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Logout from '@mui/icons-material/Logout';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import { useSize } from '../../hooks/index';
import { TabCompetition } from '../index';
import { Divider, IconButton } from '@mui/material';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery, useLogoutUserMutation } from '../../generated/graphql';
import { styled } from '@mui/material/styles';

const StyledMenuItem = styled(MenuItem)(() => ({
  '&:hover': {
    background: '#f0f5f4',
  },
}));

export const Header: VFC = memo(() => {
  const [data] = useGetCurrentUserQuery();
  const [result, logout] = useLogoutUserMutation();

  const [search, setSearch] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);

  const { isMobile } = useSize();

  const location = useLocation();
  const navigate = useNavigate();

  const user = data.data?.getCurrentUser;

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
      location.pathname === '/signup' ||
      location.pathname === '/login' ||
      location.pathname === '/recruitments/new' ||
      (location.pathname.includes('recruitments') && location.pathname.includes('edit'))
    );
  };

  const isNeedTabCompetition = (): boolean => {
    return location.pathname === '/';
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
              {!!user && (
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
                    <StyledMenuItem disableRipple sx={{ py: 2 }}>
                      <Avatar sx={{ mr: 1.4, width: 35, height: 35 }} src={user?.avatar} />
                      <Box sx={{ fontFamily: 'Roboto', fontSize: 15 }}>{user?.name}</Box>
                    </StyledMenuItem>
                    <Divider sx={{ borderColor: '#ebf2f2' }} />
                    <StyledMenuItem onClick={() => transitionPage('/recruitments/new')} disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <CreateOutlinedIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>募集の作成</Box>
                    </StyledMenuItem>
                    <StyledMenuItem onClick={() => transitionPage('/dashboard')} disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <ArticleOutlinedIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>募集の管理</Box>
                    </StyledMenuItem>
                    <StyledMenuItem disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <MessageOutlinedIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>メッセージの管理</Box>
                    </StyledMenuItem>
                    <Divider sx={{ borderColor: '#ebf2f2' }} />
                    <StyledMenuItem disableRipple sx={{ py: 1.2, fontSize: 13 }}>
                      <ListItemIcon>
                        <SettingsOutlinedIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>アカウント設定</Box>
                    </StyledMenuItem>
                    <StyledMenuItem disableRipple sx={{ py: 1.2, fontSize: 13 }}>
                      <ListItemIcon>
                        <HelpOutlineOutlinedIcon sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>お問い合わせ</Box>
                    </StyledMenuItem>
                    <Divider sx={{ borderColor: '#ebf2f2' }} />
                    <StyledMenuItem onClick={logoutUser} disableRipple sx={{ py: 1.2 }}>
                      <ListItemIcon>
                        <Logout sx={{ fontSize: 21 }} />
                      </ListItemIcon>
                      <Box sx={{ color: '#616161', position: 'relative', fontSize: 12.7 }}>ログアウト</Box>
                    </StyledMenuItem>
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
            {isNeedTabCompetition() && (
              <Box component="div" maxWidth={1200} mx={'auto'}>
                <TabCompetition />
              </Box>
            )}
            <Divider sx={{ borderColor: '#ebf2f2' }} />
          </Box>
        </>
      )}
    </>
  );
});
