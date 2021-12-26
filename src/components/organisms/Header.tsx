import { memo, useState, VFC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsIcon from '@mui/icons-material/Groups';
import PanToolIcon from '@mui/icons-material/PanTool';

export const Header: VFC = memo(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ maxWidth: 1200, mx: 'auto' }} style={{ background: 'white' }} elevation={0} position="static">
          <Toolbar>
            <Typography
              sx={{ mr: 3, display: { xs: 'flex', md: 'flex' }, cursor: 'pointer' }}
              color="primary"
              variant="h5"
              fontWeight="bold"
              component="div"
            >
              connefut
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
              <Button onClick={handleClick} sx={{ fontSize: 12 }} disableRipple color="dark">
                サッカー
              </Button>
              <Button onClick={handleClick} sx={{ ml: 0.7, fontSize: 12 }} disableRipple color="dark">
                フットサル
              </Button>
              <Button sx={{ fontSize: 12 }} disableRipple color="dark">
                大会
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    boxShadow: '0px 2px 4px rgb(144 164 174 / 40%);',
                  },
                }}
              >
                <MenuItem sx={{ fontSize: 13, py: 1.4, px: 3 }} onClick={handleClose}>
                  <SportsSoccerIcon sx={{ mr: 1.3 }} />
                  試合相手の募集
                </MenuItem>
                <MenuItem sx={{ fontSize: 13, py: 1.4, px: 3 }} onClick={handleClose}>
                  <PersonIcon sx={{ mr: 1.3 }} />
                  個人での参加の募集
                </MenuItem>
                <MenuItem sx={{ fontSize: 13, py: 1.4, px: 3 }} onClick={handleClose}>
                  <GroupsIcon sx={{ mr: 1.3 }} />
                  チームメイトの募集
                </MenuItem>
                <MenuItem sx={{ fontSize: 13, py: 1.4, px: 3 }} onClick={handleClose}>
                  <PanToolIcon fontSize="small" sx={{ mr: 1.3 }} />
                  コーチの募集
                </MenuItem>
              </Menu>
            </Box>
            <Button disableRipple sx={{ mr: 2, fontSize: 12 }} variant="text">
              ログイン
            </Button>
            <Button disableRipple sx={{ fontSize: 12 }} disableElevation variant="contained">
              新規登録
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Divider />
    </>
  );
});
