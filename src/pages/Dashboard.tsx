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
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export const StyledDashboardButton = styled(Button)(() => ({
  '&:hover': {
    background: '#f5f5f5',
  },
}));

export const Dashboard: VFC = memo(() => {
  const [selected, setSelected] = useState<number>(1);

  return (
    <Box maxWidth={1120} margin="auto" mt={7}>
      <Grid container>
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ pl: 0 }}>
              <StyledDashboardButton
                color="dark"
                disableRipple
                size="large"
                startIcon={selected === 1 ? <ArticleIcon /> : <ArticleOutlinedIcon />}
                onClick={() => {
                  setSelected(1);
                }}
                sx={{
                  fontSize: 19,
                  px: 3,
                  fontWeight: selected === 1 ? 'bold' : 100,
                  backgroundColor: selected === 1 ? '#f5f5f5' : '',
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
                startIcon={selected === 2 ? <EventNoteIcon /> : <EventNoteOutlinedIcon />}
                onClick={() => {
                  setSelected(2);
                }}
                sx={{
                  fontSize: 19,
                  px: 3,
                  fontWeight: selected === 2 ? 'bold' : 100,
                  background: selected === 2 ? '#f5f5f5' : '',
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
                startIcon={selected === 3 ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                onClick={() => {
                  setSelected(3);
                }}
                sx={{
                  fontSize: 19,
                  px: 3,
                  fontWeight: selected === 3 ? 'bold' : 100,
                  background: selected === 3 ? '#f5f5f5' : '',
                }}
              >
                Stocks
              </StyledDashboardButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography fontSize={30} fontWeight="bold">
            Recruitments
          </Typography>
          <Divider sx={{ mt: 3, border: '0.6px solid #ebf2f2' }} />
          <Grid container></Grid>
        </Grid>
      </Grid>
    </Box>
  );
});
