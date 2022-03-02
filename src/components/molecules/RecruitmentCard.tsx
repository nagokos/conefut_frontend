import { memo, VFC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Level, Type } from '../../generated/graphql';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Emoji } from 'emoji-mart';
import { IconButton, styled } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';

import { StyledTooltip } from '..';

type Recruitment = {
  id: string;
  title: string;
  content?: string | null | undefined;
  type: Type;
  level: Level;
  prefecture?: Prefecture | null | undefined;
  user: User;
  capacity?: number | null | undefined;
  place?: string | null | undefined;
  startAt?: any;
  closingAt?: any;
  updatedAt: any;
};

type Prefecture = {
  __typename?: 'Prefecture' | undefined;
  name: string;
};

type User = {
  __typename?: 'User' | undefined;
  name: string;
  avatar: string;
};

type Props = {
  recruitment: Recruitment;
  color: string;
};

const StyledCardContent = styled(CardContent)(() => ({
  '&.MuiCardContent-root': {
    paddingBottom: 11,
  },
}));

const StyledListButton = styled(IconButton)(() => ({
  '&.MuiIconButton-root': {
    background: '#f0f5f4',
    fontSize: 10,
    color: '#90a4ae',
  },
  '&:hover': {
    background: '#e9f2f2',
  },
}));

