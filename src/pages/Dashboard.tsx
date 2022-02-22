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
import { CircularProgress, Divider, List, Typography } from '@mui/material';

import { useDeleteRecruitmentMutation, useGetCurrentUserRecruitmentsQuery } from '../generated/graphql';

import { RecruitmentList } from '../components/index';
import { useSetRecoilState } from 'recoil';
import { flashMessage, flashState, flashType } from '../store/flash';

const StyledDashboardButton = styled(Button)(() => ({
  '&:hover': {
    background: '#f5f5f5',
  },
}));

export const Dashboard: VFC = memo(() => {
  const colors = ['#3f51b5', '#e91e63', '#4caf50', '#607d8b', '#f44336', '#9c27b0'];

  const [selected, setSelected] = useState<number>(1);

  const { loading, data, refetch } = useGetCurrentUserRecruitmentsQuery();
  const [deleteRecruitment] = useDeleteRecruitmentMutation();

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const deleteCurrentUserRecruitment = async (id: string) => {
    const res = await deleteRecruitment({
      variables: {
        id: id,
      },
      onCompleted() {
        refetch();
      },
    });
    if (res.data?.deleteRecruitment) {
      setState(true);
      setMessage('削除しました');
      setType('success');
    }
  };

  let count = 0;

  return (
    <>
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
                    fontSize: 20,
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
                    fontSize: 20,
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
                    fontSize: 20,
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
          <Grid item pl={3} xs={9}>
            <Typography fontSize={35} fontWeight="bold">
              Recruitments
            </Typography>
            <List>
              {loading ? (
                <Box mt={1} sx={{ textAlign: 'center' }}>
                  <CircularProgress size={30} color="primary" />
                </Box>
              ) : (
                <>
                  {data?.getCurrentUserRecruitments.map((recruitment) => {
                    if (count === 6) {
                      count = 0;
                    }
                    count += 1;
                    return (
                      <Box key={recruitment.id}>
                        <RecruitmentList
                          deleteCurrentUserRecruitment={deleteCurrentUserRecruitment}
                          color={colors[count - 1]}
                          recruitment={recruitment}
                        />
                        <Divider sx={{ border: '0.6px solid #ebf2f2' }} />
                      </Box>
                    );
                  })}
                </>
              )}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
});
