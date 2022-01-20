import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

export const StyledSelectMenuItem = styled(MenuItem)(() => ({
  '&.MuiMenuItem-root': {
    background: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: '#fafafa',
    },
  },
  '&.Mui-selected': {
    backgroundColor: '#fff',
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: '#fff',
    },
  },
  '&.Mui-disabled': {
    backgroundColor: '#fff',
  },
}));
