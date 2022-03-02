import { memo, VFC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSetRecoilState } from 'recoil';

import {
  RecruitmentInput,
  Level,
  Type,
  useCreateRecruitmentMutation,
  useGetCurrentUserRecruitmentsLazyQuery,
  Status,
} from '../generated/graphql';
import { RecruitmentForm } from '../components';
import { recruitmentSchema } from '../yup/recruitmentSchema';
import { flashMessage, flashState, flashType } from '../store/flash';

export const RecruitmentNew: VFC = memo(() => {
  const navigate = useNavigate();

  const [createRecruitment, { data, error }] = useCreateRecruitmentMutation();

  const [getRecruitments] = useGetCurrentUserRecruitmentsLazyQuery();

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const { control, formState, getValues, trigger, clearErrors, setValue, watch, resetField, setError } =
    useForm<RecruitmentInput>({
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
        status: Status.Draft,
        capacity: 0,
        place: '',
      },
      resolver: yupResolver(recruitmentSchema),
      mode: 'onChange',
    });

  const onClick = async (status: Status) => {
    setValue('status', status);

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
          status: getValues('status'),
          capacity: getValues('capacity') === 0 ? null : getValues('capacity'),
          startAt: getValues('startAt'),
          prefectureId: getValues('prefectureId') === '' ? null : getValues('prefectureId'),
        },
      });
      console.log(res);

      await getRecruitments();
      let message = '';
      if (status === Status.Published) {
        message = '募集を公開しました';
        navigate('/dashboard');
      } else if (status === Status.Draft) {
        message = '下書きに保存しました';
        navigate('/dashboard');
      }
      setState(true);
      setMessage(message);
      setType('success');
    }
  };

  return (
    <Box sx={{ pt: 2, px: 3, minHeight: '100vh' }} bgcolor="#ebf2f2">
      <Box>
        <IconButton onClick={() => navigate('/dashboard')} disableTouchRipple size="medium">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>
      <RecruitmentForm
        control={control}
        formState={formState}
        getValues={getValues}
        trigger={trigger}
        clearErrors={clearErrors}
        setValue={setValue}
        watch={watch}
        resetField={resetField}
        setError={setError}
        onClick={onClick}
      />
    </Box>
  );
});
