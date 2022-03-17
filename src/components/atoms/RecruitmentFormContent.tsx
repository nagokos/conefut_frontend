import { memo, VFC } from 'react';
import { InputBase, Paper } from '@mui/material';

import { RecruitmentInput, Status, Type } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<RecruitmentInput, object>;
  watchStatus: Status;
  watchType: Type;
};

export const RecruitmentFormContent: VFC<Props> = memo((props) => {
  const { control, watchStatus, watchType } = props;

  return (
    <Controller
      name="content"
      control={control}
      render={({ field }) => (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            bgcolor: '#fff',
            minHeight: 330,
            mt: 3,
            border: '1px solid #e0f2f1',
          }}
        >
          <InputBase
            {...field}
            multiline
            fullWidth
            minRows={13}
            sx={{ fontSize: 14, py: 4, px: 4, fontFamily: 'Roboto' }}
            placeholder="募集の詳細"
          />
        </Paper>
      )}
    />
  );
});
