import { memo, VFC } from 'react';
import Fab from '@mui/material/Fab';
import { StyledTooltip } from '../index';
import { Status } from '../../generated/graphql';
import { BiBookReader } from 'react-icons/bi';
import '../../assets/style/icon.css';

type Props = {
  onClick: (status: Status) => void;
};

export const RecruitmentFormPublish: VFC<Props> = memo((props) => {
  const { onClick } = props;

  return (
    <>
      <StyledTooltip title="募集を公開" placement="right">
        <Fab
          disableRipple
          size="small"
          type="submit"
          form="react-form"
          onClick={() => {
            onClick(Status.Published);
          }}
          sx={{ bgcolor: 'white', boxShadow: '0 10px 10px -1px #d1dede', px: 2.8, py: 2.8 }}
        >
          <BiBookReader size="22" style={{ position: 'absolute', color: '#546e7a' }} />
        </Fab>
      </StyledTooltip>
    </>
  );
});
