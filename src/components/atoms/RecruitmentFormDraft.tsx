import { memo, VFC } from 'react';
import Fab from '@mui/material/Fab';
import { StyledTooltip } from '../index';
import { Status } from '../../generated/graphql';

import { RiDraftLine } from 'react-icons/ri';

type Props = {
  onClick: (status: Status) => void;
};

export const RecruitmentFormDraft: VFC<Props> = memo((props) => {
  const { onClick } = props;

  return (
    <StyledTooltip title="下書き保存" placement="right">
      <Fab
        disableRipple
        onClick={() => {
          onClick(Status.Draft);
        }}
        size="small"
        sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8 }}
      >
        <RiDraftLine size="20" style={{ position: 'absolute', color: '#546e7a' }} />
      </Fab>
    </StyledTooltip>
  );
});
