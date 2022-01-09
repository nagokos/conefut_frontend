import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledDateField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    position: 'relative',
    fontSize: 12,
    maxHeight: 38,
    fontWeight: 'bold',
    '&.Mui-focused fieldset': {
      border: `1px solid ${theme.palette.light.main}`,
    },
    fieldset: {
      borderColor: theme.palette.light.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.light.main,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  },
}));
