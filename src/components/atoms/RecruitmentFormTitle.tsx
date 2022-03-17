import { memo, VFC } from 'react';
import { InputBase } from '@mui/material';

import { RecruitmentInput } from '../../generated/graphql';
import { Controller, Control } from 'react-hook-form';

type Props = {
  control: Control<RecruitmentInput, object>;
};
export const RecruitmentFormTitle: VFC<Props> = memo((props) => {
  const { control } = props;
  return (
    <Controller
      name="title"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <InputBase
          {...field}
          multiline
          fullWidth
          sx={{ fontWeight: 'bold', fontSize: 28, px: 3, fontFamily: 'Roboto' }}
          placeholder="タイトル"
        />
      )}
    />
  );
});
