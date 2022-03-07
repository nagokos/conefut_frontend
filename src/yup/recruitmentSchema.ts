import * as yup from 'yup';
import { Status, Type } from '../generated/graphql';
import { differenceInMinutes } from 'date-fns';

export const recruitmentSchema = yup.object().shape({
  title: yup.string().max(60, 'タイトルは60文字以内で入力してください').required('タイトルを入力してください'),
  competitionId: yup.string().when('status', {
    is: Status.Published,
    then: yup.string().required('募集競技を選択してください'),
    otherwise: yup.string().notRequired(),
  }),
  type: yup.string().when('status', {
    is: Status.Published,
    then: yup
      .string()
      .required('募集タイプを選択してください')
      .test('required_if_unnecessary_type', '募集タイプを選択してください', (value) => {
        if (value === Type.Unnecessary) {
          return false;
        } else {
          return true;
        }
      }),
    otherwise: yup.string().notRequired(),
  }),
  content: yup
    .string()
    .max(10000, '募集の詳細は10000文字以内で入力してください')
    .when('status', {
      is: Status.Published,
      then: yup.string().required('募集の詳細を入力してください'),
      otherwise: yup.string().notRequired(),
    }),
  prefectureId: yup.string().when('status', {
    is: Status.Published,
    then: yup.string().required('募集エリアを選択してください'),
    otherwise: yup.string().notRequired(),
  }),
  place: yup.string().when('status', {
    is: Status.Published,
    then: yup.string().when('type', {
      is: (value: Type) => value === Type.Opponent || value === Type.Individual,
      then: yup.string().required('会場名を入力してください'),
      otherwise: yup.string().notRequired(),
    }),
    otherwise: yup.string().notRequired(),
  }),
  capacity: yup.number().when('status', {
    is: Status.Published,
    then: yup.number().when('type', {
      is: (value: Type) => value === Type.Opponent || value === Type.Individual,
      then: yup
        .number()
        .required('募集人数を入力してください')
        .min(1, '募集人数は1名以上にしてください')
        .positive('募集人数は1名以上にしてください')
        .integer(),
      otherwise: yup.number().nullable(),
    }),
    otherwise: yup.number().nullable(),
  }),
  startAt: yup.string().when('status', {
    is: Status.Published,
    then: yup.string().when('type', {
      is: (value: Type) => value === Type.Opponent || value === Type.Individual,
      then: yup
        .string()
        .required('開催日時を設定してください')
        .when('startAt', {
          is: (value: string) => differenceInMinutes(new Date(value), new Date()) < 0,
          then: yup.string().test('before_now_start', '開催日時は現在以降に設定してください', () => {
            return false;
          }),
        }),
      otherwise: yup.string().notRequired(),
    }),
    otherwise: yup.string().notRequired(),
  }),
  closingAt: yup.string().when('status', {
    is: Status.Published,
    then: yup
      .string()
      .required('募集期限を設定してください')
      .when('closingAt', {
        is: (value: string) => differenceInMinutes(new Date(value), new Date()) < 0,
        then: yup.string().test('before_now_closing', '募集期限は現在以降に設定してください', () => {
          return false;
        }),
      })
      .when(['startAt', 'closingAt'], {
        is: (valueStart: string, valueClosing: string) =>
          differenceInMinutes(new Date(valueStart), new Date(valueClosing)) < 0,
        then: yup.string().test('within_the_deadline', '募集期限は開催日時より前に設定してください', () => {
          return false;
        }),
        otherwise: yup.string().notRequired(),
      }),
    otherwise: yup.string().notRequired(),
  }),
  locationLat: yup.number().nullable(),
  locationLng: yup.number().nullable(),
  status: yup.string(),
});
