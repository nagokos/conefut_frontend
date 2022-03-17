import { memo, VFC } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { useSize } from '../hooks/index';
import { SelectOrder, SearchInput } from '../components';
import { RecruitmentCard } from '../components/molecules/RecruitmentCard';
import { useGetRecruitmentsQuery } from '../generated/graphql';

export const Home: VFC = memo(() => {
  const colors = ['#3f51b5', '#e91e63', '#4caf50', '#607d8b', '#f44336', '#9c27b0'];

  const { isMobile } = useSize();

  const [data] = useGetRecruitmentsQuery();

  return (
    <>
      <Container sx={{ maxWidth: 1200, mt: 7 }}>
        <Box maxWidth={1030} mx={'auto'} sx={{ flexGrow: 1 }}>
          {!isMobile && (
            <Grid sx={{ mb: 4 }} container>
              <Grid item md={4} />
              <Grid item md={8} sm={12} xs={12}>
                <SelectOrder />
                <Divider sx={{ border: '1px solid rgba(0, 0, 0, 0.04);', bgcolor: '#ebf2f2' }}></Divider>
              </Grid>
            </Grid>
          )}
          <Grid container>
            {!isMobile && (
              <Grid item md={4} sx={{ pl: 5 }}>
                <SearchInput />
              </Grid>
            )}
            <Grid item md={8}>
              {data.fetching ? (
                <Box textAlign="center">
                  <CircularProgress size={35} />
                </Box>
              ) : (
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {data.data?.getRecruitments.map((recruitment) => (
                    <Grid item xs={2} sm={6} md={6} key={recruitment.id}>
                      <RecruitmentCard
                        key={recruitment.id}
                        recruitment={recruitment}
                        color={colors[Math.floor(Math.random() * 6)]}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
});
