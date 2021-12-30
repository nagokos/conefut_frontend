import { ChangeEvent, memo, useEffect, useState } from 'react';
import { VFC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useSize } from '../../hooks';
import { StyledDialogInput } from '../index';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../types';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const SignupDialog: VFC<Props> = memo((props) => {
  const { open, handleClose } = props;
  const [isShow, setIsShow] = useState<boolean>(false);
  const { isMobile } = useSize();

  const { control, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset();
  }, [handleClose]);

  const changeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): string => {
    const str: string = e.target.value;
    return str.trim();
  };

  const handleClickShowPassword = () => {
    setIsShow(!isShow);
  };

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    console.log(data);
  };

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
              <Controller
                name="name"
                control={control}
                rules={{
                  required: '名前を入力してください',
                }}
                render={({ field: { onChange }, formState: { errors } }) => (
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ fontWeight: 'bold' }} shrink htmlFor="input-name">
                      お名前
                    </InputLabel>
                    <StyledDialogInput
                      error={!!errors.name}
                      onChange={(e) => onChange(changeName(e))}
                      type="text"
                      placeholder="ユーザー名"
                      id="input-name"
                    />
                    <FormHelperText error={!!errors.name}>{errors.name ? errors.name.message : ' '}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name="email"
                rules={{
                  required: 'メールアドレスを入力してください',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
                    message: 'メールアドレスを正しく入力してください',
                  },
                }}
                control={control}
                render={({ field, formState: { errors } }) => (
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ fontWeight: 'bold' }} shrink htmlFor="input-email">
                      メールアドレス
                    </InputLabel>
                    <StyledDialogInput {...field} type="email" placeholder="email@example.com" id="input-email" />
                    <FormHelperText error={!!errors.email}>{errors.email ? errors.email.message : ' '}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'パスワードを入力してください',
                  min: 8,
                  pattern: {
                    value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i,
                    message: 'パスワードを正しく入力してください',
                  },
                }}
                render={({ field, formState: { errors } }) => (
                  <FormControl fullWidth variant="standard">
                    <InputLabel sx={{ fontWeight: 'bold' }} shrink htmlFor="input-password">
                      パスワード
                    </InputLabel>
                    <StyledDialogInput
                      placeholder="8文字以上の半角英数字"
                      type={isShow ? 'text' : 'password'}
                      fullWidth
                      {...field}
                      id="input-password"
                    />
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      size="small"
                      edge="end"
                      sx={{ position: 'absolute', right: 10, top: 32 }}
                    >
                      {isShow ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                    </IconButton>
                    <FormHelperText error={!!errors.password}>
                      {errors.password ? errors.password.message : ' '}
                    </FormHelperText>
                  </FormControl>
                )}
              />
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
