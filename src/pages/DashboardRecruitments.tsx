import { memo, VFC } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useSetRecoilState } from 'recoil';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { RecruitmentList, StyledTooltip } from '../components/index';
import {
  useDeleteRecruitmentMutation,
  useGetCurrentUserRecruitmentsQuery,
  useGetRecruitmentsQuery,
} from '../generated/graphql';
import { flashMessage, flashState, flashType } from '../store/flash';
import { IconButton, Typography } from '@mui/material';

export const DashboardRecruitments: VFC = memo(() => {
  const [data, executeQuery] = useGetCurrentUserRecruitmentsQuery();
  const [, executeRecruitmetnsQuery] = useGetRecruitmentsQuery();
  const [result, deleteRecruitment] = useDeleteRecruitmentMutation();

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const deleteCurrentUserRecruitment = async (id: string) => {
    const variables = { id: id };
    const res = await deleteRecruitment(variables);
    if (!res.error) {
      executeQuery({
        requestPolicy: 'network-only',
      });
      executeRecruitmetnsQuery({
        requestPolicy: 'network-only',
      });
      setState(true);
      setMessage('削除しました');
      setType('success');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography fontSize={35} fontWeight="bold" sx={{ mr: 0.5 }}>
          Recruitments
        </Typography>
        <StyledTooltip
          title={<Box sx={{ textAlign: 'center' }}>作成した募集の一覧</Box>}
          placement="bottom"
          sx={{ position: 'relative', bottom: 10 }}
        >
          <IconButton
            size="small"
            disableRipple
            sx={{
              height: 17,
              width: 17,
              position: 'relative',
              top: 2,
              bgcolor: '#455a64',
              color: 'white',
              ':hover': { bgcolor: '#455a64', color: 'white' },
            }}
          >
            <QuestionMarkIcon fontSize="small" style={{ fontSize: 11 }} />
          </IconButton>
        </StyledTooltip>
      </Box>
      <List sx={{ mt: 0.2 }}>
        {data.fetching ? (
          <Box mt={2} sx={{ textAlign: 'center' }}>
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : (
          <>
            {data.data?.getCurrentUserRecruitments.map((recruitment) => {
              return (
                <Box key={recruitment.id} sx={{ mt: 2 }}>
                  <RecruitmentList
                    deleteCurrentUserRecruitment={deleteCurrentUserRecruitment}
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
