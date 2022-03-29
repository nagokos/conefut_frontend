import { memo, MouseEvent, useState, VFC } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  styled,
} from '@mui/material';
import {
  RecruitmentDeleteDialog,
  StyledSelectMenuItem,
  StyledTooltip,
  RecruitmentListApplicantsDialog,
} from '../index';
import { useNavigate } from 'react-router-dom';
import { Status, Type } from '../../generated/graphql';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useSize } from '../../hooks';

type Recruitment = {
  id: string;
  title: string;
  status: Status;
  type: Type;
  competition?: Competition | null | undefined;
};

type Competition = {
  name: string;
};

type Props = {
  recruitment: Recruitment;
  deleteCurrentUserRecruitment: (id: string) => void;
};

const StyledMyZeroDivider = styled(Divider)(() => ({
  '&.MuiDivider-root': {
    marginTop: 0,
    marginBottom: 0,
    border: '0.6px solid #ebf2f2',
  },
}));

const StyledListButton = styled(IconButton)(() => ({
  '&.MuiIconButton-root': {
    background: '#f0f5f4',
    fontSize: 10,
    color: '#90a4ae',
  },
  '&:hover': {
    background: '#e9f2f2',
  },
}));

export const RecruitmentList: VFC<Props> = memo((props) => {
  const { recruitment, deleteCurrentUserRecruitment } = props;

  const navigate = useNavigate();

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const { isMobile } = useSize();

  const handleClickOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pushEditRecruitment = async () => {
    navigate(`/recruitments/${recruitment.id}/edit`);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const statusString = () => {
    if (recruitment.status === Status.Published) {
      return '公開中';
    } else if (recruitment.status === Status.Closed) {
      return '締切';
    } else if (recruitment.status === Status.Draft) {
      return '下書き';
    }
  };

  const statusColor = () => {
    if (recruitment.status === Status.Published) {
      return '#009688';
    } else if (recruitment.status === Status.Closed) {
      return '#f42121';
    } else if (recruitment.status === Status.Draft) {
      return '#2196f3';
    }
  };

  const subStrTitle = () => {
    if (recruitment.title.length > 40) {
      const subStr = recruitment.title.substring(0, 39);
      return `${subStr}...`;
    } else {
      return recruitment.title;
    }
  };

  return (
    <>
      <ListItem sx={{ mt: isMobile ? 0.5 : 1.5, mb: 1.5, px: 0 }}>
        <ListItemText
          onClick={() => pushEditRecruitment()}
          sx={{ mr: isMobile ? 1 : 5, cursor: 'pointer' }}
          primary={
            <Box
              sx={{ position: 'relative', bottom: 3, color: '#263238', fontFamily: 'Roboto' }}
              fontSize={isMobile ? 13 : 17}
              fontWeight="bold"
            >
              {isMobile ? subStrTitle() : recruitment.title}
            </Box>
          }
          secondary={
            <>
              <Box
                component="span"
                fontSize={isMobile ? 10 : 11}
                sx={{
                  border: `1px solid ${statusColor()}`,
                  maxWidth: 33,
                  color: statusColor(),
                  px: 0.7,
                  mr: 0.3,
                  borderRadius: 1,
                  py: 0.3,
                }}
              >
                {statusString()}
              </Box>
            </>
          }
        />
        {recruitment.status === Status.Published && (
          <StyledTooltip title="応募者" placement="bottom">
            <StyledListButton
              onClick={handleClickOpenDialog}
              sx={{ mr: 1 }}
              disableRipple
              size={isMobile ? 'small' : 'medium'}
            >
              <Badge
                sx={{ '& .MuiBadge-badge': { fontSize: 9, height: 7, minWidth: 7, top: -0.5 } }}
                variant="dot"
                color="warning"
              >
                <PeopleOutlineIcon fontSize="small" />
              </Badge>
            </StyledListButton>
          </StyledTooltip>
        )}
        {!isMobile && (
          <StyledTooltip title="編集する" placement="bottom">
            <StyledListButton
              onClick={() => pushEditRecruitment()}
              sx={{ mr: 1 }}
              disableRipple
              size={isMobile ? 'small' : 'medium'}
            >
              <EditOutlinedIcon fontSize="small" />
            </StyledListButton>
          </StyledTooltip>
        )}
        <StyledTooltip onClick={handleClickOpen} title="もっとみる" placement="bottom">
          <StyledListButton onClick={handleClickMenu} disableRipple size={isMobile ? 'small' : 'medium'}>
            <MoreHorizIcon fontSize="small" />
          </StyledListButton>
        </StyledTooltip>
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            sx: {
              py: 0,
            },
          }}
          PaperProps={{
            sx: {
              borderRadius: 1.5,
              minWidth: 180,
              boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            },
          }}
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
        >
          <MenuList sx={{ py: 0 }}>
            {isMobile && (
              <>
                <StyledSelectMenuItem onClick={() => pushEditRecruitment()} disableRipple>
                  <EditOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  編集する
                </StyledSelectMenuItem>
                <StyledMyZeroDivider />
              </>
            )}
            <StyledSelectMenuItem disableRipple>
              <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 1 }} />
              締め切る
            </StyledSelectMenuItem>
            <StyledMyZeroDivider />
            <MenuItem
              sx={{ py: 1, color: '#f42121', fontWeight: 'bold', fontSize: 12, ':hover': { bgcolor: '#fff0f0' } }}
              disableRipple
              onClick={handleClickOpen}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              削除する
            </MenuItem>
          </MenuList>
        </Menu>
      </ListItem>
      <RecruitmentDeleteDialog
        deleteCurrentUserRecruitment={deleteCurrentUserRecruitment}
        open={open}
        handleClose={handleClose}
        id={recruitment.id}
      />
      <RecruitmentListApplicantsDialog isOpenDialog={isOpenDialog} handleCloseDialog={handleCloseDialog} />
    </>
  );
});
