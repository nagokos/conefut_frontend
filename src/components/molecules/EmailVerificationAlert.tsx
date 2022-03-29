import { Alert } from '@mui/material';
import { memo, VFC } from 'react';
import { useSize } from '../../hooks';

export const EmailVerificationAlert: VFC = memo(() => {
  const { isMobile } = useSize();

  const warningStatement = (): string => {
    if (isMobile) {
      return 'メールアドレスを認証しましょう。';
    } else {
      return 'すべての機能を使うために、メールアドレスを認証しましょう。';
    }
  };

  return (
    <Alert
      icon={false}
      sx={{
        borderRadius: 0,
        bgcolor: '#fdd835',
        maxHeight: isMobile ? 25 : 30,
        alignItems: 'center',
        fontSize: isMobile ? 12 : 13.5,
        justifyContent: 'center',
      }}
    >
      {warningStatement()}
    </Alert>
  );
});
