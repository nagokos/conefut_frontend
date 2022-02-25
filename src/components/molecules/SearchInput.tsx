import { memo, useState, VFC } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { StyledSelectMenuItem, SearchInputGrey, StyledInput, StyledDateField } from '../index';
import { Prefecture, useGetPrefecturesQuery } from '../../generated/graphql';

export const SearchInput: VFC = memo(() => {
  const [select, setSelect] = useState('0');
  const [selectPrefecture, setSelectPrefecture] = useState<string>('0');
  const [value, setValue] = useState<Date | null>(null);
  const [picker, setPicker] = useState<boolean>(false);

  const { loading, error, data } = useGetPrefecturesQuery();

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(String(event.target.value));
  };

  const changeSelectPrefecture = (event: SelectChangeEvent) => {
    setSelectPrefecture(String(event.target.value));
  };

  return (
    <Box maxWidth={228}>
      <Typography fontWeight="bold" color="#9e9e9e" fontSize={13}>
        検索条件
      </Typography>
      <Box mt={1.4}>
        <SearchInputGrey />
      </Box>
      <Select
        input={<StyledInput />}
        size="small"
        sx={{ mt: 2.8, borderRadius: 1, color: select === '0' ? '#9e9e9e' : 'black' }}
        fullWidth
        value={select}
        onChange={handleChange}
      >
        <StyledSelectMenuItem value="0" disabled>
          募集タイプ
        </StyledSelectMenuItem>
        <StyledSelectMenuItem value={10}>試合相手の募集</StyledSelectMenuItem>
        <StyledSelectMenuItem value={20}>個人での参加の募集</StyledSelectMenuItem>
        <StyledSelectMenuItem value={30}>チームメイトの募集</StyledSelectMenuItem>
        <StyledSelectMenuItem value={40}>チームに入りたい募集</StyledSelectMenuItem>
        <StyledSelectMenuItem value={50}>コーチの募集</StyledSelectMenuItem>
        <StyledSelectMenuItem value={60}>その他</StyledSelectMenuItem>
      </Select>
      <Select
        input={<StyledInput />}
        size="small"
        sx={{ mt: 2, borderRadius: 1, maxHeight: 200, color: selectPrefecture === '0' ? '#9e9e9e' : 'black' }}
        fullWidth
        value={selectPrefecture}
        onChange={changeSelectPrefecture}
        renderValue={(selected) => {
          const target = prefectures?.find((prefecture) => prefecture.id === selected);
          if (target) {
            return target.name;
          } else {
            return '地域';
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300,
            },
          },
        }}
      >
        <StyledSelectMenuItem value="0" disabled>
          地域
        </StyledSelectMenuItem>
        {prefectures?.map((prefecture: Prefecture) => (
          <StyledSelectMenuItem disableRipple key={prefecture.id} value={prefecture.id}>
            {prefecture.name}
            {prefecture.id === selectPrefecture && (
              <CheckCircleIcon sx={{ fontSize: 16, color: '#009688', ml: 'auto' }} />
            )}
          </StyledSelectMenuItem>
        ))}
      </Select>
      <Select
        input={<StyledInput />}
        size="small"
        sx={{ mt: 2, borderRadius: 1, color: select === '0' ? '#9e9e9e' : 'black' }}
        fullWidth
        value={select}
        onChange={handleChange}
      >
        <StyledSelectMenuItem value="0" disabled>
          レベル
        </StyledSelectMenuItem>
        <StyledSelectMenuItem value={10}>エンジョイ</StyledSelectMenuItem>
        <StyledSelectMenuItem value={20}>ビギナー</StyledSelectMenuItem>
        <StyledSelectMenuItem value={30}>ミドル</StyledSelectMenuItem>
        <StyledSelectMenuItem value={40}>エキスパート</StyledSelectMenuItem>
      </Select>

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
        <DatePicker
          value={value}
          onClose={() => setPicker(false)}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          open={picker}
          minDate={new Date()}
          disableMaskedInput={true}
          inputFormat={value ? 'yyyy/M/d' : '開催日'}
          renderInput={(props) => (
            <StyledDateField
              fullWidth
              sx={{ mt: 2 }}
              inputRef={props.inputRef}
              inputProps={props.inputProps}
              value={props.value}
              onClick={() => setPicker(true)}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
});
