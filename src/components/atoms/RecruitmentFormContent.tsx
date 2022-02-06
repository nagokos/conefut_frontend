import { memo, VFC } from 'react';
import { InputBase, Paper } from '@mui/material';

import { CreateRecruitmentInput } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<CreateRecruitmentInput, object>;
};

export const RecruitmentFormContent: VFC<Props> = memo((props) => {
  const { control } = props;

  return (
    <Controller
      name="content"
      control={control}
      defaultValue=""
      rules={{
        required: '募集の詳細を入力してください',
      }}
      render={({ field }) => (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            bgcolor: '#fff',
            height: 310,
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
