import { memo, MouseEvent, useState, VFC } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { RecruitmentList } from '../components/index';
import { Status, useDeleteRecruitmentMutation, useGetCurrentUserRecruitmentsQuery } from '../generated/graphql';
import { flashMessage, flashState, flashType } from '../store/flash';

export const DashboardRecruitments: VFC = memo(() => {
  const colors = ['#3f51b5', '#e91e63', '#4caf50', '#607d8b', '#f44336', '#9c27b0'];

  const navigate = useNavigate();
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const getQueryStatus = (status: string | null): Status => {
    if (status === 'published') {
      return Status.Published;
    } else if (status === 'draft') {
      return Status.Draft;
    } else if (status === 'closed') {
      return Status.Closed;
    } else {
      return Status.Published;
    }
  };

  const status = getQueryStatus(query.get('status'));

  const [alignment, setAlignment] = useState<Status>(status);

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: Status) => {
    setAlignment(newAlignment);
  };

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

  const { loading, data, refetch } = useGetCurrentUserRecruitmentsQuery();
  const [deleteRecruitment] = useDeleteRecruitmentMutation();

  let count = 0;

  return (
    <>
      <Box>
        <Box fontSize={35} fontWeight="bold">
          Recruitments
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
                  <RecruitmentList
                    deleteCurrentUserRecruitment={deleteCurrentUserRecruitment}
                    color={colors[count - 1]}
                    recruitment={recruitment}
                  />
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
