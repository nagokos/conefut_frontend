import { memo, VFC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { RecruitmentForm } from '../components';

export const RecruitmentNew: VFC = memo(() => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pt: 2, px: 3, minHeight: '100vh' }} bgcolor="#ebf2f2">
      <Box>
        <IconButton onClick={() => navigate(-1)} disableTouchRipple size="medium">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>
      <RecruitmentForm />
    </Box>
  );
});
