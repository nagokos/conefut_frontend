import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { memo, VFC } from 'react';

export const SearchInputGrey: VFC = memo(() => {
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', bgcolor: '#fafafa', width: 220, height: 35 }}
    >
      <IconButton disabled type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ flex: 1, fontSize: 14 }}
        placeholder="キーワードを入力"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  );
});
