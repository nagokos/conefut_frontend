import { memo, VFC } from 'react';
import { InputLabel } from '@mui/material';
import { StyledRecruitmentInput } from '../index';
import { CreateRecruitmentInput, Type } from '../../generated/graphql';
import { Controller, Control } from 'react-hook-form';

type Props = {
  control: Control<CreateRecruitmentInput, object>;
  watchIsPublished: boolean;
  watchType: Type;
};

export const RecruitmentFormPlace: VFC<Props> = memo((props) => {
  const { control, watchIsPublished, watchType } = props;
  return (
    <Controller
      name="place"
      control={control}
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
