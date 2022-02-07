import { InputBase } from '@mui/material';
import { styled } from '@mui/material';

export const StyledRecruitmentSelectInput = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 7,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #e0f2f1',
    fontSize: 13,
    padding: '13px 12px',
  },
}));
