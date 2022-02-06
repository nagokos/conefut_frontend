import { memo, VFC } from 'react';
import { InputBase } from '@mui/material';

import { CreateRecruitmentInput } from '../../generated/graphql';
import { Controller, Control } from 'react-hook-form';

type Props = {
  control: Control<CreateRecruitmentInput, object>;
};
export const RecruitmentFormTitle: VFC<Props> = memo((props) => {
  const { control } = props;
  return (
    <Controller
      name="title"
      control={control}
      defaultValue=""
      rules={{
        required: 'タイトルを入力してください',
      }}
      render={({ field }) => (
        <InputBase
          {...field}
          multiline
          fullWidth
          sx={{ fontWeight: 'bold', fontSize: 28, px: 3 }}
          placeholder="タイトル"
        />
      )}
    />
  );
});
