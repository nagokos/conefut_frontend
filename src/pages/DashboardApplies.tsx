import { memo, useState, VFC } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTooltip, ApplyList } from '../components/index';
import { IconButton, Typography, Divider, ClickAwayListener } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useSize } from '../hooks';
import { useGetAppliedRecruitmentsQuery } from '../generated/graphql';

export const DashboardApplies: VFC = memo(() => {
  const [data] = useGetAppliedRecruitmentsQuery();

  const { isMobile } = useSize();

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography fontSize={isMobile ? 30 : 35} fontWeight="bold" sx={{ mr: 0.5 }}>
          Applies
        </Typography>
        {isMobile ? (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <StyledTooltip
                onClose={handleTooltipClose}
                open={open}
                PopperProps={{
                  disablePortal: true,
                }}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box sx={{ textAlign: 'center', fontSize: 11 }}>
                    応募、メッセージを
                    <br />
                    送信した募集の一覧
                  </Box>
                }
                placement="bottom"
              >
                <IconButton
                  size="small"
                  disableRipple
                  sx={{
                    height: 15,
                    width: 15,
                    position: 'relative',
                    top: 2,
                    bgcolor: '#455a64',
                    color: 'white',
                    ':hover': { bgcolor: '#455a64', color: 'white' },
                  }}
                  onClick={handleTooltipOpen}
                >
                  <QuestionMarkIcon fontSize="small" style={{ fontSize: 10 }} />
                </IconButton>
              </StyledTooltip>
            </div>
          </ClickAwayListener>
        ) : (
          <StyledTooltip
            title={
              <Box sx={{ textAlign: 'center' }}>
                応募、メッセージを
                <br />
                送信した募集の一覧
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
        )}
      </Box>
      <List sx={{ mt: 0.2 }}>
        {data.fetching ? (
          <Box mt={2} sx={{ textAlign: 'center' }}>
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : (
          <>
            {data.data?.getAppliedRecruitments.map((recruitment) => {
              return (
                <Box key={recruitment.id} sx={{ mt: isMobile ? 0 : 2 }}>
                  <ApplyList recruitment={recruitment} />
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
