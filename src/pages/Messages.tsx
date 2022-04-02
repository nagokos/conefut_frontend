import { memo, VFC } from 'react';
import Box from '@mui/material/Box';

import {
  alpha,
  Avatar,
  Divider,
  Grid,
  IconButton,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
} from '@mui/material';
import { BiSend } from 'react-icons/bi';
import { Emoji } from 'emoji-mart';
import { useSize } from '../hooks';

const StyledDialogInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 20,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid rgb(207, 217, 222)',
    padding: '10px 10px',
    fontFamily: 'Roboto',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const Messages: VFC = memo(() => {
  const { isMobile } = useSize();

  return (
    <Box
      sx={{
        maxWidth: 1120,
        mx: 'auto',
      }}
    >
      {isMobile ? (
        <>
          <Box sx={{ px: 2.8, pt: 3, pb: 3 }}>
            <Box sx={{ fontWeight: 'bold' }}>ユーザーとのメッセージ</Box>
            <Box sx={{ mt: 2 }}>
              <StyledDialogInput placeholder="ユーザーとメッセージを検索" fullWidth sx={{ fontSize: 13 }} />
            </Box>
          </Box>
          <Divider sx={{ border: '.5px solid #f0f5f4' }} />
          <Box sx={{ overflow: 'scroll', maxHeight: 'calc(100vh - 66px - 123px)' }}>
            {[...Array(10)].map((_, i) => (
              <ListItem key={i} sx={{ px: 2.8, py: 1.6, ':hover': { bgcolor: '#f7faf9' }, cursor: 'pointer' }}>
                <ListItemAvatar sx={{ mr: 1 }}>
                  <Avatar
                    sx={{ width: 52, height: 52 }}
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      component="span"
                      sx={{ color: '#263238', fontFamily: 'Roboto' }}
                      fontSize={14}
                      fontWeight="bold"
                    >
                      さかなクン
                    </Box>
                  }
                  secondary={
                    <Box component="span" sx={{ fontSize: 13 }}>
                      6時間前にオンライン
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </Box>
        </>
      ) : (
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              borderRight: '1px solid #f0f5f4',
              borderLeft: '1px solid #f0f5f4',
              minHeight: 'calc(100vh - 66px)',
              maxHeight: 'calc(100vh - 66px)',
            }}
          >
            <Box sx={{ px: 2.8, pt: 3, pb: 3 }}>
              <Box sx={{ fontWeight: 'bold' }}>ユーザーとのメッセージ</Box>
              <Box sx={{ mt: 2 }}>
                <StyledDialogInput placeholder="ユーザーとメッセージを検索" fullWidth sx={{ fontSize: 13 }} />
              </Box>
            </Box>
            <Divider sx={{ border: '.5px solid #f0f5f4' }} />
            <Box sx={{ overflow: 'scroll', maxHeight: 'calc(100vh - 66px - 123px)' }}>
              {[...Array(10)].map((_, i) => (
                <ListItem key={i} sx={{ px: 2.8, py: 1.6, ':hover': { bgcolor: '#f7faf9' }, cursor: 'pointer' }}>
                  <ListItemAvatar sx={{ mr: 1 }}>
                    <Avatar
                      sx={{ width: 52, height: 52 }}
                      src="https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        component="span"
                        sx={{ color: '#263238', fontFamily: 'Roboto' }}
                        fontSize={14}
                        fontWeight="bold"
                      >
                        さかなクン
                      </Box>
                    }
                    secondary={
                      <Box component="span" sx={{ fontSize: 13 }}>
                        6時間前にオンライン
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ borderRight: '1px solid #f0f5f4', minHeight: 'calc(100vh - 66px)', maxHeight: 'calc(100vh - 66px)' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                minHeight: 'calc(100vh - 66px - 70px)',
                maxHeight: 'calc(100vh - 66px - 70px)',
              }}
            >
              <Box sx={{ overflow: 'auto', py: 3, px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'end', mb: 1 }}>
                  <Box>
                    <Box sx={{ width: 25, height: 25 }} />
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      border: '2px solid #009688',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      ml: 1,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontFamily: 'ヒラギノ角ゴシック',
                      maxWidth: 480,
                    }}
                  >
                    <Box sx={{ mt: 1, mb: 0.5 }}>下記募集への応募がありました！</Box>
                    <ListItem sx={{ px: 0, pt: 0.9 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          bgcolor: '#f0f5f4',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: 48,
                          minWidth: 48,
                          borderRadius: 3.5,
                          mr: 1,
                          cursor: 'pointer',
                        }}
                      >
                        <Emoji emoji=":handshake:" size={25} native />
                      </Paper>
                      <ListItemText
                        primary={
                          <Box component="span" sx={{ fontSize: 12.5, fontFamily: 'ヒラギノ角ゴシック' }}>
                            【3/20(日)12:00〜16:00】フルコート個人参加募集:300円(厚木ビックサーカスグランド[固めの人工芝])
                          </Box>
                        }
                      />
                    </ListItem>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'end', mb: 3 }}>
                  <Avatar
                    sx={{ width: 25, height: 25, mr: 1 }}
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
                  />
                  <Box
                    component="span"
                    sx={{
                      border: '1px solid #f0f5f4',
                      bgcolor: '#f0f5f4',
                      borderRadius: 5,
                      px: 2,
                      py: 1,
                      fontSize: 14,
                      fontFamily: 'ヒラギノ角ゴシック',
                      maxWidth: 480,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    初めまして。募集を拝見して応募させていただきました。
                    <br />
                    ぜひ、個人で参加させていただきたいです。
                    <br />
                    宜しくお願いたします。
                  </Box>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: 'row-reverse', mb: 1 }}>
                <Box
                  component="span"
                  sx={{
                    border: '2px solid #009688',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    fontSize: 13.5,
                    maxWidth: 480,
                    cursor: 'pointer',
                    fontFamily: 'ヒラギノ角ゴシック',
                  }}
                >
                  <Box sx={{ mt: 1, mb: 0.5 }}>下記募集への応募がありました！</Box>
                  <ListItem sx={{ px: 0, pt: 0.9 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: '#f0f5f4',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 50,
                        minWidth: 50,
                        borderRadius: 3.5,
                        mr: 1,
                        cursor: 'pointer',
                      }}
                    >
                      <Emoji emoji=":handshake:" size={28} native />
                    </Paper>
                    <ListItemText
                      primary={
                        <Box component="span" sx={{ fontSize: 13 }}>
                          【3/20(日)12:00〜16:00】フルコート個人参加募集:300円(厚木ビックサーカスグランド[固めの人工芝])
                        </Box>
                      }
                    />
                  </ListItem>
                </Box>
              </Box> */}
                <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: 'row-reverse' }}>
                  <Box
                    component="span"
                    sx={{
                      border: '1px solid #009688',
                      bgcolor: '#009688',
                      color: 'white',
                      borderRadius: 5,
                      px: 2,
                      py: 1,
                      fontSize: 14,
                      maxWidth: 480,
                      fontFamily: 'ヒラギノ角ゴシック',
                    }}
                  >
                    はじめまして。
                    <br />
                    この度は募集に応募いただきありがとうございます。
                    <br />
                    ぜひ、ご参加いただきたいので承諾させていただきます。
                    <br />
                    詳細については別途連絡いたします。
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 7,
                bgcolor: 'white',
              }}
            >
              <Box sx={{ minWidth: 746 }}>
                <Divider sx={{ mb: 1.2, border: '.5px solid #f0f5f4' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 3, pr: 1, justifyContent: 'center' }}>
                  <StyledDialogInput
                    maxRows={8}
                    onKeyDown={(event) => {
                      console.log(event.key == 'Enter' && event.shiftKey);
                      if (event.key == 'Enter' && event.shiftKey) {
                        return true;
                      } else {
                        return true;
                      }
                    }}
                    placeholder="メッセージを入力"
                    multiline
                    fullWidth
                    sx={{ mr: 0.5, fontSize: 14 }}
                  />
                  <IconButton disableTouchRipple color="primary">
                    <BiSend color="#009688" size={20} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
});
