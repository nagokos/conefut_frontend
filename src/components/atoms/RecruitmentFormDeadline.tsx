import { memo, VFC, useState } from 'react';
import { InputLabel } from '@mui/material';
import { Control, Controller, UseFormGetValues } from 'react-hook-form';
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

export const RecruitmentFormDeadline: VFC<Props> = memo((props) => {
  const { control, watchIsPublished, watchType, getValues } = props;

  const deadline = new Date(getValues('closingAt'));

  const [valueDeadline, setValueDeadline] = useState<Date | null>(deadline);
  const [pickerDeadline, setPickerDeadline] = useState<boolean>(false);

  return (
    <Controller
      name="closingAt"
      control={control}
      render={({ field }) => (
        <>
          <InputLabel color="dark" sx={{ fontWeight: 'bold' }} shrink htmlFor="input-prefecture">
            募集期限
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
            <DateTimePicker
              open={pickerDeadline}
              onClose={() => setPickerDeadline(false)}
              minDate={new Date()}
              disableMaskedInput={true}
              renderInput={(props) => (
                <StyledRecruitmentInput
                  fullWidth
                  {...field}
                  type="text"
                  inputRef={props.inputRef}
                  inputProps={props.inputProps}
                  value={props.value}
                  onClick={() => setPickerDeadline(true)}
                />
              )}
              value={valueDeadline}
              onChange={(newValue) => {
                setValueDeadline(newValue);
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
