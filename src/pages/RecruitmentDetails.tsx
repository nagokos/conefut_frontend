import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { memo, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Status, Type, useGetRecruitmentQuery, useGetRecruitmentTagsQuery } from '../generated/graphql';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { IoMdPricetag } from 'react-icons/io';

import { RecruitmentDetailsApply } from '../components/index';
import { Emoji } from 'emoji-mart';
import { RiCheckboxBlankFill } from 'react-icons/ri';

export const RecruitmentDetails: VFC = memo(() => {
  const { recruitmentId } = useParams();

  const [data] = useGetRecruitmentQuery({
    variables: {
      id: String(recruitmentId),
    },
  });

  const [tagData] = useGetRecruitmentTagsQuery({
    variables: {
      recruitmentId: String(recruitmentId),
    },
  });

  const googleMapApiKey: string = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const recruitment = data.data?.getRecruitment;
  if (!recruitment) return null;

  const distanceToNowFromClosingAt = formatDistanceToNow(new Date(recruitment.closingAt), { locale: ja }).replace(
    /約/g,
    ''
  );

  const typeString = () => {
    if (recruitment.type === Type.Opponent) {
      return '試合相手の募集';
    } else if (recruitment.type === Type.Individual) {
      return '個人参加の募集';
    } else if (recruitment.type === Type.Member) {
      return 'メンバーの募集';
    } else if (recruitment.type === Type.Joining) {
      return 'チームに入りたい募集';
    } else if (recruitment.type === Type.Others) {
      return 'その他';
    }
  };

  const typeStringOther = () => {
    if (recruitment.type === Type.Opponent) {
      return '試合相手';
    } else if (recruitment.type === Type.Individual) {
      return '個人参加';
    } else if (recruitment.type === Type.Member) {
      return 'メンバー';
    } else if (recruitment.type === Type.Joining) {
      return 'チーム加入';
    } else if (recruitment.type === Type.Others) {
      return 'その他';
    }
  };

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
    <Box sx={{ bgcolor: '#f0f5f4', py: 6, minHeight: '100vh' }}>
      <Grid container sx={{ maxWidth: 1120, mx: 'auto' }}>
        <Grid item xs={8.5} sx={{ pr: 2 }}>
          <Box
            sx={{
              bgcolor: 'white',
              px: 3,
              py: 3,
              borderRadius: 2,
              boxShadow: '0 2px 4px #4385bb12;',
            }}
          >
            <Box sx={{ fontWeight: 'bold', fontSize: 25, mt: 2, mb: 1.3 }}>{recruitment?.title}</Box>
            <Divider sx={{ borderColor: '#ebf2f2' }} />
            <Stack spacing={3.8} sx={{ mt: 3.3 }}>
              <Box sx={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ minWidth: 124, display: 'flex', alignItems: 'center' }}>
                  <RiCheckboxBlankFill />
                  <Box sx={{ ml: 0.4 }}>募集競技:</Box>
                </Box>
                <Box>
                  <Box px={1.2} py={0.8} borderRadius={1} component="span" bgcolor="#f0f5f4">
                    <Box sx={{ fontSize: 14 }} component="span">
                      {recruitment.competition?.name}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ minWidth: 124, display: 'flex', alignItems: 'center' }}>
                  <RiCheckboxBlankFill />
                  <Box sx={{ ml: 0.4 }}>募集タイプ:</Box>
                </Box>
                <Box>
                  <Box px={1.2} py={0.8} borderRadius={1} component="span" bgcolor="#f0f5f4">
                    <Box sx={{ fontSize: 14 }} component="span">
                      {typeString()}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {!!recruitment.startAt && (
                <Box sx={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ minWidth: 124, display: 'flex', alignItems: 'center' }}>
                    <RiCheckboxBlankFill />
                    <Box sx={{ ml: 0.4 }}>開催日時:</Box>
                  </Box>
                  <Box>
                    <Box px={1.2} py={0.8} borderRadius={1} component="span" bgcolor="#f0f5f4">
                      <Box sx={{ fontSize: 14 }} component="span">
                        {recruitment.startAt}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box sx={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ minWidth: 124, display: 'flex', alignItems: 'center' }}>
                  <RiCheckboxBlankFill />
                  <Box sx={{ ml: 0.4 }}>募集期限:</Box>
                </Box>
                <Box>
                  <Box px={1.2} py={0.8} borderRadius={1} component="span" bgcolor="#f0f5f4">
                    <Box component="span" sx={{ fontSize: 14 }}>
                      {recruitment.status === Status.Published ? `残り${distanceToNowFromClosingAt}` : '締切'}
                    </Box>
                    <Box component="span" sx={{ color: '#424242', fontSize: 14 }}>
                      （{recruitment.closingAt}）
                    </Box>
                  </Box>
                </Box>
              </Box>
              {!!recruitment.capacity && (
                <Box sx={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ minWidth: 124, display: 'flex', alignItems: 'center' }}>
                    <RiCheckboxBlankFill />
                    <Box sx={{ ml: 0.4 }}>{recruitment.type === Type.Opponent ? '募集チーム数:' : '募集人数:'}</Box>
                  </Box>
                  <Box>
                    <Box px={1.2} py={0.8} borderRadius={1} component="span" bgcolor="#f0f5f4">
                      <Box sx={{ fontSize: 14 }} component="span">
                        <Box component="span" sx={{ color: '#424242' }}>
                          {recruitment.type === Type.Opponent
                            ? `${recruitment.capacity}チーム`
                            : `${recruitment.capacity}人`}
                          募集
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              <Box sx={{ fontSize: 14, display: 'flex' }}>
                <Box sx={{ minWidth: 124, display: 'flex', alignItems: 'center' }}>
                  <RiCheckboxBlankFill />
                  <Box sx={{ ml: 0.4 }}>エリア・会場:</Box>
                </Box>
                <Box>
                  <Box px={1.2} py={0.8} borderRadius={1} component="span" bgcolor="#f0f5f4">
                    <Box sx={{ fontSize: 14 }} component="span">
                      <Box component="span" sx={{ fontSize: 14 }}>
                        {recruitment.prefecture?.name}
                      </Box>
                      {!!recruitment.place && (
                        <Box component="span" sx={{ color: '#424242' }}>
                          （{recruitment.place}）
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              {!!recruitment.locationLat && !!recruitment.locationLng && (
                <Box sx={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ minWidth: 124 }} />
                  <Box>
                    <LoadScript googleMapsApiKey={googleMapApiKey}>
                      <GoogleMap
                        mapContainerStyle={{ width: 600, height: 300, borderRadius: 3 }}
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RiCheckboxBlankFill />
                    <Box sx={{ ml: 0.4 }}>募集詳細:</Box>
                  </Box>
                </Box>
                <Box borderRadius={1} bgcolor="#f0f5f4" sx={{ mb: 1, minWidth: 600, maxWidth: 600 }}>
                  <Box
                    sx={{
                      color: '#424242',
                      fontSize: 14,
                      py: 1.7,
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
              py: 2,
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 2px 4px #4385bb12;',
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Tags</Typography>
            <Grid container>
              {tagData.data?.getRecruitmentTags.map((tag) => (
                <Grid key={tag?.id} item xs={6} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box
                    sx={{
                      border: '1px solid #eceff1',
                      borderRadius: 20,
                      width: 32,
                      height: 32,
                      bgcolor: '#f0f5f4',
                      display: 'flex',
                      mr: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IoMdPricetag color="#009688" size={19} />
                  </Box>
                  <Box sx={{ fontFamily: 'Roboto', fontSize: 12 }}>{tag?.name}</Box>
                </Grid>
              ))}
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', mt: 1.2 }}>
                <Box
                  sx={{
                    border: '1px solid #eceff1',
                    borderRadius: 20,
                    width: 32,
                    height: 32,
                    bgcolor: '#f0f5f4',
                    display: 'flex',
                    mr: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Emoji native emoji=":soccer:" size={18} />
                </Box>
                <Box sx={{ fontFamily: 'Roboto', fontSize: 12 }}>{recruitment.competition?.name}</Box>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', mt: 1.2 }}>
                <Box
                  sx={{
                    border: '1px solid #eceff1',
                    borderRadius: 20,
                    width: 32,
                    height: 32,
                    bgcolor: '#f0f5f4',
                    display: 'flex',
                    mr: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Emoji native emoji={typeEmoji()} size={18} />
                </Box>
                <Box sx={{ fontFamily: 'Roboto', fontSize: 12 }}>{typeStringOther()}</Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ position: 'sticky', top: 30 }}>
            <RecruitmentDetailsApply recruitment={recruitment} />
            <Box
              sx={{
                bgcolor: 'white',
                px: 3,
                py: 3,
                mt: 3,
                borderRadius: 3,
                boxShadow: '0 2px 4px #4385bb12;',
              }}
            >
              <ListItem alignItems="center" sx={{ px: 0, py: 0 }}>
                <ListItemAvatar>
                  <Avatar alt="user avatar" src={recruitment.user.avatar} sx={{ width: 60, height: 60 }} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={<Box sx={{ fontSize: 16, fontWeight: 'bold' }}>{recruitment.user.name}</Box>}
                  secondary={
                    <Button
                      sx={{
                        px: 0,
                        py: 0,
                        position: 'relative',
                        top: 4,
                        fontFamily: ['Roboto'],
                        fontWeight: 100,
                      }}
                      disableRipple
                      variant="outlined"
                      size="small"
                    >
                      Follow
                    </Button>
                  }
                />
              </ListItem>
              <Box sx={{ fontSize: 14.3, mt: 1.5 }}>
                フリーランスでwebエンジニアやらせてもらってます。 メインスタックはLaravel / Vue / Nextなど AWS
                SAAとりました
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});
