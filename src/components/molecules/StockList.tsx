import { memo, VFC } from 'react';

import { Avatar, Box, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Status, Type } from '../../generated/graphql';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Emoji } from 'emoji-mart';

type Recruitment = {
  id: string;
  title: string;
  type: Type;
  status: Status;
  user?: User | null | undefined;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Props = {
  recruitment: Recruitment;
};

export const StockList: VFC<Props> = memo((props) => {
  const { recruitment } = props;

  const navigate = useNavigate();

  const typeEmoji = (): string => {
    if (recruitment.type === Type.Opponent) {
      return ':handshake:';
    } else if (recruitment.type === Type.Individual) {
      return ':muscle:';
    } else if (recruitment.type === Type.Member) {
      return ':people_holding_hands:';
    } else if (recruitment.type === Type.Joining) {
      return ':pray:';
    } else if (recruitment.type === Type.Others) {
      return ':thought_balloon:';
    } else {
      return '';
    }
  };

  return (
    <>
      <ListItem sx={{ px: 0, mb: 1.5, pt: 0.9 }}>
        <Paper
          onClick={() => {
            navigate(`/recruitments/${recruitment.id}`);
          }}
          elevation={0}
          sx={{
            bgcolor: '#f0f5f4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 65,
            minWidth: 65,
            borderRadius: 3.5,
            mr: 2.5,
            cursor: 'pointer',
          }}
        >
          <Emoji emoji={recruitment.status === Status.Published ? typeEmoji() : ':no_entry:'} size={28} native />
        </Paper>
        <ListItemText
          sx={{ mr: 5 }}
          primary={
            <Typography
              component="div"
              onClick={() => {
                navigate(`/recruitments/${recruitment.id}`);
              }}
              sx={{ position: 'relative', bottom: 3, color: '#263238', cursor: 'pointer', fontFamily: 'Roboto' }}
              fontSize={17}
              fontWeight="bold"
            >
              {recruitment.title}
            </Typography>
          }
          secondary={
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mt: 0.1 }}>
              <Avatar component="span" sx={{ width: 29, height: 29, mr: 0.8 }} src={recruitment.user?.avatar} />
              <Box component="span" sx={{ fontSize: 12, mr: 0.3 }}>
                {recruitment.user?.name}
              </Box>
              <BookmarkIcon fontSize="small" sx={{ fontSize: 14 }} />
              <Box component="span" sx={{ fontSize: 13 }}>
                1
              </Box>
            </Box>
          }
        />
      </ListItem>
    </>
  );
});
