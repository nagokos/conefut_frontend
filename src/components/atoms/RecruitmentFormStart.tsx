import { memo, VFC, useState } from 'react';
import { Control, Controller, UseFormGetValues } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ja from 'date-fns/locale/ja';

import { RecruitmentInput, Type } from '../../generated/graphql';
import { StyledRecruitmentInput } from '../index';
import { format } from 'date-fns';

type Props = {
  control: Control<RecruitmentInput, object>;
  watchIsPublished: boolean;
  watchType: Type;
  getValues: UseFormGetValues<RecruitmentInput>;
};

export const RecruitmentFormStart: VFC<Props> = memo((props) => {
  const { control, watchIsPublished, watchType, getValues } = props;

  const start = new Date(getValues('startAt'));

  const [valueHold, setValueHold] = useState<Date | null>(start);
  const [pickerHold, setPickerHold] = useState<boolean>(false);

  return (
    <Controller
      name="startAt"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <>
          <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
            開催日時
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
            <DateTimePicker
              open={pickerHold}
              onClose={() => setPickerHold(false)}
              minDate={new Date()}
              disableMaskedInput={true}
              renderInput={(props) => (
                <StyledRecruitmentInput
                  fullWidth
                  type="text"
                  inputRef={props.inputRef}
                  inputProps={props.inputProps}
                  value={props.value}
                  onClick={() => setPickerHold(true)}
                />
              )}
              value={valueHold}
              onChange={(newValue) => {
                setValueHold(newValue);
                if (!newValue) {
                  return;
                }
                field.onChange(format(new Date(String(newValue)), 'yyyy/MM/dd HH:mm'));
              }}
            />
          </LocalizationProvider>
        </>
      )}
    />
  );
});
