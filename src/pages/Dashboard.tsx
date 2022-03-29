import { memo, VFC } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import { styled } from '@mui/material/styles';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLocationChange, useSize } from '../hooks';
import { Typography } from '@mui/material';

const StyledDashboardButton = styled(Button)(() => ({
  '&:hover': {
    background: '#f5f5f5',
  },
}));

export const Dashboard: VFC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobile } = useSize();

  const selectButton = () => {
    if (location.pathname.includes('stocks')) {
      return 'stocks';
    } else if (location.pathname.includes('applies')) {
      return 'applies';
    } else {
      return 'recruitments';
    }
  };

  useLocationChange(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {isMobile ? (
        <Box sx={{ mt: 3, px: 2 }}>
          <Grid container>
            <Grid item xs={4}>
              <Box
                sx={{
                  bgcolor: selectButton() === 'recruitments' ? '#f0f5f4' : '',
                  color: selectButton() === 'recruitments' ? '#009688' : '#90a4ae',
                  borderRadius: 2,
                  textAlign: 'center',
                  mr: 2,
                  py: 2,
                }}
                onClick={() => navigate('/dashboard')}
              >
                <ArticleOutlinedIcon sx={{ width: 25, height: 25 }} />
                <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Recruitments</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  bgcolor: selectButton() === 'applies' ? '#f0f5f4' : '',
                  color: selectButton() === 'applies' ? '#009688' : '#90a4ae',
                  borderRadius: 2,
                  mx: 1,
                  textAlign: 'center',
                  py: 2,
                }}
                onClick={() => navigate('/dashboard/applies')}
              >
                <EventNoteOutlinedIcon sx={{ width: 25, height: 25 }} />
                <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Applies</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  bgcolor: selectButton() === 'stocks' ? '#f0f5f4' : '',
                  color: selectButton() === 'stocks' ? '#009688' : '#90a4ae',
                  borderRadius: 2,
                  ml: 2,
                  textAlign: 'center',
                  py: 2,
                }}
                onClick={() => navigate('/dashboard/stocks')}
              >
                <BookmarkBorderIcon sx={{ width: 25, height: 25 }} />
                <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>Stocks</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Box maxWidth={1120} margin="auto" mt={7}>
          <Grid container>
            <Grid item xs={3}>
              <Grid container spacing={1.2} sx={{ position: 'fixed' }}>
                <Grid item xs={12} sx={{ pl: 0 }}>
                  <StyledDashboardButton
                    color="dark"
                    disableRipple
                    size="large"
                    startIcon={selectButton() === 'recruitments' ? <ArticleIcon /> : <ArticleOutlinedIcon />}
                    onClick={() => {
                      navigate('/dashboard');
                    }}
                    sx={{
                      fontSize: 21.5,
                      px: 3,
                      fontWeight: selectButton() === 'recruitments' ? 'bold' : 100,
                      backgroundColor: selectButton() === 'recruitments' ? '#f5f5f5' : '',
                    }}
                  >
                    Recruitments
                  </StyledDashboardButton>
                </Grid>
                <Grid item xs={12} sx={{ pl: 0 }}>
                  <StyledDashboardButton
                    color="dark"
                    disableRipple
                    size="large"
                    startIcon={selectButton() === 'applies' ? <EventNoteIcon /> : <EventNoteOutlinedIcon />}
                    onClick={() => {
                      navigate('/dashboard/applies');
                    }}
                    sx={{
                      fontSize: 21.5,
                      px: 3,
                      fontWeight: selectButton() === 'applies' ? 'bold' : 100,
                      backgroundColor: selectButton() === 'applies' ? '#f5f5f5' : '',
                    }}
                  >
                    Applies
                  </StyledDashboardButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledDashboardButton
                    disableRipple
                    size="large"
                    color="dark"
                    startIcon={selectButton() === 'stocks' ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    onClick={() => {
                      navigate('/dashboard/stocks');
                    }}
                    sx={{
                      fontSize: 21.5,
                      px: 3,
                      fontWeight: selectButton() === 'stocks' ? 'bold' : 100,
                      background: selectButton() === 'stocks' ? '#f5f5f5' : '',
                    }}
                  >
                    Stocks
                  </StyledDashboardButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item pl={3} xs={9} sx={{ pl: 0 }}>
              <Outlet />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
});
