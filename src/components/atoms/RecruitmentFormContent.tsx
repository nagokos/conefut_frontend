import { memo, VFC } from 'react';
import { InputBase, Paper } from '@mui/material';

import { RecruitmentInput, Type } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<RecruitmentInput, object>;
  watchIsPublished: boolean;
  watchType: Type;
};

export const RecruitmentFormContent: VFC<Props> = memo((props) => {
  const { control, watchIsPublished, watchType } = props;

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
            height: 330,
            mt: 3,
          }}
        >
          <InputBase
            {...field}
            multiline
            rows={13}
            fullWidth
            sx={{ fontSize: 14, py: 4, px: 4 }}
            placeholder="募集の詳細"
          />
        </Paper>
      )}
    />
  );
});
