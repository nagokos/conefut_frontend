import { IconButton } from '@mui/material';
import { memo, MouseEvent, VFC } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  useCreateStockMutation,
  useDeleteStockMutation,
  useCheckStockedQuery,
  useGetCurrentUserQuery,
} from '../../generated/graphql';
import { StyledTooltip } from '..';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: string;
};

export const RecruitmentCardStock: VFC<Props> = memo((props) => {
  const { id } = props;

  const navigate = useNavigate();

  const [userData] = useGetCurrentUserQuery();
  const [createResult, createStock] = useCreateStockMutation();
  const [deleteResult, deleteStock] = useDeleteStockMutation();

  const [data, executeQuery] = useCheckStockedQuery({
    variables: {
      recruitmentId: id,
    },
  });

  const isLoggedIn = !!userData.data?.getCurrentUser;
  const isStocked = data.data?.checkStocked;

  const addStock = async (event: MouseEvent) => {
    event.stopPropagation();
    if (!isLoggedIn) return navigate('/login');
    const variables = { recruitmentId: id };
    await createStock(variables);
    executeQuery({
      requestPolicy: 'network-only',
    });
  };

  const removeStock = async (event: MouseEvent) => {
    event.stopPropagation();
    if (!isLoggedIn) return navigate('/login');
    const variables = { recruitmentId: id };
    await deleteStock(variables);
    executeQuery({
      requestPolicy: 'network-only',
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
            onClick={(event) => removeStock(event)}
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
            onClick={(event) => addStock(event)}
          >
            <BookmarkBorderIcon fontSize="small" sx={{ color: '#90a4ae' }} />
          </IconButton>
        </StyledTooltip>
      )}
    </>
  );
});
