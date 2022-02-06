import { memo } from 'react';
import { VFC } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Control, Controller } from 'react-hook-form';

import { StyledDialogInput } from '../index';
import { LoginUserInput } from '../../generated/graphql';

type Props = {
  control: Control<LoginUserInput, object>;
};

export const LoginFormEmail: VFC<Props> = memo((props) => {
  const { control } = props;

  return (
    <Controller
      name="email"
      rules={{
        required: 'メールアドレスを入力してください',
        pattern: {
          value: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
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
  );
});
