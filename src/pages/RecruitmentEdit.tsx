import { memo, useEffect, useMemo, VFC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Level,
  Type,
  RecruitmentInput,
  useGetEditRecruitmentQuery,
  useUpdateRecruitmentMutation,
  useGetCurrentUserRecruitmentsLazyQuery,
} from '../generated/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { recruitmentSchema } from '../yup/recruitmentSchema';
import { RecruitmentForm } from '../components/index';
import { useSetRecoilState } from 'recoil';
import { flashMessage, flashState, flashType } from '../store/flash';

export const RecruitmentEdit: VFC = memo(() => {
  const navigate = useNavigate();
  const { recruitmentId } = useParams();

  const setState = useSetRecoilState(flashState);
  const setMessage = useSetRecoilState(flashMessage);
  const setType = useSetRecoilState(flashType);

  const [updateRecruitment, { error }] = useUpdateRecruitmentMutation();

  const [getRecruitments] = useGetCurrentUserRecruitmentsLazyQuery();

  const { loading, data } = useGetEditRecruitmentQuery({
    variables: {
      id: String(recruitmentId),
    },
  });

  const recruitment = data?.getEditRecruitment;

  const onClick = async (isPublished: boolean) => {
    setValue('isPublished', isPublished);

    clearErrors();

    const result: boolean = await trigger();

    if (result) {
      const res = await updateRecruitment({
        variables: {
          id: String(recruitmentId),
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
      await getRecruitments();
      let message = '';
      if (isPublished) {
        message = '募集を公開しました';
      } else {
        message = '下書きに保存しました';
      }
      navigate('/dashboard');
      setState(true);
      setMessage(message);
      setType('success');
    }
  };

  const defaultValues = useMemo(() => {
    return {
      title: recruitment?.title,
      content: recruitment?.content,
      startAt: recruitment?.startAt,
      closingAt: recruitment?.closingAt,
      prefectureId: recruitment?.prefecture?.id,
      competitionId: recruitment?.competition?.id,
      type: !recruitment?.type ? Type.Unnecessary : recruitment.type,
      level: !recruitment?.level ? Level.Unnecessary : recruitment.level,
      locationLat: recruitment?.locationLat,
      locationLng: recruitment?.locationLng,
      isPublished: recruitment?.isPublished,
      capacity: recruitment?.capacity,
      place: recruitment?.place,
    };
  }, [data?.getEditRecruitment]);

  const { control, reset, formState, getValues, trigger, clearErrors, setValue, watch, resetField, setError } =
    useForm<RecruitmentInput>({
      defaultValues: defaultValues,
      resolver: yupResolver(recruitmentSchema),
      mode: 'onChange',
    });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      {!loading && (
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
      )}
    </>
  );
});
