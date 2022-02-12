import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLocationSearchInput = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 7,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #e0f2f1',
    fontSize: 13,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    padding: '15.12px 12px',
  },
}));
