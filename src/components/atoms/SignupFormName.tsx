import { VFC, memo, ChangeEvent } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { StyledDialogInput } from '../index';
import { Control, Controller } from 'react-hook-form';
import { CreateUserInput } from '../../generated/graphql';

type Props = {
  control: Control<CreateUserInput, object>;
};

export const SignupFormName: VFC<Props> = memo((props) => {
  const { control } = props;

  const changeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): string => {
    const str: string = e.target.value;
    return str.trim();
  };

  return (
    <Controller
      name="name"
      control={control}
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
  );
});
