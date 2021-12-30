import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { memo, VFC } from 'react';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)(() => ({
  '&:hover': {
    background: '#f5f5f5',
  },
}));

export const SearchInputGrey: VFC = memo(() => {
  return (
    <StyledPaper
      elevation={0}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', bgcolor: '#fafafa', width: 220, height: 35 }}
    >
      <IconButton disabled type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase sx={{ flex: 1, fontSize: 14 }} placeholder="キーワードを入力" />
    </StyledPaper>
  );
});
