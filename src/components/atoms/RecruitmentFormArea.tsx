import { memo, VFC } from 'react';
import { Select, InputLabel } from '@mui/material';
import { StyledSelectMenuItem, StyledRecruitmentSelectInput } from '../index';
import { RecruitmentInput, Status, Type, useGetPrefecturesQuery } from '../../generated/graphql';
import { Control, Controller, UseFormGetValues } from 'react-hook-form';

type Props = {
  control: Control<RecruitmentInput, object>;
  getValues: UseFormGetValues<RecruitmentInput>;
  watchStatus: Status;
  watchType: Type;
};
export const RecruitmentFormArea: VFC<Props> = memo((props) => {
  const { control, getValues, watchStatus, watchType } = props;
  const [data] = useGetPrefecturesQuery();

  return (
    <Controller
      name="prefectureId"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <>
          <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink>
            募集エリア
          </InputLabel>
          <Select
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            }}
            {...field}
            fullWidth
            defaultValue=""
            input={<StyledRecruitmentSelectInput />}
          >
            {data.data?.getPrefectures.map((prefecture) => (
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
