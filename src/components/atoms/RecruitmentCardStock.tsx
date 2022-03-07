import { IconButton } from '@mui/material';
import { memo, MouseEvent, VFC } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useCreateStockMutation, useDeleteStockMutation, useCheckStockedQuery } from '../../generated/graphql';
import { StyledTooltip } from '..';
import { isLoggedIn } from '../../reactive/user';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: string;
};

export const RecruitmentCardStock: VFC<Props> = memo((props) => {
  const { id } = props;

  const navigate = useNavigate();

  const [createStock] = useCreateStockMutation();
  const [deleteStock] = useDeleteStockMutation();

  const { data, loading, refetch } = useCheckStockedQuery({
    variables: {
      recruitmentId: id,
    },
  });

  const isStocked = data?.checkStocked;

  const addStock = (event: MouseEvent) => {
    event.stopPropagation();
    if (!isLoggedIn()) return navigate('/login');
    deleteStock({
      variables: {
        recruitmentId: id,
      },
      onCompleted() {
        refetch();
      },
    });
  };

  const removeStock = (event: MouseEvent) => {
    event.stopPropagation();
    if (!isLoggedIn()) return navigate('/login');
    createStock({
      variables: {
        recruitmentId: id,
      },
      onCompleted() {
        refetch();
      },
    });
  };
  return (
    <>
      {isStocked ? (
        <StyledTooltip title="ストック済み">
          <IconButton
            sx={{
              bgcolor: '#fcf1ed',
              transition: '400ms',
              ':hover': {
                bgcolor: '#fcf1ed',
              },
            }}
            disableRipple
            onClick={(event) => addStock(event)}
          >
            <BookmarkIcon fontSize="small" sx={{ color: '#ff784e' }} />
          </IconButton>
        </StyledTooltip>
      ) : (
        <StyledTooltip title="ストックする">
          <IconButton
            sx={{
              bgcolor: '#f0f5f4',
              transition: '400ms',
              ':hover': {
                bgcolor: '#e9f2f2',
              },
            }}
            disableRipple
            onClick={(event) => removeStock(event)}
          >
            <BookmarkBorderIcon fontSize="small" sx={{ color: '#90a4ae' }} />
          </IconButton>
        </StyledTooltip>
      )}
    </>
  );
});
