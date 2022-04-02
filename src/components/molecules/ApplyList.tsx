import { Avatar, Box, ListItem, ListItemText, Typography } from '@mui/material';
import { memo, VFC } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdTimer } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ManagementStatus, Type } from '../../generated/graphql';
import { useSize } from '../../hooks';

type Recruitment = {
  id: string;
  title: string;
  type: Type;
  applicant?: Applicant | null | undefined;
  user?: User | null | undefined;
};

type Applicant = {
  managementStatus: ManagementStatus;
  createdAt: string;
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

  const navigate = useNavigate();

  const subStrTitle = () => {
    if (recruitment.title.length > 36) {
      const subStr = recruitment.title.substring(0, 35);
      return `${subStr}...`;
    } else {
      return recruitment.title;
    }
  };

  const applicantAt = () => {
    if (recruitment.type === Type.Individual || recruitment.type === Type.Opponent) {
      return `${recruitment.applicant?.createdAt}に応募`;
    } else {
      return `${recruitment.applicant?.createdAt}にメッセージ送信`;
    }
  };

  return (
    <ListItem sx={{ mt: isMobile ? 0.5 : 1.5, px: 0, mb: isMobile ? 0.5 : 1.5 }}>
      <ListItemText
        sx={{ mr: isMobile ? 0 : 5 }}
        primary={
          <Typography
            onClick={() => navigate(`/recruitments/${recruitment.id}`)}
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
          <Box
            onClick={() => navigate('/messages')}
            component="span"
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mt: 0.1 }}
          >
            <Avatar
              component="span"
              sx={{ width: isMobile ? 27 : 29, height: isMobile ? 27 : 29, mr: 0.8 }}
              src={recruitment.user?.avatar}
            />
            <Box component="span" sx={{ fontSize: isMobile ? 10 : 12, mr: 0.3 }}>
              {recruitment.user?.name}・{applicantAt()}
            </Box>
          </Box>
        }
      />
      {recruitment.applicant?.managementStatus === ManagementStatus.Backlog && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            minWidth: isMobile ? 80 : 120,
            color: '#ffb333',
            fontWeight: 'bold',
            fontFamily: 'ヒラギノ角ゴシック',
          }}
        >
          <IoMdTimer size={isMobile ? 12 : 15} />
          <Box sx={{ fontSize: isMobile ? 10 : 13, ml: 0.1 }}>対応待ち</Box>
        </Box>
      )}
      {recruitment.applicant?.managementStatus === ManagementStatus.Rejected && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            minWidth: isMobile ? 80 : 120,
            color: 'red',
            fontWeight: 'bold',
            fontFamily: 'ヒラギノ角ゴシック',
          }}
        >
          <AiOutlineCloseCircle size={isMobile ? 12 : 15} />
          <Box sx={{ fontSize: isMobile ? 10 : 13, ml: 0.1 }}>見送り</Box>
        </Box>
      )}
      {recruitment.applicant?.managementStatus === ManagementStatus.Accepted && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            minWidth: isMobile ? 80 : 120,
            color: '#009688',
            fontWeight: 'bold',
            fontFamily: 'ヒラギノ角ゴシック',
          }}
        >
          <AiOutlineCheckCircle size={isMobile ? 12 : 15} />
          <Box sx={{ fontSize: isMobile ? 10 : 13, ml: 0.2 }}>承諾済み</Box>
        </Box>
      )}
      {recruitment.applicant?.managementStatus === ManagementStatus.Unnecessary && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            minWidth: isMobile ? 80 : 120,
            color: '#009688',
            fontWeight: 'bold',
            fontFamily: 'ヒラギノ角ゴシック',
          }}
        >
          <AiOutlineCheckCircle size={isMobile ? 12 : 15} />
          <Box sx={{ fontSize: isMobile ? 10 : 13, ml: 0.2 }}>問合せ済み</Box>
        </Box>
      )}
    </ListItem>
  );
});
