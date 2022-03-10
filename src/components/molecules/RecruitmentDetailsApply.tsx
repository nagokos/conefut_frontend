import { Box, Button, Divider } from '@mui/material';
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
        boxShadow: '0 2px 4px #4385bb12;',
      }}
    >
      {type === Type.Opponent || type === Type.Individual ? (
        <Box sx={{ fontSize: 14, fontWeight: 'bold', color: '#616161' }}>1人が応募中</Box>
      ) : (
        <Box sx={{ fontSize: 14, fontWeight: 'bold', color: '#616161' }}>1人がメッセージを送信</Box>
      )}
      <Box sx={{ mt: 1.5 }}>
        <Button
          disableElevation
          fullWidth
          disableRipple
          variant="contained"
          startIcon={<GrSend size="18" className="ico-white" style={{ position: 'relative', right: 1 }} />}
          sx={{
            py: 1.5,
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
      <Divider sx={{ mt: 3, mb: 2, border: '0.2px solid #e0e0e0' }} />
      <Box sx={{ fontSize: 14, fontWeight: 'bold', color: '#616161' }}>1人がストック中</Box>
      <Box sx={{ mt: 1.5 }}>
        {isStocked ? (
          <Button
            disableElevation
            disableRipple
            fullWidth
            variant="contained"
            onClick={removeStock}
            startIcon={<BookmarkIcon sx={{ color: '#ff784e' }} />}
            sx={{
              py: 1.5,
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
              py: 1.5,
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
