import { memo, useEffect, useState, VFC } from 'react';
import Box from '@mui/material/Box';
import { Backdrop, Container, Grid } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

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
import { useSize } from '../../hooks';

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

import { RiDraftLine } from 'react-icons/ri';
import { AiOutlineTag } from 'react-icons/ai';

import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { BiBookReader } from 'react-icons/bi';
import { SpeedDialAction } from '@mui/material';
import { AddTagDialog } from '../molecules/AddTagDialog';

const actions = [
  { id: 4, icon: <RiDraftLine size="20" />, name: '下書き保存' },
  { id: 3, icon: <AiOutlineTag size="20" />, name: 'タグを追加' },
  { id: 2, icon: <MdOutlineAddLocationAlt size="20" />, name: '会場を埋め込む' },
  { id: 1, icon: <BiBookReader size="20" />, name: '募集を公開' },
];

export const RecruitmentForm: VFC<Props> = memo((props) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
    onClick,
  } = props;

  const [openTag, setOpenTag] = useState<boolean>(false);
  const [openDial, setOpenDial] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenDial = () => setOpenDial(true);
  const handleCloseDial = () => setOpenDial(false);

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const { isMobile } = useSize();

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

  const handleClickOpenTag = () => {
    setOpenTag(true);
  };

  const handleCloseTag = () => {
    setOpenTag(false);
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

  const dialAction = (id: number) => {
    if (id === 1) {
      onClick(Status.Published);
    } else if (id === 2) {
      handleClickOpen();
    } else if (id === 3) {
      handleClickOpenTag();
    } else if (id === 4) {
      onClick(Status.Draft);
    }
  };

  return (
    <>
      <Grid sx={{ maxWidth: 900, margin: '0 auto', px: 1, mt: isMobile ? 2 : 7 }}>
        <Grid item xs={10}>
          <Box sx={{ px: isMobile ? 1.5 : 3 }}>
            <RecruitmentFormTitle control={control} />
          </Box>
          <Box px={isMobile ? 1 : 2.4} mt={0.8}>
            <RecruitmentFormCompetition watchType={watchType} watchStatus={watchStatus} control={control} />
            <RecruitmentFormType watchType={watchType} watchStatus={watchStatus} control={control} />
          </Box>
        </Grid>
        <Grid display="none" item xs={2} />
      </Grid>
      <Grid container sx={{ maxWidth: 900, margin: '0 auto', px: 0, pb: 10 }}>
        <Grid item md={10} sm={12} xs={12}>
          <Box sx={{ mt: -1 }}>
            <Container sx={{ px: 2 }}>
              <RecruitmentFormContent watchType={watchType} watchStatus={watchStatus} control={control} />
              {watchType !== Type.Unnecessary && (
                <Grid container>
                  <Grid item xs={12} md={6} sx={{ mt: 4 }}>
                    <Box maxWidth={isMobile ? 'auto' : 320}>
                      <RecruitmentFormArea
                        watchType={watchType}
                        watchStatus={watchStatus}
                        getValues={getValues}
                        control={control}
                      />
                    </Box>
                  </Grid>
                  {watchType === Type.Opponent || watchType === Type.Individual ? (
                    <Grid item xs={12} md={6} sx={{ mt: 4 }}>
                      <Box maxWidth={isMobile ? 'auto' : 320} ml="auto">
                        <RecruitmentFormPlace watchType={watchType} watchStatus={watchStatus} control={control} />
                      </Box>
                    </Grid>
                  ) : null}
                  {watchType === Type.Opponent || watchType === Type.Individual ? (
                    <Grid item xs={12} md={6} sx={{ mt: 4 }}>
                      <Box maxWidth={isMobile ? 'auto' : 320}>
                        <RecruitmentFormStart
                          getValues={getValues}
                          watchType={watchType}
                          watchStatus={watchStatus}
                          control={control}
                        />
                      </Box>
                    </Grid>
                  ) : null}
                  <Grid mt={4} item xs={12} md={6}>
                    <Box maxWidth={isMobile ? 'auto' : 320} sx={{ ml: 'auto' }}>
                      <RecruitmentFormDeadline
                        getValues={getValues}
                        watchType={watchType}
                        watchStatus={watchStatus}
                        control={control}
                      />
                    </Box>
                  </Grid>
                  {watchType === Type.Joining || watchType === Type.Others || watchType === Type.Member ? null : (
                    <Grid mt={4} item xs={12} md={6}>
                      <Box maxWidth={isMobile ? 'auto' : 320}>
                        <RecruitmentFormCapacity watchType={watchType} watchStatus={watchStatus} control={control} />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Container>
          </Box>
        </Grid>
        {!isMobile && (
          <Grid mt={2} xs={2} item>
            <Grid container spacing={1.4}>
              <Grid item xs={12}>
                <RecruitmentFormPublish onClick={onClick} />
              </Grid>
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
            </Grid>
          </Grid>
        )}
      </Grid>
      {isMobile && (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <Backdrop sx={{ bgcolor: 'rgba(38, 50, 56, 0.25);' }} open={openDial} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            icon={<SpeedDialIcon />}
            onClose={handleCloseDial}
            onOpen={handleOpenDial}
            open={openDial}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.id}
                icon={action.icon}
                tooltipTitle={
                  <>
                    <Box sx={{ fontSize: 13, px: 0 }}>{action.name}</Box>
                  </>
                }
                tooltipOpen
                onClick={() => {
                  handleClose();
                  dialAction(action.id);
                }}
              />
            ))}
          </SpeedDial>
        </Box>
      )}
      {isMobile && (
        <AddTagDialog getValues={getValues} setFormValue={setValue} open={openTag} handleClose={handleCloseTag} />
      )}
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
