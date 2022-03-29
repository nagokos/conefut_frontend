import { memo, useState, VFC } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { useSize } from '../hooks/index';
import { SelectOrder, SearchInput, RecruitmentListHome } from '../components';
import { RecruitmentCard } from '../components/molecules/RecruitmentCard';
import { useGetRecruitmentsQuery } from '../generated/graphql';
import { List } from '@mui/material';

import TuneIcon from '@mui/icons-material/Tune';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const Home: VFC = memo(() => {
  const colors = ['#3f51b5', '#e91e63', '#4caf50', '#607d8b', '#f44336', '#9c27b0'];

  const { isMobile } = useSize();

  const [data] = useGetRecruitmentsQuery();

  const [alignment, setAlignment] = useState('recommendation');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Container sx={{ maxWidth: 1200, mt: isMobile ? 3 : 7 }}>
        <Box maxWidth={1030} mx={'auto'} sx={{ flexGrow: 1 }}>
          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <ToggleButtonGroup size="small" color="primary" value={alignment} exclusive onChange={handleChange}>
                <ToggleButton
                  disableRipple
                  value="recommendation"
                  sx={{
                    fontSize: 11,
                    minWidth: 68,
                    maxWidth: 68,
                    maxHeight: 31,
                    border: '1px solid #e4edeb',
                    boxShadow: '0 2px 3px -1px #e4edeb',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ color: alignment == 'recommendation' ? 'black' : '', fontWeight: 'bold' }}>おすすめ</Box>
                </ToggleButton>
                <ToggleButton
                  disableRipple
                  value="new"
                  sx={{
                    fontSize: 11,
                    minWidth: 68,
                    maxWidth: 68,
                    maxHeight: 31,
                    border: '1px solid #e4edeb',
                    boxShadow: '0 2px 3px -1px #e4edeb',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ color: alignment == 'new' ? 'black' : '', fontWeight: 'bold' }}>新着</Box>
                </ToggleButton>
                <ToggleButton
                  disableRipple
                  value="start"
                  sx={{
                    fontSize: 11,
                    minWidth: 68,
                    maxWidth: 68,
                    maxHeight: 31,
                    border: '1px solid #e4edeb',
                    boxShadow: '0 2px 3px -1px #e4edeb',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ color: alignment == 'start' ? 'black' : '', fontWeight: 'bold' }}>開催日</Box>
                </ToggleButton>
              </ToggleButtonGroup>
              <TuneIcon />
            </Box>
          ) : (
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
                <>
                  {isMobile ? (
                    <List sx={{ mt: 1.5 }}>
                      {data.data?.getRecruitments.map((recruitment) => (
                        <RecruitmentListHome key={recruitment.id} recruitment={recruitment} />
                      ))}
                    </List>
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
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
});
