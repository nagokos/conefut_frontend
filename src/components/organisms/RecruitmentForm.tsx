import { memo, useEffect, useState, VFC } from 'react';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import { useSetRecoilState } from 'recoil';

import {
  RecruitmentFormType,
  RecruitmentFormCompetition,
  RecruitmentFormTitle,
  RecruitmentFormContent,
  RecruitmentFormPlace,
  RecruitmentFormArea,
  RecruitmentFormCapacity,
  RecruitmentFormStart,
  RecruitmentFormDeadline,
  RecruitmentFormPublish,
  RecruitmentFormLocation,
  RecruitmentFormDraft,
  RecruitmentFormTags,
  RecruitmentLocationDialog,
} from '../index';
import { RecruitmentInput, Status, Type } from '../../generated/graphql';
import { flashMessage, flashState, flashType } from '../../store/flash';
import {
  Control,
  FormState,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

type Props = {
  control: Control<RecruitmentInput, object>;
  formState: FormState<RecruitmentInput>;
  getValues: UseFormGetValues<RecruitmentInput>;
  trigger: UseFormTrigger<RecruitmentInput>;
  clearErrors: UseFormClearErrors<RecruitmentInput>;
  setValue: UseFormSetValue<RecruitmentInput>;
  watch: UseFormWatch<RecruitmentInput>;
  resetField: UseFormResetField<RecruitmentInput>;
  setError: UseFormSetError<RecruitmentInput>;
  onClick: (status: Status) => void;
};

export const RecruitmentForm: VFC<Props> = memo((props) => {
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
    onClick,
  } = props;

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const [open, setOpen] = useState<boolean>(false);

  const watchType = watch('type');
  const watchStatus = watch('status');

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
    if (watchType === Type.Joining || watchType === Type.Member || watchType === Type.Others) {
      setValue('locationLat', undefined);
      setValue('locationLng', undefined);
      setValue('place', '');
      setValue('startAt', '');
      setValue('capacity', undefined);
    } else {
      setValue('capacity', 1);
    }
  }, [watchType]);

  return (
    <>
      <Grid sx={{ maxWidth: 900, margin: '0 auto', px: 0, mt: 7 }}>
        <Grid item xs={10}>
          <RecruitmentFormTitle control={control} />
          <Box px={2.4} mt={0.8}>
            <RecruitmentFormCompetition watchType={watchType} watchStatus={watchStatus} control={control} />
            <RecruitmentFormType watchType={watchType} watchStatus={watchStatus} control={control} />
          </Box>
        </Grid>
        <Grid display="none" item xs={2} />
      </Grid>
      <Grid container sx={{ maxWidth: 900, margin: '0 auto', px: 0, pb: 10 }}>
        <Grid item xs={10}>
          <Box sx={{ mt: -1 }}>
            <Container>
              <RecruitmentFormContent watchType={watchType} watchStatus={watchStatus} control={control} />
              {watchType !== Type.Unnecessary && (
                <Grid container>
                  <Grid mt={4} item xs={6}>
                    <Box maxWidth={320}>
                      <RecruitmentFormArea
                        watchType={watchType}
                        watchStatus={watchStatus}
                        getValues={getValues}
                        control={control}
                      />
                    </Box>
                  </Grid>
                  {watchType === Type.Opponent || watchType === Type.Individual ? (
                    <Grid mt={4} item xs={6}>
                      <Box maxWidth={320} ml="auto">
                        <RecruitmentFormPlace watchType={watchType} watchStatus={watchStatus} control={control} />
                      </Box>
                    </Grid>
                  ) : null}
                  {watchType === Type.Opponent || watchType === Type.Individual ? (
                    <Grid mt={4} item xs={6}>
                      <Box maxWidth={320}>
                        <RecruitmentFormStart
                          getValues={getValues}
                          watchType={watchType}
                          watchStatus={watchStatus}
                          control={control}
                        />
                      </Box>
                    </Grid>
                  ) : null}
                  <Grid mt={4} item xs={6}>
                    <Box maxWidth={320} sx={{ ml: 'auto' }}>
                      <RecruitmentFormDeadline
                        getValues={getValues}
                        watchType={watchType}
                        watchStatus={watchStatus}
                        control={control}
                      />
                    </Box>
                  </Grid>
                  {watchType === Type.Joining || watchType === Type.Others || watchType === Type.Member ? null : (
                    <Grid mt={4} item xs={6}>
                      <Box maxWidth={320}>
                        <RecruitmentFormCapacity watchType={watchType} watchStatus={watchStatus} control={control} />
                      </Box>
                    </Grid>
                  )}
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
            {/* <Grid item xs={12}>
              <RecruitmentFormPreview />
            </Grid> */}
            {watchType === Type.Opponent || watchType === Type.Individual ? (
              <Grid item xs={12}>
                <RecruitmentFormLocation handleClickOpen={handleClickOpen} />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <RecruitmentFormTags getValues={getValues} setFormValue={setValue} />
            </Grid>
            <Grid item xs={12}>
              <RecruitmentFormDraft onClick={onClick} />
            </Grid>
            {/* <Grid item xs={12}>
              <RecruitmentFormHelp />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <RecruitmentLocationDialog
        getValues={getValues}
        watchType={watchType}
        setValue={setValue}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
});
