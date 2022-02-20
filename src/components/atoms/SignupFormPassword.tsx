import { memo, useState, VFC } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { StyledDialogInput } from '../index';
import { Control, Controller } from 'react-hook-form';
import { CreateUserInput } from '../../generated/graphql';

type Props = {
  control: Control<CreateUserInput, object>;
};

export const SignupFormPassword: VFC<Props> = memo((props) => {
  const { control } = props;
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setIsShow(!isShow);
  };

  return (
    <Controller
      name="password"
      control={control}
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
          <FormHelperText error={!!errors.password}>{errors.password ? errors.password.message : ' '}</FormHelperText>
        </FormControl>
      )}
    />
  );
});
