import { memo, VFC } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useSize } from '../hooks/index';
import { SelectOrder, SearchInput } from '../components';
import { useGetPrefecturesQuery } from '../generated/graphql';

export const Home: VFC = memo(() => {
  const { isMobile } = useSize();

  const { loading, error, data } = useGetPrefecturesQuery();

  return (
    <>
      <Container sx={{ maxWidth: 1100, mt: 7 }}>
        <Box maxWidth={900} mx={'auto'} sx={{ flexGrow: 1 }}>
          {!isMobile && (
            <Grid sx={{ mb: 4 }} container>
              <Grid item md={4} />
              <Grid item md={8} sm={12} xs={12}>
                <SelectOrder />
                <Divider sx={{ border: '1px solid rgba(0, 0, 0, 0.04);' }}></Divider>
              </Grid>
            </Grid>
          )}
          <Grid container>
            {!isMobile && (
              <Grid item md={4} sx={{ pr: 5, pl: 4 }}>
                <SearchInput prefectures={data?.getPrefectures} />
              </Grid>
            )}
            <Grid item md={8}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(20)).map((_, index) => (
                  <Grid item xs={2} sm={6} md={6} key={index}></Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
});
