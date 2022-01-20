import { memo, VFC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {
  index: number;
};

export const RecruitmentCard: VFC<Props> = memo((props) => {
  const { index } = props;
  const [target, setTarget] = useState<number | null>(null);

  const cardMove = (index: number) => {
    setTarget(index);
  };

  const cardLeave = () => {
    setTarget(null);
  };

  return (
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
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
});
