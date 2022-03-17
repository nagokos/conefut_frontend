import { memo, VFC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, styled } from '@mui/material';

type Props = {
  id: string;
  open: boolean;
  handleClose: () => void;
  deleteCurrentUserRecruitment: (id: string) => void;
};

const StyledCancelButton = styled(Button)(() => ({
  '&:hover': {
    background: '#f5f5f5',
  },
}));

export const RecruitmentDeleteDialog: VFC<Props> = memo((props) => {
  const { id, open, handleClose, deleteCurrentUserRecruitment } = props;

  return (
    <Dialog
      maxWidth={false}
      PaperProps={{
        sx: {
          maxWidth: 320,
          borderRadius: 4,
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle sx={{ fontSize: 18, textAlign: 'center', mt: 1, fontWeight: 'bold', pb: 1 }}>
        本当に削除しますか？
      </DialogTitle>
      <DialogContent sx={{ px: 4, pb: 4 }}>
        <DialogContentText fontSize={13}>
          この操作は元に戻すことができません。
          <br />
          募集は完全に削除されます。
        </DialogContentText>
        <Grid mt={1} textAlign="center" container spacing={1.5}>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                deleteCurrentUserRecruitment(id);
                handleClose();
              }}
              disableRipple
              sx={{ fontSize: 14 }}
              size="large"
              fullWidth
              disableElevation
              color="error"
              variant="contained"
            >
              削除する
            </Button>
          </Grid>
          <Grid item xs={12}>
            <StyledCancelButton
              disableRipple
              size="large"
              onClick={handleClose}
              sx={{ border: '1px solid #e0e0e0', fontSize: 14 }}
              fullWidth
              disableElevation
              color="light"
              variant="contained"
            >
              キャンセル
            </StyledCancelButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});
