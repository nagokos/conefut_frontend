import { memo, VFC } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import { StockList, StyledTooltip } from '../components/index';
import { useGetStockedRecruitmentsQuery } from '../generated/graphql';
import { IconButton, Typography } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const DashboardStocks: VFC = memo(() => {
  const [data] = useGetStockedRecruitmentsQuery({
    requestPolicy: 'network-only',
  });

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography fontSize={35} fontWeight="bold" sx={{ mr: 0.5 }}>
          Stocks
        </Typography>
        <StyledTooltip
          title={
            <Box sx={{ textAlign: 'center' }}>
              ストックしている
              <br />
              募集の一覧
            </Box>
          }
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
            {data.data?.getStockedRecruitments.map((recruitment) => {
              return (
                <Box key={recruitment.id} sx={{ mt: 2 }}>
                  <StockList recruitment={recruitment} />
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
