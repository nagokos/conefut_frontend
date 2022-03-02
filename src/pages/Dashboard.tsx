import { memo, useState, VFC } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/material/styles';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLocationChange } from '../hooks';

const StyledDashboardButton = styled(Button)(() => ({
  '&:hover': {
    background: '#f5f5f5',
  },
}));

export const Dashboard: VFC = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectButton = () => {
    if (location.pathname.includes('stocks')) {
      return 'stocks';
    } else if (location.pathname.includes('applied')) {
      return 'applied';
    } else {
      return 'recruitments';
    }
  };

  const select = selectButton;

  const [selected, setSelected] = useState<string>(select);

  useLocationChange(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Box maxWidth={1120} margin="auto" mt={7}>
        <Grid container>
          <Grid item xs={3}>
            <Grid container spacing={1} sx={{ position: 'fixed' }}>
              <Grid item xs={12} sx={{ pl: 0 }}>
                <StyledDashboardButton
                  color="dark"
                  disableRipple
                  size="large"
                  startIcon={selected === 'recruitments' ? <ArticleIcon /> : <ArticleOutlinedIcon />}
                  onClick={() => {
                    setSelected('recruitments');
                    navigate('/dashboard');
                  }}
                  sx={{
                    fontSize: 20,
                    px: 3,
                    fontWeight: selected === 'recruitments' ? 'bold' : 100,
                    backgroundColor: selected === 'recruitments' ? '#f5f5f5' : '',
                  }}
                >
                  Recruitments
                </StyledDashboardButton>
              </Grid>
              <Grid item xs={12}>
                <StyledDashboardButton
                  disableRipple
                  size="large"
                  color="dark"
                  startIcon={selected === 'applied' ? <EventNoteIcon /> : <EventNoteOutlinedIcon />}
                  onClick={() => {
                    setSelected('applied');
                    navigate('/dashboard/applied');
                  }}
                  sx={{
                    fontSize: 20,
                    px: 3,
                    fontWeight: selected === 'applied' ? 'bold' : 100,
                    background: selected === 'applied' ? '#f5f5f5' : '',
                  }}
                >
                  Applied
                </StyledDashboardButton>
              </Grid>
              <Grid item xs={12}>
                <StyledDashboardButton
                  disableRipple
                  size="large"
                  color="dark"
                  startIcon={selected === 'stocks' ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  onClick={() => {
                    setSelected('stocks');
                    navigate('/dashboard/stocks');
                  }}
                  sx={{
                    fontSize: 20,
                    px: 3,
                    fontWeight: selected === 'stocks' ? 'bold' : 100,
                    background: selected === 'stocks' ? '#f5f5f5' : '',
                  }}
                >
                  Stocks
                </StyledDashboardButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item pl={3} xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
});
