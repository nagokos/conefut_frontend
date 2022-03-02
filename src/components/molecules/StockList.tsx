import { memo, VFC } from 'react';

import { Avatar, Box, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Status } from '../../generated/graphql';
import BookmarkIcon from '@mui/icons-material/Bookmark';

type Recruitment = {
  id: string;
  title: string;
  status: Status;
  competition?: Competition | null | undefined;
};

type Competition = {
  name: string;
};

type Props = {
  color: string;
  recruitment: Recruitment;
};

export const StockList: VFC<Props> = memo((props) => {
  const { recruitment, color } = props;

  const navigate = useNavigate();

  const statusString = () => {
    if (recruitment.status === Status.Published) {
      return '公開中';
    } else if (recruitment.status === Status.Closed) {
      return '締切';
    } else if (recruitment.status === Status.Draft) {
      return '下書き';
    }
  };

  const statusBgcolor = () => {
    if (recruitment.status === Status.Published) {
      return '#009688';
    } else if (recruitment.status === Status.Closed) {
      return '#f42121';
    } else if (recruitment.status === Status.Draft) {
      return '#2196f3';
    }
  };

  return (
    <>
      <Box
        onClick={() => {
          navigate(`/recruitments/${recruitment.id}`);
        }}
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <Box
          component="span"
          fontSize={10}
          sx={{
            border: '1px solid',
            bgcolor: `${statusBgcolor()}`,
            color: 'white',
            px: 0.7,
            mr: 0.3,
            borderRadius: 1,
            py: 0.4,
          }}
        >
          公開中
        </Box>
        <Box
          component="span"
          fontSize={10}
          sx={{
            border: '1px solid',
            bgcolor: `${statusBgcolor()}`,
            color: 'white',
            px: 0.7,
            mr: 0.3,
            borderRadius: 1,
            py: 0.4,
          }}
        >
          サッカー
        </Box>
        <Box
          component="span"
          fontSize={10}
          sx={{
            border: '1px solid',
            bgcolor: `${statusBgcolor()}`,
            color: 'white',
            px: 0.7,
            mr: 0.3,
            borderRadius: 1,
            py: 0.4,
          }}
        >
          試合相手
        </Box>
      </Box>
      <ListItem sx={{ px: 0, pt: 0.9 }}>
        <ListItemText
          sx={{ mr: 5 }}
          primary={
            <Typography
              component="div"
              onClick={() => {
                navigate(`/recruitments/${recruitment.id}`);
              }}
              sx={{ position: 'relative', bottom: 3, color: '#263238', cursor: 'pointer' }}
              fontSize={18}
              fontWeight="bold"
            >
              {recruitment.title}
            </Typography>
          }
          secondary={
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', color: '#9e9e9e', cursor: 'pointer' }}>
              <Avatar
                component="span"
                sx={{ width: 32, height: 32, mt: 0.2, mr: 1 }}
                src="https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
              />
              <Box component="span" sx={{ fontSize: 12, mr: 0.3 }}>
                kosuda
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
