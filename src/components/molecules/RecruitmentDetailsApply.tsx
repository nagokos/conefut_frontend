import { Box, Button } from '@mui/material';
import { memo, VFC } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { GrSend } from 'react-icons/gr';
import '../../assets/style/index.css';

import { useCreateStockMutation, useCheckStockedQuery, useDeleteStockMutation, Type } from '../../generated/graphql';
import { useNavigate, useParams } from 'react-router-dom';
import { isLoggedIn } from '../../reactive/user';

type Props = {
  type: Type;
};

export const RecruitmentDetailsApply: VFC<Props> = memo((props) => {
  const { type } = props;

  const { recruitmentId } = useParams();
  const navigate = useNavigate();

  const [createStock] = useCreateStockMutation();
  const [deleteStock] = useDeleteStockMutation();
  const { data, loading, refetch } = useCheckStockedQuery({
    variables: {
      recruitmentId: String(recruitmentId),
    },
  });

  const isStocked = data?.checkStocked;

  const addStock = () => {
    if (!isLoggedIn()) return navigate('/login');
    createStock({
      variables: {
        recruitmentId: String(recruitmentId),
      },
      onCompleted() {
        refetch();
      },
    });
  };

  const removeStock = () => {
    if (!isLoggedIn()) return navigate('/login');
    deleteStock({
      variables: {
        recruitmentId: String(recruitmentId),
      },
      onCompleted() {
        refetch();
      },
    });
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        px: 3,
        py: 3,
        borderRadius: 2,
      }}
    >
      {type === Type.Opponent || type === Type.Individual ? (
        <Box sx={{ fontSize: 16, fontWeight: 'bold', color: '#616161' }}>1人が応募中</Box>
      ) : null}
      <Box sx={{ mt: type === Type.Opponent || type === Type.Individual ? 2 : 0 }}>
        <Button
          disableElevation
          fullWidth
          disableRipple
          variant="contained"
          startIcon={<GrSend size="18" className="ico-white" style={{ position: 'relative', right: 1 }} />}
          sx={{
            py: 1.2,
            fontSize: 13,
            boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
            ':hover': {
              boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
              bgcolor: '#00897b',
            },
          }}
        >
          {type === Type.Opponent || type === Type.Individual ? '応募する' : 'メッセージを送る'}
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {isStocked ? (
          <Button
            disableElevation
            disableRipple
            fullWidth
            variant="contained"
            onClick={removeStock}
            startIcon={<BookmarkIcon sx={{ color: '#ff784e' }} />}
            sx={{
              py: 1.2,
              fontSize: 13,
              bgcolor: '#fce7e1',
              color: 'black',
              boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 2px 6px 0 rgb(0 0 0 / 10%)',
              ':hover': {
                bgcolor: '#fce7e1',
                boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 2px 6px 0 rgb(0 0 0 / 10%)',
              },
            }}
          >
            ストック済み
          </Button>
        ) : (
          <Button
            disableElevation
            disableRipple
            fullWidth
            variant="contained"
            onClick={addStock}
            startIcon={<BookmarkBorderIcon sx={{ color: '#616161' }} />}
            sx={{
              py: 1.2,
              fontSize: 13,
              bgcolor: 'white',
              color: '#616161',
              boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 2px 6px 0 rgb(0 0 0 / 10%)',
              ':hover': {
                bgcolor: '#fafafa',
                boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 2px 6px 0 rgb(0 0 0 / 10%)',
              },
            }}
          >
            ストックする
          </Button>
        )}
      </Box>
    </Box>
  );
});
