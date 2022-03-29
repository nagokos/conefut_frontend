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
  Type,
  useCreateRecruitmentMutation,
  Status,
  useGetCurrentUserQuery,
  EmailVerificationStatus,
} from '../generated/graphql';
import { RecruitmentForm } from '../components';
import { recruitmentSchema } from '../yup/recruitmentSchema';
import { flashMessage, flashState, flashType } from '../store/flash';
import { useSize } from '../hooks';

import { RiDraftLine } from 'react-icons/ri';
import { AiOutlineTag } from 'react-icons/ai';

import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { BiBookReader } from 'react-icons/bi';

const actions = [
  { id: 4, icon: <RiDraftLine size="20" />, name: '下書き保存' },
  { id: 3, icon: <AiOutlineTag size="20" />, name: 'タグを追加' },
  { id: 2, icon: <MdOutlineAddLocationAlt size="20" />, name: '会場を埋め込む' },
  { id: 1, icon: <BiBookReader size="20" />, name: '募集を公開' },
];

export const RecruitmentNew: VFC = memo(() => {
  const navigate = useNavigate();

  const [result, createRecruitment] = useCreateRecruitmentMutation();

  const [userData] = useGetCurrentUserQuery();

  const { isMobile } = useSize();

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
        locationLat: undefined,
        locationLng: undefined,
        status: Status.Draft,
        capacity: 0,
        place: '',
        tags: [],
      },
      resolver: yupResolver(recruitmentSchema),
      mode: 'onChange',
    });

  const onClick = async (status: Status) => {
    if (
      status === Status.Published &&
      userData.data?.getCurrentUser?.emailVerificationStatus === EmailVerificationStatus.Pending
    ) {
      setState(true);
      setMessage('メールアドレスを認証してください');
      setType('warning');
      return;
    }
    setValue('status', status);

    clearErrors();

    const result: boolean = await trigger();

    if (result) {
      const variables = {
        title: getValues('title'),
        competitionId: getValues('competitionId'),
        closingAt: getValues('closingAt'),
        type: getValues('type'),
        content: getValues('content'),
        place: getValues('place'),
        locationLat: getValues('locationLat'),
        locationLng: getValues('locationLng'),
        status: getValues('status'),
        capacity: getValues('capacity') === 0 ? null : getValues('capacity'),
        startAt: getValues('startAt'),
        prefectureId: getValues('prefectureId') === '' ? null : getValues('prefectureId'),
        tags: getValues('tags'),
      };

      await createRecruitment(variables);

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
    <>
      <Box sx={{ pt: 2, px: isMobile ? 0 : 3, minHeight: '100vh' }} bgcolor="#ebf2f2">
        <IconButton sx={{ ml: 1 }} onClick={() => navigate('/dashboard')} disableTouchRipple size="medium">
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </IconButton>
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
    </>
  );
});
