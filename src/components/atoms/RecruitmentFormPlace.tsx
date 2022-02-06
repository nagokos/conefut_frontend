import { memo, VFC } from 'react';
import { InputLabel } from '@mui/material';
import { StyledRecruitmentInput } from '../index';
import { CreateRecruitmentInput } from '../../generated/graphql';
import { Controller, Control } from 'react-hook-form';

type Props = {
  control: Control<CreateRecruitmentInput, object>;
};

export const RecruitmentFormPlace: VFC<Props> = memo((props) => {
  const { control } = props;
  return (
    <Controller
      name="place"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <>
          <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
            会場名
          </InputLabel>
          <StyledRecruitmentInput {...field} fullWidth />
        </>
      )}
    />
  );
});
