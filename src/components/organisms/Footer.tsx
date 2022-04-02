import { VFC, memo } from 'react';
import { useSize } from '../../hooks/index';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export const Footer: VFC = memo(() => {
  const { isMobile } = useSize();
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 8, maxWidth: 1120, mx: 'auto' }}>
      <Typography
        sx={{
          flexGrow: isMobile ? 1 : 1,
          mr: 3,
        }}
        color="black"
        variant="h5"
        fontWeight="bold"
      >
        <Box display="flex">
          <Box onClick={() => navigate('/')} display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
            <img
              style={{ marginRight: 4 }}
              src="/src/assets/img/main-logo.png"
              width={isMobile ? 27 : 30}
              height={isMobile ? 27 : 30}
              alt="app logo"
            />
            <Box sx={{ fontSize: isMobile ? 23 : 25 }}>connefut</Box>
          </Box>
        </Box>
      </Typography>
    </Box>
  );
});
