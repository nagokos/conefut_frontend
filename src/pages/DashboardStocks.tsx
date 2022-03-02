import { memo, VFC } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useSetRecoilState } from 'recoil';

import { StockList } from '../components/index';
import { useDeleteRecruitmentMutation, useGetCurrentUserRecruitmentsQuery } from '../generated/graphql';
import { flashMessage, flashState, flashType } from '../store/flash';

export const DashboardStocks: VFC = memo(() => {
  const { loading, data, refetch } = useGetCurrentUserRecruitmentsQuery();
  const [deleteRecruitment] = useDeleteRecruitmentMutation();

  const colors = ['#3f51b5', '#e91e63', '#4caf50', '#607d8b', '#f44336', '#9c27b0'];

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const deleteCurrentUserRecruitment = async (id: string) => {
    const res = await deleteRecruitment({
      variables: {
        id: id,
      },
      onCompleted() {
        refetch();
      },
    });
    if (res.data?.deleteRecruitment) {
      setState(true);
      setMessage('削除しました');
      setType('success');
    }
  };

  let count = 0;

  return (
    <>
      <Box>
        <Box fontSize={35} fontWeight="bold">
          Stocks
        </Box>
      </Box>
      <List sx={{ mt: 0.2 }}>
        {loading ? (
          <Box mt={2} sx={{ textAlign: 'center' }}>
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : (
          <>
            {data?.getCurrentUserRecruitments.map((recruitment) => {
              if (count === 6) {
                count = 0;
              }
              count += 1;
              return (
                <Box key={recruitment.id} sx={{ mt: 2 }}>
                  <StockList color={colors[count - 1]} recruitment={recruitment} />
                  <Divider sx={{ border: '0.6px solid #ebf2f2' }} />
                </Box>
              );
            })}
          </>
        )}
      </List>
    </>
  );
});
