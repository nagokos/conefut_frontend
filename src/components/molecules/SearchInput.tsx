import { memo, useState, VFC } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';

import { StyledMenuItem, SearchInputGrey, StyledInput, StyledDateField } from '../index';

export const SearchInput: VFC = memo(() => {
  const [select, setSelect] = useState('0');
  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(String(event.target.value));
  };

  return (
    <Box>
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
        <StyledMenuItem value="0" disabled>
          募集タイプ
        </StyledMenuItem>
        <StyledMenuItem value={10}>試合相手の募集</StyledMenuItem>
        <StyledMenuItem value={20}>個人での参加の募集</StyledMenuItem>
        <StyledMenuItem value={30}>チームメイトの募集</StyledMenuItem>
        <StyledMenuItem value={40}>チームに入りたい募集</StyledMenuItem>
        <StyledMenuItem value={50}>コーチの募集</StyledMenuItem>
        <StyledMenuItem value={60}>その他</StyledMenuItem>
      </Select>
      <Select
        input={<StyledInput />}
        size="small"
        sx={{ mt: 2, borderRadius: 1, color: select === '0' ? '#9e9e9e' : 'black' }}
        fullWidth
        value={select}
        onChange={handleChange}
      >
        <StyledMenuItem value="0" disabled>
          地域
        </StyledMenuItem>
        <StyledMenuItem value={10}>東京</StyledMenuItem>
        <StyledMenuItem value={20}>神奈川</StyledMenuItem>
        <StyledMenuItem value={30}>愛知</StyledMenuItem>
      </Select>
      <Select
        input={<StyledInput />}
        size="small"
        sx={{ mt: 2, borderRadius: 1, color: select === '0' ? '#9e9e9e' : 'black' }}
        fullWidth
        value={select}
        onChange={handleChange}
      >
        <StyledMenuItem value="0" disabled>
          レベル
        </StyledMenuItem>
        <StyledMenuItem value={10}>エンジョイ</StyledMenuItem>
        <StyledMenuItem value={20}>ビギナー</StyledMenuItem>
        <StyledMenuItem value={30}>ミドル</StyledMenuItem>
        <StyledMenuItem value={40}>エキスパート</StyledMenuItem>
      </Select>

      <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDate={new Date()}
          disableMaskedInput={true}
          inputFormat={value ? 'yyyy/M/d' : '開催日'}
          renderInput={(params) => <StyledDateField fullWidth sx={{ mt: 2 }} {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
});
