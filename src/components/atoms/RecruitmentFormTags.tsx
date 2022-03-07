import { memo, VFC } from 'react';
import Fab from '@mui/material/Fab';
import { StyledTooltip } from '../index';
import { AiOutlineTags } from 'react-icons/ai';

export const RecruitmentFormTags: VFC = memo(() => {
  return (
    <>
      <StyledTooltip title="タグを追加" placement="right">
        <Fab
          disableRipple
          size="small"
          type="submit"
          form="react-form"
          sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8 }}
        >
          <AiOutlineTags size="23" style={{ position: 'absolute', color: '#546e7a' }} />
        </Fab>
      </StyledTooltip>
    </>
  );
});
