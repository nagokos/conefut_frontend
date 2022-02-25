import { memo, useState, VFC } from 'react';

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, ListItem, ListItemText, Paper, styled, Typography } from '@mui/material';
import { RecruitmentDeleteDialog, StyledTooltip } from '../index';
import { useNavigate } from 'react-router-dom';
import { useGetEditRecruitmentLazyQuery } from '../../generated/graphql';

type Recruitment = {
  id: string;
  title: string;
  isPublished: boolean;
};

type Props = {
  color: string;
  recruitment: Recruitment;
  deleteCurrentUserRecruitment: (id: string) => void;
};

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
  const { recruitment, color, deleteCurrentUserRecruitment } = props;

  const navigate = useNavigate();

  const [getEditRecruitment] = useGetEditRecruitmentLazyQuery({
    variables: {
      id: recruitment.id,
    },
  });

  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pushEditRecruitment = async () => {
    await getEditRecruitment();
    navigate(`/recruitments/${recruitment.id}/edit`);
  };

  return (
    <>
      <ListItem sx={{ mt: 1.5, mb: 1.5, px: 0 }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 55,
            minWidth: 55,
            borderRadius: 3.5,
          }}
        >
          <ArticleOutlinedIcon sx={{ color: '#cfd8dc', fontSize: 33 }} />
        </Paper>
        <ListItemText
          sx={{ mx: 2, mt: 1 }}
          primary={
            <Typography component="span" sx={{ position: 'relative', bottom: 2 }} fontSize={15} fontWeight="bold">
              {recruitment.title}
            </Typography>
          }
          secondary={
            <>
              <Typography
                component="span"
                fontSize={11}
                sx={{
                  border: '1px solid #e0e0e0',
                  color: '#424242',
                  maxWidth: 33,
                  px: 0.6,
                  borderRadius: 1,
                  py: 0.1,
                }}
              >
                {recruitment.isPublished ? '公開中' : '下書き'}
              </Typography>
            </>
          }
        />
        <StyledTooltip title="編集する" placement="bottom">
          <StyledListButton onClick={() => pushEditRecruitment()} sx={{ mr: 1 }} disableRipple size="medium">
            <EditOutlinedIcon fontSize="small" />
          </StyledListButton>
        </StyledTooltip>
        <StyledTooltip onClick={handleClickOpen} title="削除する" placement="bottom">
          <StyledListButton disableRipple size="medium">
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </StyledListButton>
        </StyledTooltip>
      </ListItem>
      <RecruitmentDeleteDialog
        deleteCurrentUserRecruitment={deleteCurrentUserRecruitment}
        open={open}
        handleClose={handleClose}
        id={recruitment.id}
      />
    </>
  );
});
