import { memo, VFC } from 'react';
import { InputLabel } from '@mui/material';
import { StyledRecruitmentInput } from '../index';

import { CreateRecruitmentInput } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<CreateRecruitmentInput, object>;
};

export const RecruitmentFormCapacity: VFC<Props> = memo((props) => {
  const { control } = props;

  return (
    <Controller
      name="capacity"
      control={control}
      defaultValue={0}
      rules={{
        required: '募集の詳細を入力してください',
      }}
      render={({ field }) => (
        <>
          <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
            募集人数
          </InputLabel>
          <StyledRecruitmentInput {...field} type="number" fullWidth />
        </>
      )}
    />
  );
});
