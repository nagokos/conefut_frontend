import { memo, VFC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Button, DialogTitle, Divider, FormHelperText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledDialogInput } from '../custom/StyledDialogInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  ApplicantInput,
  ManagementStatus,
  Type,
  useApplyForRecruitmentMutation,
  useGetRecruitmentQuery,
} from '../../generated/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { applicantSchema } from '../../yup/applicantSchema';
import { useSize } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { flashMessage, flashState, flashType } from '../../store/flash';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const RecruitmentApplicantDialog: VFC<Props> = memo((props) => {
  const { open, handleClose } = props;

  const { recruitmentId } = useParams();
  const navigate = useNavigate();

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const [data] = useGetRecruitmentQuery({
    variables: {
      id: String(recruitmentId),
    },
  });

  const recruitment = data.data?.getRecruitment;

  const { isMobile } = useSize();

  const [result, applyForRecruitment] = useApplyForRecruitmentMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicantInput>({
    defaultValues: {
      content: '',
    },
    resolver: yupResolver(applicantSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ApplicantInput> = async (data: ApplicantInput) => {
    const variables = {
      recruitmentId: String(recruitmentId),
      content: data.content,
      managementStatus:
        recruitment?.type === Type.Individual || recruitment?.type === Type.Opponent
          ? ManagementStatus.Backlog
          : ManagementStatus.Unnecessary,
    };
    const res = await applyForRecruitment(variables);
    if (res.error?.graphQLErrors) {
      res.error.graphQLErrors.forEach((error) => {
        setState(true);
        setMessage(error.message);
        setType('error');
      });
    } else {
      setState(true);
      setMessage('メッセージを送信しました');
      setType('success');
      navigate('/messages');
    }
  };

  return (
    <Dialog
      maxWidth={false}
      open={open}
      onClose={() => {
        reset();
        handleClose();
      }}
      PaperProps={{
        sx: {
          mx: 1,
          width: 580,
          borderRadius: 1.5,
          boxShadow: '0 5px 20px #00166721;',
        },
      }}
      BackdropProps={{
        sx: {
          bgcolor: 'rgba(38, 50, 56, 0.25);',
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            fontSize: isMobile ? 13 : 14,
            color: '#49494B',
            fontWeight: 'bold',
            display: 'flex',
            py: 1.5,
            px: isMobile ? 1.8 : 3.2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>さかなクンにメッセージを送ります</Box>
          <IconButton
            onClick={() => {
              reset();
              handleClose();
            }}
            disableTouchRipple
            size="small"
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ borderColor: '#ebf2f2' }} />
        <DialogContent sx={{ pb: 1.8, pt: 2, px: isMobile ? 1.8 : 3.2 }}>
          <Controller
            control={control}
            name="content"
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <>
                <Box sx={{ fontSize: isMobile ? 11 : 13, color: '#49494B', fontFamily: 'ヒラギノ角ゴシック' }}>
                  <Box> 募集内容をご確認の上メッセージを送信してください。</Box>
                  <Box sx={{ mt: 0.2 }}>応募をしても承諾されるまでは確定しません。</Box>
                </Box>
                <StyledDialogInput
                  minRows={7}
                  multiline
                  error={!!errors.content}
                  {...field}
                  fullWidth
                  autoFocus
                  sx={{ fontSize: isMobile ? 13 : 14, fontFamily: 'Roboto', mt: 1.5 }}
                  placeholder="メッセージを入力"
                />
              </>
            )}
          />
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              {!!errors.content && (
                <FormHelperText sx={{ textAlign: 'left', fontSize: isMobile ? 10 : 12 }} error={!!errors.content}>
                  {errors.content ? errors.content.message : ' '}
                </FormHelperText>
              )}
            </Box>
            <Box>
              <Button
                disableElevation
                disableRipple
                variant="contained"
                size="small"
                color="light"
                sx={{
                  fontSize: isMobile ? 10 : 12,
                  px: isMobile ? 1 : 1.5,
                  mr: 1,
                  border: '1px solid #e0e0e0',
                  ':hover': { bgcolor: '#f5f5f5' },
                }}
                onClick={() => {
                  reset();
                  handleClose();
                }}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disableElevation
                disableRipple
                variant="contained"
                size="small"
                sx={{ fontSize: isMobile ? 10 : 12, px: isMobile ? 0 : 1.8, border: '1px solid #009688' }}
              >
                送信する
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
});
