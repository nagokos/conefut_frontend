import { memo, VFC } from 'react';
import { Select, InputLabel } from '@mui/material';
import { StyledSelectMenuItem, StyledRecruitmentSelectInput } from '../index';
import { CreateRecruitmentInput, useGetPrefecturesQuery } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<CreateRecruitmentInput, object>;
};
export const RecruitmentFormArea: VFC<Props> = memo((props) => {
  const { control } = props;
  const { loading, data } = useGetPrefecturesQuery();

  return (
    <Controller
      name="prefectureId"
      defaultValue=""
      control={control}
      render={({ field }) => (
        <>
          <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink>
            募集エリア
          </InputLabel>
          <Select
            defaultValue=""
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            }}
            {...field}
            fullWidth
            input={<StyledRecruitmentSelectInput />}
          >
            {data?.getPrefectures.map((prefecture) => (
              <StyledSelectMenuItem disableRipple key={prefecture.id} value={prefecture.id}>
                {prefecture.name}
              </StyledSelectMenuItem>
            ))}
          </Select>
        </>
      )}
    />
  );
});
