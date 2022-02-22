import { memo, useEffect, useState, VFC } from 'react';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup';
import { recruitmentSchema } from '../../yup/recruitmentSchema';

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
  RecruitmentFormPublish,
  RecruitmentFormPreview,
  RecruitmentFormLocation,
  RecruitmentFormDraft,
  RecruitmentFormHelp,
  RecruitmentLocationDialog,
} from '../index';
import { CreateRecruitmentInput, Level, Type, useCreateRecruitmentMutation } from '../../generated/graphql';
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
    watch,
    resetField,
    setError,
  } = useForm<CreateRecruitmentInput>({
    defaultValues: {
      title: '',
      content: '',
      startAt: '',
      closingAt: '',
      prefectureId: undefined,
      competitionId: undefined,
      type: Type.Unnecessary,
      level: Level.Unnecessary,
      locationLat: undefined,
      locationLng: undefined,
      isPublished: false,
      capacity: 0,
      place: '',
    },
    resolver: yupResolver(recruitmentSchema),
    mode: 'onChange',
  });

  const watchType = watch('type');
  const watchIsPublished = watch('isPublished');

  const onClick = async (isPublish: boolean) => {
    setValue('isPublished', isPublish);

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
          isPublished: getValues('isPublished'),
          capacity: getValues('capacity') === 0 ? null : getValues('capacity'),
          startAt: getValues('startAt'),
          prefectureId: getValues('prefectureId') === '' ? null : getValues('prefectureId'),
        },
      });
      let message = '';
      if (isPublish) {
        message = '募集を公開しました';
      } else {
        message = '下書きに保存しました';
      }
      console.log(res);
      setState(true);
      setMessage(message);
      setType('success');
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
      } else if (errors.prefectureId) {
        message = errors.prefectureId.message;
      } else if (errors.level) {
        message = errors.level.message;
      } else if (errors.place) {
        message = errors.place.message;
      } else if (errors.capacity) {
        message = errors.capacity.message;
      } else if (errors.startAt) {
        message = errors.startAt.message;
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

  useEffect(() => {
    if (watchType === Type.Teammate || watchType === Type.Coaching) {
      resetField('locationLat');
      resetField('locationLng');
      resetField('place');
      resetField('startAt');
    } else if (watchType === Type.Joining) {
      resetField('locationLat');
      resetField('locationLng');
      resetField('place');
      resetField('startAt');
      resetField('capacity');
    } else if (watchType === Type.Others) {
      resetField('locationLat');
      resetField('locationLng');
      resetField('place');
      resetField('startAt');
      resetField('capacity');
      resetField('level');
    }
  }, [watchType]);

  return (
    <>
      <Grid sx={{ maxWidth: 900, margin: '0 auto', px: 0, mt: 7 }}>
        <Grid item xs={10}>
          <RecruitmentFormTitle control={control} />
          <Box px={2.4} mt={0.8}>
            <RecruitmentFormCompetition watchType={watchType} watchIsPublished={watchIsPublished} control={control} />
            <RecruitmentFormType watchType={watchType} watchIsPublished={watchIsPublished} control={control} />
          </Box>
        </Grid>
        <Grid display="none" item xs={2} />
      </Grid>
      <Grid container sx={{ maxWidth: 900, margin: '0 auto', px: 0, pb: 10 }}>
        <Grid item xs={10}>
          <Box sx={{ mt: -1 }}>
            <Container>
              <RecruitmentFormContent watchType={watchType} watchIsPublished={watchIsPublished} control={control} />
              {watchType !== Type.Unnecessary && (
                <Grid container>
                  <Grid mt={4} item xs={6}>
                    <Box maxWidth={320}>
                      <RecruitmentFormArea
                        watchType={watchType}
                        watchIsPublished={watchIsPublished}
                        getValues={getValues}
                        control={control}
                      />
                    </Box>
                  </Grid>
                  {watchType === Type.Opponent || watchType === Type.Individual ? (
                    <Grid mt={4} item xs={6}>
                      <Box maxWidth={320} ml="auto">
                        <RecruitmentFormPlace
                          watchType={watchType}
                          watchIsPublished={watchIsPublished}
                          control={control}
                        />
                      </Box>
                    </Grid>
                  ) : null}
                  {watchType !== Type.Others && (
                    <Grid mt={4} item xs={6}>
                      <Box
                        maxWidth={320}
                        ml={watchType === Type.Opponent || watchType === Type.Individual ? '' : 'auto'}
                      >
                        <RecruitmentFormLevel
                          watchType={watchType}
                          watchIsPublished={watchIsPublished}
                          control={control}
                        />
                      </Box>
                    </Grid>
                  )}
                  {watchType === Type.Joining || watchType === Type.Others ? null : (
                    <Grid mt={4} item xs={6}>
                      <Box maxWidth={320} ml={watchType === Type.Teammate || watchType === Type.Coaching ? '' : 'auto'}>
                        <RecruitmentFormCapacity
                          watchType={watchType}
                          watchIsPublished={watchIsPublished}
                          control={control}
                        />
                      </Box>
                    </Grid>
                  )}
                  {watchType === Type.Opponent || watchType === Type.Individual ? (
                    <Grid mt={4} item xs={6}>
                      <Box maxWidth={320}>
                        <RecruitmentFormStart
                          watchType={watchType}
                          watchIsPublished={watchIsPublished}
                          control={control}
                        />
                      </Box>
                    </Grid>
                  ) : null}
                  <Grid mt={4} item xs={6}>
                    <Box maxWidth={320} ml={watchType === Type.Joining ? '' : 'auto'}>
                      <RecruitmentFormDeadline
                        watchType={watchType}
                        watchIsPublished={watchIsPublished}
                        control={control}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Container>
          </Box>
        </Grid>
        <Grid mt={2} xs={2} item>
          <Grid container spacing={1.4}>
            <Grid item xs={12}>
              <RecruitmentFormPublish onClick={onClick} />
            </Grid>
            <Grid item xs={12}>
              <RecruitmentFormPreview />
            </Grid>
            {watchType === Type.Opponent || watchType === Type.Individual ? (
              <Grid item xs={12}>
                <RecruitmentFormLocation handleClickOpen={handleClickOpen} />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <RecruitmentFormDraft onClick={onClick} />
            </Grid>
            <Grid item xs={12}>
              <RecruitmentFormHelp />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <RecruitmentLocationDialog watchType={watchType} setValue={setValue} open={open} handleClose={handleClose} />
    </>
  );
});
