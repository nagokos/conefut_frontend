import { memo, VFC } from 'react';
import Fab from '@mui/material/Fab';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { StyledTooltip } from '../index';

type Props = {
  handleClickOpen: () => void;
};

export const RecruitmentFormLocation: VFC<Props> = memo((props) => {
  const { handleClickOpen } = props;

  return (
    <StyledTooltip title="会場を埋め込む" placement="right">
      <Fab
        disableRipple
        size="small"
        onClick={handleClickOpen}
        sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8, zIndex: 0 }}
      >
        <MdOutlineAddLocationAlt size="23" style={{ position: 'absolute', color: '#546e7a' }} />
      </Fab>
    </StyledTooltip>
  );
});
