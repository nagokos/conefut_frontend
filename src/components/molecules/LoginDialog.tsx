import { memo, useEffect, VFC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GraphQLError } from 'graphql';
import { useSetRecoilState } from 'recoil';

import { useSize } from '../../hooks';
import { LoginUserInput, useGetCurrentUserQuery, useLoginUserMutation } from '../../generated/graphql';
import { flashMessage, flashState, flashType } from '../../store/flash';
import { isLoggedIn } from '../../reactive/user';
import { LoginFormEmail, LoginFormPassword } from '../index';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const LoginDialog: VFC<Props> = memo((props) => {
  const { open, handleClose } = props;
  const { isMobile } = useSize();

  const { refetch } = useGetCurrentUserQuery();
  const [loginUser, { loading, error }] = useLoginUserMutation();

  const navigate = useNavigate();

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const { control, handleSubmit, reset, setError } = useForm<LoginUserInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset();
  }, [handleClose]);

  const onSubmit: SubmitHandler<LoginUserInput> = async (userData: LoginUserInput) => {
    await loginUser({
      variables: {
        email: userData.email,
        password: userData.password,
      },
      onCompleted() {
        refetch();
      },
    });
    if (!loading) {
      setState(true);
      setMessage('ログインしました');
      setType('success');
      isLoggedIn(true);
      handleClose();
      navigate('/');
    }
  };

  useEffect(() => {
    error?.graphQLErrors?.forEach((error: GraphQLError) => {
      if (error.extensions) {
        setError(error.extensions['attribute'] as 'email' | 'password', {
          message: error.message,
        });
        setState(true);
        setMessage('フォームに不備があります');
        setType('error');
      }
    });
  }, [error]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 400,
          borderRadius: isMobile ? 0 : 2,
        },
      }}
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: 18, mt: 2.4, mr: 'auto', ml: 'auto' }}>
        <IconButton
          disableTouchRipple
          size="small"
          onClick={handleClose}
          sx={{ position: 'absolute', left: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        メールアドレスでログイン
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ px: 3.3, pt: 2 }}>
          <Grid spacing={{ xs: 1.8, sm: 1.8, md: 1.8 }} container>
            <Grid item xs={12} md={12}>
              <LoginFormEmail control={control} />
            </Grid>
            <Grid item xs={12} md={12}>
              <LoginFormPassword control={control} />
            </Grid>
            <Grid item xs={12} md={12} mb={1.2} sx={{ mt: 1 }}>
              <Button
                disableRipple
                size="large"
                disableElevation
                sx={{ fontSize: 13, pt: 1.4, pb: 1.4 }}
                fullWidth
                variant="contained"
                type="submit"
              >
                ログイン
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
});
