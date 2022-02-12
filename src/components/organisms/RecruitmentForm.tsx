import { memo, useEffect, useState, VFC } from 'react';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import {
  RecruitmentFormType,
  RecruitmentFormCompetition,
  RecruitmentFormTitle,
  RecruitmentFormContent,
  RecruitmentFormPlace,
  RecruitmentFormArea,
  RecruitmentFormLevel,
  RecruitmentFormCapacity,
  RecruitmentFormStart,
  RecruitmentFormDeadline,
  RecruitmentFormCreate,
  RecruitmentFormPreview,
  RecruitmentFormLocation,
  RecruitmentFormDraft,
  RecruitmentFormHelp,
  RecruitmentLocationDialog,
} from '../index';
import { CreateRecruitmentInput, Level, useCreateRecruitmentMutation } from '../../generated/graphql';
import { flashMessage, flashState, flashType } from '../../store/flash';

export const RecruitmentForm: VFC = memo(() => {
  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const [open, setOpen] = useState<boolean>(false);

  const [createRecruitment, { data, error }] = useCreateRecruitmentMutation();

  const {
    control,
    formState: { errors },
    getValues,
    trigger,
    clearErrors,
    setValue,
  } = useForm<CreateRecruitmentInput>({
    defaultValues: {
      title: '',
      content: '',
      startAt: '',
      closingAt: '',
      prefectureId: '',
      competitionId: '',
      type: undefined,
      level: Level.Unnecessary,
      locationLat: undefined,
      locationLng: undefined,
      capacity: 1,
      place: '',
    },
    mode: 'onChange',
  });

  const onClick = async () => {
    clearErrors();
    const result: boolean = await trigger();
    if (result) {
      const res = await createRecruitment({
        variables: {
          title: getValues('title'),
          competitionId: getValues('competitionId'),
          closingAt: getValues('closingAt'),
          level: getValues('level'),
          type: getValues('type'),
          content: getValues('content'),
          place: getValues('place'),
          locationLat: getValues('locationLat'),
          locationLng: getValues('locationLng'),
          capacity: getValues('capacity'),
          startAt: getValues('startAt'),
          prefectureId: getValues('prefectureId'),
        },
      });
      console.log(res);
    }
  };

  useEffect(() => {
    let message: string | undefined = '';
    if (Object.keys(errors).length !== 0) {
      if (errors.title) {
        message = errors.title.message;
      } else if (errors.competitionId) {
        message = errors.competitionId.message;
      } else if (errors.type) {
        message = errors.type.message;
      } else if (errors.closingAt) {
        message = errors.closingAt.message;
      } else if (errors.content) {
        message = errors.content.message;
      }
      setState(true);
      setMessage(message);
      setType('error');
    }
  }, [errors]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid sx={{ maxWidth: 900, margin: '0 auto', px: 0, mt: 7 }}>
        <Grid item xs={10}>
          <RecruitmentFormTitle control={control} />
          <Box px={2.4} mt={0.8}>
            <RecruitmentFormCompetition control={control} />
            <RecruitmentFormType control={control} />
          </Box>
        </Grid>
        <Grid display="none" item xs={2} />
      </Grid>
      <Grid container sx={{ maxWidth: 900, margin: '0 auto', px: 0 }}>
        <Grid item xs={10}>
          <Box sx={{ mt: -1 }}>
            <Container>
              <RecruitmentFormContent control={control} />
              <Grid container mt={4}>
                <Grid item xs={6}>
                  <Box maxWidth={320}>
                    <RecruitmentFormArea control={control} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box maxWidth={320} ml="auto">
                    <RecruitmentFormPlace control={control} />
                  </Box>
                </Grid>
                <Grid mt={4} item xs={6}>
                  <Box maxWidth={320}>
                    <RecruitmentFormLevel control={control} />
                  </Box>
                </Grid>
                <Grid mt={4} item xs={6}>
                  <Box maxWidth={320} ml="auto">
                    <RecruitmentFormCapacity control={control} />
                  </Box>
                </Grid>
                <Grid mt={3} item xs={6}>
                  <Box maxWidth={320}>
                    <RecruitmentFormStart control={control} />
                  </Box>
                </Grid>
                <Grid mb={15} mt={3} item xs={6}>
                  <Box maxWidth={320} ml="auto">
                    <RecruitmentFormDeadline control={control} />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>
        <Grid mt={2} xs={2} item>
          <Grid container spacing={1.4}>
            <Grid item xs={12}>
              <RecruitmentFormCreate onClick={onClick} />
            </Grid>
            <Grid item xs={12}>
              <RecruitmentFormPreview />
            </Grid>
            <Grid item xs={12}>
              <RecruitmentFormLocation handleClickOpen={handleClickOpen} />
            </Grid>
            <Grid item xs={12}>
              <RecruitmentFormDraft />
            </Grid>
            <Grid item xs={12}>
              <RecruitmentFormHelp />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <RecruitmentLocationDialog setValue={setValue} open={open} handleClose={handleClose} />
    </>
  );
});
