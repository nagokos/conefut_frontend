import { memo, VFC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSize } from '../../hooks';
type Props = {
  isOpenDialog: boolean;
  handleCloseDialog: () => void;
};

export const RecruitmentListApplicantsDialog: VFC<Props> = memo((props) => {
  const { isOpenDialog, handleCloseDialog } = props;

  const { isMobile } = useSize();

  return (
    <Dialog
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          boxShadow: '0 5px 20px #00166721;',
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: 'rgba(38, 50, 56, 0.25);',
        },
      }}
      open={isOpenDialog}
      onClose={handleCloseDialog}
    >
      <DialogTitle sx={{ pb: 0 }}>
        <Box sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ fontSize: 22 }}>応募者</Box>
          <IconButton onClick={handleCloseDialog} disableTouchRipple>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mt: 1.5, mb: 1.5 }}>
          <Grid container>
            <Grid item xs={4} alignItems="center">
              <Box sx={{ bgcolor: '#eeeeee', borderRadius: 2, mr: 1, fontFamily: 'ヒラギノ角ゴシック' }}>
                <Box sx={{ fontSize: 12, textAlign: 'center', py: 1.3 }}>募集人数 1</Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ bgcolor: '#fff0f0', color: 'red', borderRadius: 2, mx: 0.5 }}>
                <Box sx={{ fontSize: 12, textAlign: 'center', py: 1.3, fontFamily: 'ヒラギノ角ゴシック' }}>
                  対応待ち 0
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ bgcolor: '#f0f5f4', color: '#009688', borderRadius: 2, ml: 1 }}>
                <Box sx={{ fontSize: 12, textAlign: 'center', py: 1.3, fontFamily: 'ヒラギノ角ゴシック' }}>
                  承諾済み 1
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pb: 0.5, maxHeight: isMobile ? 'auto' : 420 }}>
        <List sx={{ pt: 0, minWidth: isMobile ? 'auto' : 380 }}>
          {[...Array(8)].map((_, i) => (
            <ListItem key={i} sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{ width: 45, height: 45 }}
                  src="https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box component="span" sx={{ color: '#263238', fontFamily: 'Roboto' }} fontSize={13} fontWeight="bold">
                    さかなクン
                  </Box>
                }
                secondary={
                  <Box component="span" sx={{ fontSize: 12, fontFamily: 'Roboto' }}>
                    03/22 14:06 に応募
                  </Box>
                }
              />
              <Button
                size="small"
                disableTouchRipple
                disableElevation
                variant="outlined"
                color="dark"
                sx={{ fontSize: 11, mr: 0.7, borderRadius: 2, minWidth: 53 }}
              >
                承諾
              </Button>
              <Button
                size="small"
                disableElevation
                disableTouchRipple
                color="dark"
                variant="outlined"
                sx={{ fontSize: 11, borderRadius: 2, minWidth: 55 }}
              >
                見送り
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
});
