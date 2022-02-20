import { memo, useEffect, VFC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateUserInput, useCreateUserMutation, useGetCurrentUserQuery } from '../../generated/graphql';
import { GraphQLError } from 'graphql';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSize } from '../../hooks';
import { SignupFormName, SignupFormPassword, SignupFormEmail } from '../index';
import { flashMessage, flashState, flashType } from '../../store/flash';
import { isLoggedIn } from '../../reactive/user';
import { userSchema } from '../../yup/userSchema';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const SignupDialog: VFC<Props> = memo((props) => {
  const { open, handleClose } = props;
  const { isMobile } = useSize();

  const [signupUser, { loading, error }] = useCreateUserMutation();
  const { refetch } = useGetCurrentUserQuery();

  const navigate = useNavigate();

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const { control, handleSubmit, reset, setError } = useForm<CreateUserInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    reset();
  }, [handleClose]);

  const onSubmit: SubmitHandler<CreateUserInput> = async (userData: CreateUserInput) => {
    await signupUser({
      variables: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      },
      onCompleted() {
        refetch();
      },
    });
    if (!loading) {
      setState(true);
      setMessage('新規登録しました');
      setType('success');
      isLoggedIn(true);
      handleClose();
      navigate('/');
    }
  };

  useEffect(() => {
    error?.graphQLErrors?.forEach((error: GraphQLError) => {
      if (error.extensions) {
        setError(error.extensions['attribute'] as 'name' | 'email' | 'password', {
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
        メールアドレスで登録
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ px: 3.3, pt: 0 }}>
          <Grid spacing={{ xs: 1.8, sm: 1.8, md: 1.8 }} container>
            <Grid sx={{ marginRight: 'auto', marginLeft: 'auto' }} item xs={12} md={12}>
              <SignupFormName control={control} />
            </Grid>
            <Grid item xs={12} md={12}>
              <SignupFormEmail control={control} />
            </Grid>
            <Grid item xs={12} md={12}>
              <SignupFormPassword control={control} />
            </Grid>
            <Grid item xs={12} md={12} mb={1.2}>
              <Button
                disableRipple
                size="large"
                disableElevation
                sx={{ fontSize: 13, pt: 1.4, pb: 1.4 }}
                fullWidth
                variant="contained"
                type="submit"
              >
                登録する
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
});
