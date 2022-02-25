import { memo, VFC } from 'react';
import { Select, InputLabel } from '@mui/material';
import { StyledSelectMenuItem, StyledRecruitmentSelectInput } from '../index';
import { RecruitmentInput, Level, Type } from '../../generated/graphql';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<RecruitmentInput, object>;
  watchIsPublished: boolean;
  watchType: Type;
};

interface MenuItem {
  id: string;
  value: string;
}

export const RecruitmentFormLevel: VFC<Props> = memo((props) => {
  const { control, watchIsPublished, watchType } = props;

  const levels: Array<MenuItem> = [
    { id: Level.Unnecessary, value: '' },
    { id: Level.Enjoy, value: 'エンジョイ' },
    { id: Level.Beginner, value: 'ビギナー' },
    { id: Level.Middle, value: 'ミドル' },
    { id: Level.Expert, value: 'エキスパート' },
    { id: Level.Open, value: 'オープン' },
  ];

  return (
    <Controller
      name="level"
      control={control}
      render={({ field }) => (
        <>
          <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
            レベル
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
            input={<StyledRecruitmentSelectInput />}
          >
            {levels.map((level: MenuItem) => (
              <StyledSelectMenuItem
                sx={{ display: level.id === Type.Unnecessary ? 'none' : '' }}
                disableRipple
                key={level.id}
                value={level.id}
              >
                {level.value}
              </StyledSelectMenuItem>
            ))}
          </Select>
        </>
      )}
    />
  );
});
