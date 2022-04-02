import { Box, Button, Divider } from '@mui/material';
import { memo, VFC } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import '../../assets/style/index.css';

import {
  useCreateStockMutation,
  useCheckStockedQuery,
  useDeleteStockMutation,
  Type,
  Status,
  useGetCurrentUserQuery,
  EmailVerificationStatus,
} from '../../generated/graphql';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { flashMessage, flashState, flashType } from '../../store/flash';

type Recruitment = {
  user: User;
  status: Status;
  type: Type;
};

type User = {
  id: string;
};

type Props = {
  recruitment: Recruitment;
  handleClickOpen: () => void;
};

export const RecruitmentDetailsApply: VFC<Props> = memo((props) => {
  const { recruitment, handleClickOpen } = props;

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const { recruitmentId } = useParams();
  const navigate = useNavigate();

  const [userData] = useGetCurrentUserQuery();
  const [createResult, createStock] = useCreateStockMutation();
  const [deleteResult, deleteStock] = useDeleteStockMutation();
  const [data, executeQuery] = useCheckStockedQuery({
    variables: {
      recruitmentId: String(recruitmentId),
    },
  });

  const isLoggedIn = !!userData.data?.getCurrentUser;
  const isStocked = data.data?.checkStocked;

  const addStock = async () => {
    if (!isLoggedIn) return navigate('/login');
    const variables = { recruitmentId: String(recruitmentId) };
    await createStock(variables);
    executeQuery({
      requestPolicy: 'network-only',
    });
  };

  const removeStock = async () => {
    if (!isLoggedIn) return navigate('/login');
    const variables = { recruitmentId: String(recruitmentId) };
    await deleteStock(variables);
    executeQuery({
      requestPolicy: 'network-only',
    });
  };

  const sendMessage = (): string => {
    if (recruitment.status === Status.Published) {
      if (recruitment.type === Type.Opponent || recruitment.type === Type.Individual) {
        return '応募する';
      } else {
        return 'メッセージを送る';
      }
    } else {
      return '募集期限を過ぎています';
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        px: 3,
        py: 3,
        borderRadius: 3,
        boxShadow: '0 2px 4px #4385bb12;',
      }}
    >
      {userData.data?.getCurrentUser?.id !== recruitment.user.id && (
        <>
          {recruitment.type === Type.Opponent || recruitment.type === Type.Individual ? (
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
              onClick={() => {
                if (!isLoggedIn) return navigate('/login');
                if (userData.data?.getCurrentUser?.emailVerificationStatus === EmailVerificationStatus.Pending) {
                  setState(true);
                  setMessage('メールアドレスを認証してください');
                  setType('warning');
                  return;
                }
                handleClickOpen();
              }}
              disabled={recruitment.status === Status.Closed}
              sx={{
                py: 1.4,
                fontSize: 13,
                boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
                ':hover': {
                  boxShadow: '0 0 0 1px rgb(0 0 0 / 2%), 0 5px 8px 0 rgb(0 0 0 / 10%)',
                  bgcolor: '#00897b',
                },
              }}
            >
              {sendMessage()}
            </Button>
          </Box>
          <Divider sx={{ borderColor: '#ebf2f2', mt: 3, mb: 2 }} />
        </>
      )}
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
              py: 1.4,
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
              py: 1.4,
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
