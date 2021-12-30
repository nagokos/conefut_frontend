import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledRoundedButton = styled(Button)(() => ({
  '&.MuiButton-containedPrimary': {
    background: '#fff',
    color: '#757575',
    minWidth: 'auto',
    boxShadow: '0px 1px 1px #f0f5f4',
    border: '1px solid #f0f5f4',
    paddingTop: 13,
    paddingBottom: 13,
  },
  '&:hover': {
    background: '#f0f5f4',
    boxShadow: '0px 2px 2px #f0f5f4',
  },
}));
