import { memo, VFC } from 'react';
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { StyledTooltip } from '../index';

export const RecruitmentFormHelp: VFC = memo(() => {
  return (
    <StyledTooltip title="ヘルプ">
      <Fab
        disableRipple
        size="small"
        sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, color: '#26a69a' }}
      >
        <QuestionMarkIcon />
      </Fab>
    </StyledTooltip>
  );
});