export const RecruitmentCard: VFC<Props> = memo((props) => {
  const { recruitment, color } = props;
  const [target, setTarget] = useState<string | null>(null);

  const navigate = useNavigate();

  const cardMove = (id: string) => {
    setTarget(id);
  };

  const cardLeave = () => {
    setTarget(null);
  };

  const distanceToNowFromUpdatedAt = formatDistanceToNow(new Date(recruitment.updatedAt), { locale: ja }).replace(
    /約/g,
    ''
  );

  const distanceToNowFromClosingAt = formatDistanceToNow(new Date(recruitment.closingAt), { locale: ja }).replace(
    /約/g,
    ''
  );

  const typeEmoji = (): string => {
    if (recruitment.type === Type.Opponent) {
      return ':handshake:';
    } else if (recruitment.type === Type.Individual) {
      return ':raised_hand:';
    } else if (recruitment.type === Type.Teammate) {
      return ':people_holding_hands:';
    } else if (recruitment.type === Type.Joining) {
      return ':pray:';
    } else if (recruitment.type === Type.Coaching) {
      return ':teacher:';
    } else if (recruitment.type === Type.Others) {
      return ':thought_balloon:';
    } else {
      return '';
    }
  };

  const typeString = () => {
    if (recruitment.type === Type.Opponent) {
      return '試合相手';
    } else if (recruitment.type === Type.Individual) {
      return '個人での参加';
    } else if (recruitment.type === Type.Teammate) {
      return 'チームメイト';
    } else if (recruitment.type === Type.Joining) {
      return 'チームに入りたい';
    } else if (recruitment.type === Type.Coaching) {
      return 'コーチ';
    } else if (recruitment.type === Type.Others) {
      return 'その他';
    }
  };

  const levelString = () => {
    if (recruitment.level === Level.Enjoy) {
      return 'エンジョイ';
    } else if (recruitment.level === Level.Beginner) {
      return 'ビギナー';
    } else if (recruitment.level === Level.Middle) {
      return 'ミドル';
    } else if (recruitment.level === Level.Expert) {
      return 'エキスパート';
    } else if (recruitment.level === Level.Open) {
      return 'オープン';
    }
  };

  const subStrTitle = () => {
    if (recruitment.title.length > 36) {
      const subStr = recruitment.title.substring(0, 35);
      return `${subStr}...`;
    } else {
      return recruitment.title;
    }
  };

  return (
    <>
      <Card
        onClick={() => navigate(`/recruitments/${recruitment.id}`)}
        onMouseMove={() => cardMove(recruitment.id)}
        onMouseLeave={cardLeave}
        sx={{
          maxWidth: 400,
          maxHeight: 422,
          boxShadow: target === recruitment.id ? '0px 10px 10px rgb(236 239 241);' : '0px 3px 4px rgb(236 239 241);',
          borderRadius: 4,
          border: '1px solid rgb(236 239 241)',
          marginRight: 'auto',
          marginLeft: 'auto',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            fontSize: 13,
            position: 'absolute',
            ml: 2,
            mt: 1.5,
            bgcolor: '#f50057',
            border: '1px solid',
            color: 'white',
            borderRadius: 20,
            fontWeight: 'bold',
            px: 1.3,
            py: 0.3,
          }}
        >
          New
        </Box>
        <Box
          minHeight={110}
          bgcolor={'#f0f5f4'}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Emoji emoji=":soccer:" size={65} />
        </Box>
        <StyledCardContent>
          <Typography minHeight={48} gutterBottom fontWeight="bold" variant="body1" component="div">
            {subStrTitle()}
          </Typography>
          <Box>
            <Box sx={{ fontSize: 10 }} mt={1.5}>
              <Box component="span" mr={0.2}>
                ■
              </Box>
              募集タイプ:
              <Box ml={1} px={1} py={0.5} borderRadius={1} component="span" bgcolor="#f0f5f4">
                <Box component="span" mr={0.6} fontSize={13} position="relative" top={3.5}>
                  <Emoji emoji={typeEmoji()} size={16} />
                </Box>
                <Box component="span">{typeString()}</Box>
              </Box>
            </Box>
            {!!recruitment.capacity && (
              <Box sx={{ fontSize: 10 }} mt={2}>
                <Box component="span" mr={0.2}>
                  ■
                </Box>
                募集人数:&emsp;
                <Box ml={1} px={1} py={0.5} borderRadius={1} component="span" bgcolor="#f0f5f4">
                  <Box component="span" mr={0.6} fontSize={13} position="relative" top={3.2}>
                    <Emoji emoji=":raising_hand:" size={15} />
                  </Box>
                  <Box component="span">{recruitment.capacity}人募集</Box>
                </Box>
              </Box>
            )}
            {recruitment.startAt && (
              <Box sx={{ fontSize: 10 }} mt={2}>
                <Box component="span" mr={0.2}>
                  ■
                </Box>
                開催日時:&emsp;
                <Box ml={1} px={1} py={0.5} borderRadius={1} component="span" bgcolor="#f0f5f4">
                  <Box component="span" mr={0.6} fontSize={13} position="relative" top={3.5}>
                    <Emoji emoji=":spiral_calendar_pad:" size={14} />
                  </Box>
                  <Box component="span">{recruitment.startAt}</Box>
                </Box>
              </Box>
            )}
            <Box sx={{ fontSize: 10 }} mt={2}>
              <Box component="span" mr={0.2}>
                ■
              </Box>
              募集期限:&emsp;
              <Box ml={1} px={1} py={0.5} borderRadius={1} component="span" bgcolor="#f0f5f4">
                <Box component="span" mr={0.6} fontSize={13} position="relative" top={3.5}>
                  <Emoji emoji=":alarm_clock:" size={14} />
                </Box>
                <Box component="span">
                  <Box component="span">残り{distanceToNowFromClosingAt}</Box>
                  <Box component="span" sx={{ ml: -0.4, color: '#616161' }}>
                    （{recruitment.closingAt}）
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box minHeight={15} sx={{ fontSize: 10 }} mt={2.5}>
            <Box
              bgcolor="#009688"
              color="white"
              px={0.8}
              py={0.3}
              borderRadius={1.3}
              mr={0.2}
              component="span"
              border={'1px solid'}
            >
              {recruitment.prefecture?.name}
            </Box>
            {recruitment.place && (
              <Box
                bgcolor="#009688"
                color="white"
                px={0.8}
                py={0.3}
                mr={0.2}
                borderRadius={1.3}
                component="span"
                border={'1px solid'}
              >
                {recruitment.place}
              </Box>
            )}
            {recruitment.level !== Level.Unnecessary && (
              <Box
                bgcolor="#009688"
                color="white"
                px={0.8}
                py={0.3}
                borderRadius={1.3}
                component="span"
                border={'1px solid'}
              >
                {levelString()}
              </Box>
            )}
          </Box>
          <Box sx={{ fontSize: 10 }} mt={1.5}>
            <ListItem alignItems="center" sx={{ px: 0, py: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 36, height: 36 }} alt="user image" src={recruitment.user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ ml: -1, position: 'relative', top: 3 }} component="span" fontSize={13}>
                    {recruitment.user.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography sx={{ display: 'inline', ml: -1 }} component="span" color="#757575" fontSize={10}>
                      {distanceToNowFromUpdatedAt}前
                    </Typography>
                    <Box ml={0.4} component="span" sx={{ position: 'relative', top: 3.5, color: '#9e9e9e' }}>
                      <BookmarkIcon sx={{ fontSize: 14 }} />
                      <Box component="span" sx={{ fontSize: 12, position: 'relative', bottom: 3, color: '#9e9e9e' }}>
                        1
                      </Box>
                    </Box>
                  </>
                }
              />
              <Box textAlign="center">
                <StyledTooltip title="ストック" placement="bottom">
                  <StyledListButton
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log('add stock');
                    }}
                    disableRipple
                    size="medium"
                  >
                    <BookmarkBorderIcon fontSize="small" />
                  </StyledListButton>
                </StyledTooltip>
              </Box>
            </ListItem>
          </Box>
        </StyledCardContent>
      </Card>
    </>
  );
});
