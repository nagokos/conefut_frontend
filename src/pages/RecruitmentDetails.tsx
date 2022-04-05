import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { memo, MouseEvent, useState, VFC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  EmailVerificationStatus,
  Status,
  Type,
  useCheckStockedQuery,
  useCreateStockMutation,
  useDeleteStockMutation,
  useGetCurrentUserQuery,
  useGetRecruitmentQuery,
  useGetRecruitmentTagsQuery,
} from '../generated/graphql';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { IoMdPricetag } from 'react-icons/io';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { RecruitmentApplicantDialog, RecruitmentDetailsApply } from '../components/index';
import { Emoji } from 'emoji-mart';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useSize } from '../hooks';

export const RecruitmentDetails: VFC = memo(() => {
  const { recruitmentId } = useParams();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { isMobile } = useSize();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data] = useGetRecruitmentQuery({
    variables: {
      id: String(recruitmentId),
    },
  });

  const recruitment = data.data?.getRecruitment;

  const [tagData] = useGetRecruitmentTagsQuery({
    variables: {
      recruitmentId: String(recruitmentId),
    },
  });

  const [userData] = useGetCurrentUserQuery();

  const [createResult, createStock] = useCreateStockMutation();
  const [deleteResult, deleteStock] = useDeleteStockMutation();

  const [isData, executeQuery] = useCheckStockedQuery({
    variables: {
      recruitmentId: String(recruitment?.id),
    },
  });

  const isLoggedIn = !!userData.data?.getCurrentUser;
  const isStocked = isData.data?.checkStocked;

  const addStock = async (event: MouseEvent) => {
    event.stopPropagation();
    if (!isLoggedIn) return navigate('/login');
    const variables = { recruitmentId: String(recruitment?.id) };
    await createStock(variables);
    executeQuery({
      requestPolicy: 'network-only',
    });
  };

  const removeStock = async (event: MouseEvent) => {
    event.stopPropagation();
    if (!isLoggedIn) return navigate('/login');
    const variables = { recruitmentId: String(recruitment?.id) };
    await deleteStock(variables);
    executeQuery({
      requestPolicy: 'network-only',
    });
  };

  const googleMapApiKey: string = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

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
    <>
      {isMobile && (
        <Box
          sx={{ borderBottom: '1px solid #ebf2f2', py: 0.4, position: 'sticky', top: 0, bgcolor: '#fff', zIndex: 100 }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar src={recruitment.user.avatar} sx={{ width: 44, height: 44 }} />
            </ListItemAvatar>
            <ListItemText primary={<Box sx={{ fontSize: 15, fontWeight: 'bold' }}>{recruitment.user.name}</Box>} />
            {isStocked ? (
              <IconButton
                sx={{
                  bgcolor: '#fcf1ed',
                  transition: '400ms',
                  ':hover': {
                    bgcolor: '#fcf1ed',
                  },
                }}
                disableRipple
                onClick={(event) => removeStock(event)}
              >
                <BookmarkIcon sx={{ color: '#ff784e', fontSize: 24 }} />
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  bgcolor: '#f0f5f4',
                  transition: '400ms',
                  ':hover': {
                    bgcolor: '#e9f2f2',
                  },
                }}
                disableRipple
                onClick={(event) => addStock(event)}
              >
                <BookmarkBorderIcon sx={{ color: '#90a4ae', fontSize: 24 }} />
              </IconButton>
            )}
          </ListItem>
        </Box>
      )}
      <Box sx={{ bgcolor: isMobile ? '#fff' : '#f0f5f4', py: isMobile ? 0 : 6, minHeight: '100vh' }}>
        <Grid container sx={{ maxWidth: 1120, mx: 'auto' }}>
          <Grid item xs={12} md={8.5} sx={{ pr: isMobile ? 0 : 2 }}>
            <Box
              sx={{
                bgcolor: 'white',
                px: isMobile ? 2 : 3,
                py: isMobile ? 1 : 3,
                borderRadius: 2,
                boxShadow: isMobile ? ' ' : '0 2px 4px #4385bb12;',
              }}
            >
              <Box sx={{ fontWeight: 'bold', fontSize: isMobile ? 22.5 : 25, mt: 2, mb: 1.3 }}>
                {recruitment?.title}
              </Box>
              <Divider sx={{ borderColor: '#ebf2f2' }} />
              {isMobile && (
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}>
                  {tagData.data?.getRecruitmentTags.map((tag) => (
                    <Box key={tag?.id} sx={{ display: 'flex', alignItems: 'center', mr: 1.5, mt: 1.2 }}>
                      <Box
                        sx={{
                          border: '1px solid #eceff1',
                          borderRadius: 20,
                          width: 25,
                          height: 25,
                          bgcolor: '#f0f5f4',
                          display: 'flex',
                          mr: 0.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IoMdPricetag color="#009688" size={17} />
                      </Box>
                      <Box sx={{ fontFamily: 'ヒラギノ角ゴシック', fontSize: 11.5 }}>{tag?.name}</Box>
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5, mt: 1.2 }}>
                    <Box
                      sx={{
                        border: '1px solid #eceff1',
                        borderRadius: 20,
                        width: 25,
                        height: 25,
                        bgcolor: '#f0f5f4',
                        display: 'flex',
                        mr: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Emoji native emoji=":soccer:" size={15} />
                    </Box>
                    <Box sx={{ fontFamily: 'ヒラギノ角ゴシック', fontSize: 11.5 }}>{recruitment.competition?.name}</Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5, mt: 1.2 }}>
                    <Box
                      sx={{
                        border: '1px solid #eceff1',
                        borderRadius: 20,
                        width: 25,
                        height: 25,
                        bgcolor: '#f0f5f4',
                        display: 'flex',
                        mr: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Emoji native emoji={typeEmoji()} size={15} />
                    </Box>
                    <Box sx={{ fontFamily: 'ヒラギノ角ゴシック', fontSize: 11.5 }}>{typeStringOther()}</Box>
                  </Box>
                </Box>
              )}
              <Stack spacing={3.8} sx={{ mt: 3 }}>
                <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                    <RiCheckboxBlankFill />
                    <Box sx={{ ml: 0.4 }}>募集競技</Box>
                  </Box>
                  <Box px={1.2} py={0.6} borderRadius={1} bgcolor="#f0f5f4">
                    <Box sx={{ fontSize: isMobile ? 13 : 14 }}>{recruitment.competition?.name}</Box>
                  </Box>
                </Box>
                <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                    <RiCheckboxBlankFill />
                    <Box sx={{ ml: 0.4 }}>募集タイプ</Box>
                  </Box>
                  <Box px={1.2} py={0.6} borderRadius={1} bgcolor="#f0f5f4">
                    <Box sx={{ fontSize: isMobile ? 13 : 14 }}>{typeString()}</Box>
                  </Box>
                </Box>
                {!!recruitment.startAt && (
                  <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                      <RiCheckboxBlankFill />
                      <Box sx={{ ml: 0.4 }}>開催日時</Box>
                    </Box>
                    <Box px={1.2} py={0.6} borderRadius={1} bgcolor="#f0f5f4">
                      <Box sx={{ fontSize: isMobile ? 13 : 14 }}>{recruitment.startAt}</Box>
                    </Box>
                  </Box>
                )}
                <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                    <RiCheckboxBlankFill />
                    <Box sx={{ ml: 0.4 }}>募集期限</Box>
                  </Box>
                  <Box
                    pr={0.6}
                    pl={1.2}
                    py={0.6}
                    borderRadius={1}
                    bgcolor="#f0f5f4"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Box sx={{ fontSize: isMobile ? 12 : 14 }}>
                      {recruitment.status === Status.Published ? `残り${distanceToNowFromClosingAt}` : '締切'}
                    </Box>
                    <Box sx={{ color: '#424242', fontSize: isMobile ? 11 : 14 }}>（{recruitment.closingAt}）</Box>
                  </Box>
                </Box>
                {!!recruitment.capacity && (
                  <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                      <RiCheckboxBlankFill />
                      <Box sx={{ ml: 0.4 }}>定員数</Box>
                    </Box>
                    <Box px={1.2} py={0.6} borderRadius={1} bgcolor="#f0f5f4">
                      <Box sx={{ fontSize: isMobile ? 13 : 14 }}>
                        <Box sx={{ color: '#424242' }}>
                          {recruitment.type === Type.Opponent
                            ? `${recruitment.capacity}チーム`
                            : `${recruitment.capacity}人`}
                          募集
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
                {isMobile ? (
                  <>
                    <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex' }}>
                      <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                        <RiCheckboxBlankFill />
                        <Box sx={{ ml: 0.4 }}>エリア</Box>
                      </Box>
                      <Box px={1.2} py={0.6} borderRadius={1} bgcolor="#f0f5f4">
                        <Box sx={{ fontSize: isMobile ? 13 : 14 }}>
                          <Box sx={{ fontSize: isMobile ? 13 : 14 }}>{recruitment.prefecture?.name}</Box>
                        </Box>
                      </Box>
                    </Box>
                    {!!recruitment.place && (
                      <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex' }}>
                        <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                          <RiCheckboxBlankFill />
                          <Box sx={{ ml: 0.4 }}>会場</Box>
                        </Box>
                        <Box py={0.6} borderRadius={1} bgcolor="#f0f5f4">
                          <Box sx={{ fontSize: isMobile ? 13 : 14, px: 1 }}>
                            {!!recruitment.place && <Box sx={{ color: '#424242' }}>{recruitment.place}</Box>}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex' }}>
                    <Box sx={{ minWidth: isMobile ? 100 : 124, display: 'flex', alignItems: 'center' }}>
                      <RiCheckboxBlankFill />
                      <Box sx={{ ml: 0.4 }}>エリア・会場</Box>
                    </Box>
                    <Box pr={recruitment.place === '' ? 1.2 : 0.6} pl={1.2} py={0.6} borderRadius={1} bgcolor="#f0f5f4">
                      <Box
                        sx={{
                          fontSize: isMobile ? 13 : 14,
                          display: 'flex',
                          alignItems: 'center',
                          overflowWrap: 'break-word',
                        }}
                      >
                        <Box sx={{ fontSize: isMobile ? 13 : 14 }}>{recruitment.prefecture?.name}</Box>
                        {!!recruitment.place && <Box sx={{ color: '#424242' }}>（{recruitment.place}）</Box>}
                      </Box>
                    </Box>
                  </Box>
                )}
                {!!recruitment.locationLat && !!recruitment.locationLng && (
                  <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex', alignItems: 'center' }}>
                    {!isMobile && <Box sx={{ minWidth: isMobile ? 100 : 124 }} />}
                    <LoadScript googleMapsApiKey={googleMapApiKey}>
                      <GoogleMap
                        mapContainerStyle={{
                          width: isMobile ? 'calc(100vw - 32px)' : 600,
                          height: isMobile ? 250 : 300,
                          borderRadius: 3,
                        }}
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
                )}
                <Box sx={{ fontSize: isMobile ? 13 : 14, display: 'flex' }}>
                  <Box sx={{ minWidth: isMobile ? 100 : 124 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <RiCheckboxBlankFill />
                      <Box sx={{ ml: 0.4 }}>募集詳細</Box>
                    </Box>
                  </Box>
                  <Box
                    borderRadius={1}
                    bgcolor="#f0f5f4"
                    sx={{
                      mb: 1,
                      minWidth: isMobile ? 'calc(100vw - 32px - 100px)' : 600,
                      maxWidth: isMobile ? 'calc(100vw - 32px - 100px)' : 600,
                    }}
                  >
                    <Box
                      sx={{
                        color: '#424242',
                        fontSize: isMobile ? 13 : 14,
                        py: 1.7,
                        px: 2,
                        overflowWrap: 'break-word',
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
          {!isMobile && (
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
                    <Grid
                      key={tag?.id}
                      item
                      xs={6}
                      sx={{ display: 'flex', alignItems: 'center', mt: 1, overflowWrap: 'break-word' }}
                    >
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
                      <Box sx={{ fontFamily: 'ヒラギノ角ゴシック', fontSize: 12 }}>{tag?.name}</Box>
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
                    <Box sx={{ fontFamily: 'ヒラギノ角ゴシック', fontSize: 12 }}>{recruitment.competition?.name}</Box>
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
                    <Box sx={{ fontFamily: 'ヒラギノ角ゴシック', fontSize: 12 }}>{typeStringOther()}</Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ position: 'sticky', top: 30, overflowWrap: 'break-word' }}>
                <RecruitmentDetailsApply handleClickOpen={handleClickOpen} recruitment={recruitment} />
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
                    SAAとりました============================================================================
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      {isMobile && userData.data?.getCurrentUser?.id !== recruitment.user.id && (
        <Box sx={{ width: 'auto' }}>
          <Button
            variant="contained"
            size="large"
            disableRipple
            disableElevation
            disabled={userData.data?.getCurrentUser?.emailVerificationStatus === EmailVerificationStatus.Pending}
            sx={{
              position: 'fixed',
              bottom: 16,
              py: 1.3,
              right: 30,
              left: 30,
              boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
              ':hover': {
                boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
                bgcolor: '#00897b',
              },
            }}
            onClick={handleClickOpen}
          >
            応募する
          </Button>
        </Box>
      )}
      <RecruitmentApplicantDialog handleClose={handleClose} open={open} />
    </>
  );
});
