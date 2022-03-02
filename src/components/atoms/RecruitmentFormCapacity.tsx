import { memo, VFC } from 'react';
import { InputLabel } from '@mui/material';
import { StyledRecruitmentInput } from '../index';

import { RecruitmentInput, Status, Type } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<RecruitmentInput, object>;
  watchStatus: Status;
  watchType: Type;
};

export const RecruitmentFormCapacity: VFC<Props> = memo((props) => {
  const { control, watchStatus, watchType } = props;

  return (
    <Controller
      name="capacity"
      control={control}
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
