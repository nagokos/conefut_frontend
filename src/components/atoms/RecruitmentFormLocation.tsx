import { memo, VFC } from 'react';
import Fab from '@mui/material/Fab';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { StyledTooltip } from '../index';

export const RecruitmentFormLocation: VFC = memo(() => {
  return (
    <StyledTooltip title="会場を埋め込む">
      <Fab
        disableRipple
        size="small"
        sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
      >
        <AddLocationAltIcon />
      </Fab>
    </StyledTooltip>
  );
});
