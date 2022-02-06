import { memo, VFC } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { StyledTooltip } from '../index';

export const RecruitmentFormDraft: VFC = memo(() => {
  return (
    <StyledTooltip title="下書き保存">
      <Fab
        disableRipple
        size="small"
        sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
      >
        <AddIcon />
      </Fab>
    </StyledTooltip>
  );
});
