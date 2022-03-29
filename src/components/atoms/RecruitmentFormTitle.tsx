import { memo, VFC } from 'react';
import { InputBase } from '@mui/material';

import { RecruitmentInput } from '../../generated/graphql';
import { Controller, Control } from 'react-hook-form';
import { useSize } from '../../hooks';

type Props = {
  control: Control<RecruitmentInput, object>;
};
export const RecruitmentFormTitle: VFC<Props> = memo((props) => {
  const { control } = props;

  const { isMobile } = useSize();

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
          sx={{ fontWeight: 'bold', fontSize: isMobile ? 22 : 28, fontFamily: 'Roboto' }}
          placeholder="タイトル"
        />
      )}
    />
  );
});
