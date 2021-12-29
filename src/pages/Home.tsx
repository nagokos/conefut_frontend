import { memo, useState, VFC } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useSize } from '../hooks/index';
import { SelectOrder, SearchInput } from '../components';

export const Home: VFC = memo(() => {
  const [target, setTarget] = useState<number | null>(null);

  const { isMobile } = useSize();

  const cardMove = (index: number) => {
    setTarget(index);
  };

  const cardLeave = () => {
    setTarget(null);
  };

  return (
    <Container sx={{ maxWidth: 1100, mt: 7 }}>
      <Box maxWidth={900} mx={'auto'} sx={{ flexGrow: 1 }}>
        <Grid sx={{ mb: 4 }} container>
          <Grid item md={4} />
          <Grid item md={8} sm={12} xs={12}>
            <SelectOrder />
            <Divider sx={{ border: '1px solid rgba(0, 0, 0, 0.04);' }}></Divider>
          </Grid>
        </Grid>
        <Grid container>
          {!isMobile && (
            <Grid item md={4} sx={{ pr: 5, pl: 4 }}>
              <SearchInput />
            </Grid>
          )}
          <Grid item md={8}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(20)).map((_, index) => (
                <Grid item xs={2} sm={6} md={6} key={index}>
                  <Card
                    onMouseMove={() => cardMove(index)}
                    onMouseLeave={cardLeave}
                    sx={{
                      maxWidth: 300,
                      boxShadow: target === index ? '0px 10px 10px rgb(236 239 241);' : '0px 3px 4px rgb(236 239 241);',
                      borderRadius: 4,
                      border: '1px solid rgb(236 239 241)',
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      cursor: 'pointer',
                    }}
                  >
                    <Box minHeight={110} bgcolor={'#f0f5f4'} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                        continents except Antarctica
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
});
