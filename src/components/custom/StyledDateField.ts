import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';

export const StyledDateField = styled(InputBase)(({ theme }) => ({
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
    padding: '12.7px 26px 12.7px 12px',
  },
}));
