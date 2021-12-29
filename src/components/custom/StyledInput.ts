import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';

export const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    maxHeight: 11,
    border: '1px solid #ced4da',
    fontSize: 12,
    fontWeight: 'bold',
    padding: '8px 26px 11px 12px',
  },
}));
