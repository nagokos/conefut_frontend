import { Avatar, Box, Button, Grid, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { memo, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Level, Type, useGetRecruitmentQuery } from '../generated/graphql';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Emoji } from 'emoji-mart';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SendIcon from '@mui/icons-material/Send';


type LocationObject = {
  lat: number;
  lng: number;
};

export const RecruitmentDetails: VFC = memo(() => {
  const { recruitmentId } = useParams();
  console.log(recruitmentId);

  const { data, loading } = useGetRecruitmentQuery({
    variables: {
      id: String(recruitmentId),
    },
  });

  const googleMapApiKey: string = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const recruitment = data?.getRecruitment;
  if (!recruitment) return null;

  const distanceToNowFromUpdated = formatDistanceToNow(new Date(recruitment.updatedAt), { locale: ja }).replace(
    /約/g,
    ''
  );
  const distanceToNowFromClosingAt = formatDistanceToNow(new Date(recruitment.closingAt), { locale: ja }).replace(
    /約/g,
    ''
  );

  const typeString = () => {
    if (recruitment.type === Type.Opponent) {
      return '試合相手の募集';
    } else if (recruitment.type === Type.Individual) {
      return '個人での参加の募集';
    } else if (recruitment.type === Type.Teammate) {
      return 'チームメイトの募集';
    } else if (recruitment.type === Type.Joining) {
      return 'チームに入りたい募集';
    } else if (recruitment.type === Type.Coaching) {
      return 'コーチの募集';
    } else if (recruitment.type === Type.Others) {
      return 'その他';
    }
  };

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

  return (
    <Box sx={{ bgcolor: '#f0f5f4', height: '100vh', py: 6, overflow: 'scroll' }}>
      <Box sx={{ maxWidth: 1120, mx: 'auto' }}>
        <Grid container>
          <Grid item xs={8.5} sx={{ pr: 2 }}>
            <Box
              sx={{
                bgcolor: 'white',
                px: 3,
                py: 3,
                borderRadius: 2,
              }}
            >
              <ListItem sx={{ px: 0, py: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ height: 45, width: 45 }} src={recruitment?.user.avatar} />
                </ListItemAvatar>
                <ListItemText>
                  <Box component="span">{recruitment?.user.name}</Box>
                  &nbsp;
                  <Box component="span" fontSize={14}>
                    {distanceToNowFromUpdated}
                  </Box>
                </ListItemText>
              </ListItem>
              <Box sx={{ fontWeight: 'bold', fontSize: 25, mt: 3 }}>{recruitment?.title}</Box>
              <Stack spacing={3.5} sx={{ mt: 3 }}>
                <Box sx={{ fontSize: 14, display: 'flex' }}>
                  <Box sx={{ minWidth: 124 }}>
                    <Box component="span" mr={0.2}>
                      ■
                    </Box>
                    募集競技:
                  </Box>
                  <Box>
                    <Box px={1} py={0.6} borderRadius={1} component="span" bgcolor="#f0f5f4">
                      <Box component="span" mr={0.6} fontSize={13} position="relative" top={2.7}>
                        <Emoji emoji=":soccer:" size={15} />
                      </Box>
                      <Box sx={{ fontSize: 14 }} component="span">
                        {recruitment.competition?.name}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ fontSize: 14, display: 'flex' }}>
                  <Box sx={{ minWidth: 124 }}>
                    <Box component="span" mr={0.2}>
                      ■
                    </Box>
                    募集タイプ:
                  </Box>
                  <Box>
                    <Box px={1} py={0.6} borderRadius={1} component="span" bgcolor="#f0f5f4">
                      <Box component="span" mr={0.6} fontSize={14} position="relative" top={2.7}>
                        <Emoji emoji={typeEmoji()} size={15} />
                      </Box>
                      <Box sx={{ fontSize: 14 }} component="span">
                        {typeString()}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {!!recruitment.startAt && (
                  <Box sx={{ fontSize: 14, display: 'flex' }}>
                    <Box sx={{ minWidth: 124 }}>
                      <Box component="span" mr={0.2}>
                        ■
                      </Box>
                      開催日時:
                    </Box>
                    <Box>
                      <Box px={1} py={0.6} borderRadius={1} component="span" bgcolor="#f0f5f4">
                        <Box component="span" mr={0.6} fontSize={13} position="relative" top={2.7}>
                          <Emoji emoji=":spiral_calendar_pad:" size={15} />
                        </Box>
                        <Box sx={{ fontSize: 14 }} component="span">
                          {recruitment.startAt}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                <Box sx={{ fontSize: 14, display: 'flex' }}>
                  <Box sx={{ minWidth: 124 }}>
                    <Box component="span" mr={0.2}>
                      ■
                    </Box>
                    募集期限:
                  </Box>
                  <Box>
                    <Box px={1} py={0.6} borderRadius={1} component="span" bgcolor="#f0f5f4">
                      <Box component="span" mr={0.6} fontSize={13} position="relative" top={2.7}>
                        <Emoji emoji=":alarm_clock:" size={15} />
                      </Box>
                      <Box component="span" sx={{ fontSize: 14 }}>
                        残り{distanceToNowFromClosingAt}
                      </Box>
                      <Box component="span" sx={{ color: '#424242', fontSize: 14 }}>
                        （ {recruitment.closingAt} ）
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {recruitment.level !== Level.Unnecessary && (
                  <Box sx={{ fontSize: 14, display: 'flex' }}>
                    <Box sx={{ minWidth: 124 }}>
                      <Box component="span" mr={0.2}>
                        ■
                      </Box>
                      募集レベル:
                    </Box>
                    <Box>
                      <Box px={1} py={0.6} borderRadius={1} component="span" bgcolor="#f0f5f4">
                        <Box component="span" mr={0.6} fontSize={13} position="relative" top={2.7}>
                          <Emoji emoji=":muscle:" size={15} />
                        </Box>
                        <Box sx={{ fontSize: 14 }} component="span">
                          <Box component="span" sx={{ color: '#424242' }}>
                            {levelString()}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                {!!recruitment.capacity && (
                  <Box sx={{ fontSize: 14, display: 'flex' }}>
                    <Box sx={{ minWidth: 124 }}>
                      <Box component="span" mr={0.2}>
                        ■
                      </Box>
                      募集人数:
                    </Box>
                    <Box>
                      <Box px={1} py={0.6} borderRadius={1} component="span" bgcolor="#f0f5f4">
                        <Box component="span" mr={0.6} fontSize={13} position="relative" top={2.7}>
                          <Emoji emoji=":raising_hand:" size={16} />
                        </Box>
                        <Box sx={{ fontSize: 14 }} component="span">
                          <Box component="span" sx={{ color: '#424242' }}>
                            {recruitment.capacity}人募集
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                <Box sx={{ fontSize: 14, display: 'flex' }}>
                  <Box sx={{ minWidth: 124 }}>
                    <Box component="span" mr={0.2}>
                      ■
                    </Box>
                    エリア・会場:
                  </Box>
                  <Box>
                    <Box px={1} py={0.6} borderRadius={1} component="span" bgcolor="#f0f5f4">
                      <Box component="span" mr={0.6} fontSize={14} position="relative" top={2.7}>
                        <Emoji emoji=":round_pushpin:" size={15} />
                      </Box>
                      <Box sx={{ fontSize: 14 }} component="span">
                        <Box component="span" sx={{ fontSize: 14 }}>
                          {recruitment.prefecture?.name}
                        </Box>
                        {!!recruitment.place && (
                          <Box component="span" sx={{ color: '#424242' }}>
                            （ {recruitment.place} ）
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {!!recruitment.locationLat && !!recruitment.locationLng && (
                  <Box sx={{ fontSize: 14, display: 'flex' }}>
                    <Box sx={{ minWidth: 124 }} />
                    <Box>
                      <LoadScript googleMapsApiKey={googleMapApiKey}>
                        <GoogleMap
                          mapContainerStyle={{ width: 600, height: 300 }}
                          center={{
                            lat: recruitment.locationLat ? recruitment.locationLat : 0,
                            lng: recruitment.locationLng ? recruitment.locationLng : 0,
                          }}
                          zoom={16}
                        >
                          <Marker
                            position={{
                              lat: recruitment.locationLat ? recruitment.locationLat : 0,
                              lng: recruitment.locationLng ? recruitment.locationLng : 0,
                            }}
                          />
                        </GoogleMap>
                      </LoadScript>
                    </Box>
                  </Box>
                )}
                <Box sx={{ fontSize: 14, display: 'flex' }}>
                  <Box sx={{ minWidth: 124 }}>
                    <Box component="span" mr={0.2}>
                      ■
                    </Box>
                    募集の詳細:&emsp;&emsp;
                  </Box>
                  <Box borderRadius={1} bgcolor="#f0f5f4" sx={{ mb: 1, minWidth: 600, maxWidth: 600 }}>
                    <Box
                      sx={{
                        color: '#424242',
                        fontSize: 14,
                        py: 1.2,
                        px: 2,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {recruitment.content}
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={3.5} sx={{ pl: 2 }}>
            <Box
              sx={{
                bgcolor: 'white',
                px: 3,
                py: 3,
                borderRadius: 2,
              }}
            >
              <Box sx={{ fontSize: 16, fontWeight: 'bold', color: '#616161' }}>1人が応募中</Box>
              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  fullWidth
                  disableRipple
                  variant="contained"
                  startIcon={<SendIcon />}
                  sx={{
                    py: 1.2,
                    fontSize: 13,
                    boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
                    ':hover': {
                      boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
                      bgcolor: '#00897b',
                    },
                  }}
                >
                  応募する
                </Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  disableRipple
                  fullWidth
                  variant="contained"
                  startIcon={<BookmarkBorderIcon sx={{ color: '#616161' }} />}
                  sx={{
                    py: 1.2,
                    fontSize: 13,
                    bgcolor: 'white',
                    color: '#616161',
                    boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 2px 6px 0 rgb(0 0 0 / 10%)',
                    ':hover': {
                      bgcolor: '#fafafa',
                      boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 2px 6px 0 rgb(0 0 0 / 10%)',
                    },
                  }}
                >
                  ストックする
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: 'white',
                px: 3,
                py: 3,
                mt: 3,
                borderRadius: 2,
              }}
            >
              <ListItem alignItems="center" sx={{ px: 0, py: 0 }}>
                <ListItemAvatar>
                  <Avatar alt="user avatar" src={recruitment.user.avatar} sx={{ width: 53, height: 53 }} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={<Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>{recruitment.user.name}</Typography>}
                  secondary={
                    <Button sx={{ px: 0, py: 0.1 }} disableRipple variant="outlined" size="small">
                      Follow
                    </Button>
                  }
                />
              </ListItem>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});
