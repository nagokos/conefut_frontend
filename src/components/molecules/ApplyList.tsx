import { Avatar, Box, ListItem, ListItemText, Typography } from '@mui/material';
import { memo, VFC } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Status, Type } from '../../generated/graphql';
import { useSize } from '../../hooks';

type Recruitment = {
  id: string;
  title: string;
  type: Type;
  status: Status;
  user?: User | null | undefined;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Props = {
  recruitment: Recruitment;
};

export const ApplyList: VFC<Props> = memo((props) => {
  const { recruitment } = props;

  const { isMobile } = useSize();

  const subStrTitle = () => {
    if (recruitment.title.length > 40) {
      const subStr = recruitment.title.substring(0, 39);
      return `${subStr}...`;
    } else {
      return recruitment.title;
    }
  };

  return (
    <ListItem sx={{ mt: isMobile ? 0.5 : 1.5, px: 0, mb: isMobile ? 0.5 : 1.5 }}>
      <ListItemText
        sx={{ mr: isMobile ? 0 : 5 }}
        primary={
          <Typography
            component="div"
            sx={{
              position: 'relative',
              bottom: 3,
              color: '#263238',
              cursor: 'pointer',
              fontFamily: 'Roboto',
            }}
            fontSize={isMobile ? 13 : 17}
            fontWeight="bold"
          >
            {isMobile ? subStrTitle() : recruitment.title}
          </Typography>
        }
        secondary={
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mt: 0.1 }}>
            <Avatar
              component="span"
              sx={{ width: isMobile ? 27 : 29, height: isMobile ? 27 : 29, mr: 0.8 }}
              src={recruitment.user?.avatar}
            />
            <Box component="span" sx={{ fontSize: isMobile ? 11 : 12, mr: 0.3 }}>
              {recruitment.user?.name}・03/22 14:06 に応募
            </Box>
          </Box>
        }
      />
      {/* <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        minWidth: 100,
                        color: '#ffb333',
                        fontWeight: 'bold',
                        fontFamily: 'ヒラギノ角ゴシック',
                      }}
                    >
                      <IoMdTimer />
                      <Box sx={{ fontSize: 13, ml: 0.1 }}>対応待ち</Box>
                    </Box> */}
      {/* <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        minWidth: 100,
                        color: 'red',
                        fontWeight: 'bold',
                        fontFamily: 'ヒラギノ角ゴシック',
                      }}
                    >
                      <AiOutlineCloseCircle />
                      <Box sx={{ fontSize: 13, ml: 0.1 }}>見送り</Box>
                    </Box> */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          minWidth: isMobile ? 80 : 100,
          color: '#009688',
          fontWeight: 'bold',
          fontFamily: 'ヒラギノ角ゴシック',
        }}
      >
        <AiOutlineCheckCircle />
        <Box sx={{ fontSize: isMobile ? 12 : 13.5, ml: 0.1 }}>承諾済み</Box>
      </Box>
    </ListItem>
  );
});
