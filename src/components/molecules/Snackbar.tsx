import { memo, SyntheticEvent, VFC } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { flashMessage, flashState, flashType } from '../../store/flash';

export const SnackbarNotification: VFC = memo(() => {
  const [state, setState] = useRecoilState(flashState);
  const message = useRecoilValue(flashMessage);
  const type = useRecoilValue(flashType);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setState(false);
  };
  return (
    <div>
      <Snackbar
        open={state}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          sx={{
            bgcolor: '#263238',
            fontWeight: 'bold',
            color: 'white',
            width: '100%',

            boxShadow: '0 2px 7px 0 rgba(0, 0, 0, .5);',
          }}
        >
          <span style={{ position: 'relative', top: 0.8 }}>{message}</span>
        </Alert>
      </Snackbar>
    </div>
  );
});
