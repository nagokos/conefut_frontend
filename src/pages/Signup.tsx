import { Container, Grid, IconButton } from '@mui/material';
import { memo, useState, VFC } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Email from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

import { StyledRoundedButton, SignupDialog } from '../components';
import { useSize } from '../hooks';

export const Signup: VFC = memo(() => {
  const [open, setOpen] = useState<boolean>(false);

  const { isMobile } = useSize();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ pt: 2, px: 2 }}>
      {!isMobile && (
        <IconButton disableTouchRipple component={Link} to="/" size="medium">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </IconButton>
      )}
      <Container sx={{ mt: isMobile ? 22 : 24 }}>
        <Grid spacing={{ xs: 3, sm: 3, md: 3 }} container>
          <Grid xs={12} sm={12} md={12} item>
            <Box alignItems="center" justifyContent="center" display="flex">
              <img src="/src/assets/img/main-logo.png" width="28" height="28" alt="app logo" />
              <Typography
                sx={{
                  mr: 3,
                  ml: 0.8,
                  fontSize: 30,
                  cursor: 'default',
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
                fontWeight="bold"
                component="div"
              >
                connefut
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <Box display="flex" justifyContent="center">
              <StyledRoundedButton
                disableRipple
                size="large"
                fullWidth
                onClick={handleClickOpen}
                variant="contained"
                sx={{ borderRadius: 8, fontSize: 13, maxWidth: 350 }}
              >
                <Email color="error" sx={{ position: 'relative', right: 29 }} />
                メールアドレスで登録
              </StyledRoundedButton>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <Box display="flex" justifyContent="center">
              <StyledRoundedButton
                disableRipple
                size="large"
                variant="contained"
                fullWidth
                sx={{ borderRadius: 8, fontSize: 13, maxWidth: 350 }}
              >
                <img src="/src/assets/img/google.png" width="22" style={{ position: 'relative', right: 51 }} />
                Googleで登録
              </StyledRoundedButton>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={12} item>
            <Box display="flex" justifyContent="center">
              <StyledRoundedButton
                disableRipple
                size="large"
                fullWidth
                variant="contained"
                sx={{ borderRadius: 8, fontSize: 13, maxWidth: 350 }}
              >
                <img src="/src/assets/img/line.png" width="22" style={{ position: 'relative', right: 58 }} />
                LINEで登録
              </StyledRoundedButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <SignupDialog open={open} handleClose={handleClose} />
    </Box>
  );
});
