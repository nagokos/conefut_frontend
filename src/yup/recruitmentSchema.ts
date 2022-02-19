import * as yup from 'yup';
import { Level, Type } from '../generated/graphql';
import { differenceInMinutes } from 'date-fns';

export const recruitmentSchema = yup.object().shape({
  title: yup.string().max(60, 'タイトルは60文字以内で入力してください').required('タイトルを入力してください'),
  competitionId: yup.string().when('isPublished', {
    is: true,
    then: yup.string().required('募集競技を選択してください'),
    otherwise: yup.string().notRequired(),
  }),
  type: yup.string().when('isPublished', {
    is: true,
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
    .when('isPublished', {
      is: true,
      then: yup.string().required('募集の詳細を入力してください'),
      otherwise: yup.string().notRequired(),
    }),
  prefectureId: yup.string().when('isPublished', {
    is: true,
    then: yup.string().required('募集エリアを選択してください'),
    otherwise: yup.string().notRequired(),
  }),
  place: yup.string().when('isPublished', {
    is: true,
    then: yup.string().when('type', {
      is: (value: Type) => value === Type.Opponent || value === Type.Individual,
      then: yup.string().required('会場名を入力してください'),
      otherwise: yup.string().notRequired(),
    }),
    otherwise: yup.string().notRequired(),
  }),
  level: yup.string().when('isPublished', {
    is: true,
    then: yup.string().when('type', {
      is: (value: Type) =>
        value === Type.Opponent ||
        value === Type.Individual ||
        value === Type.Teammate ||
        value === Type.Joining ||
        value === Type.Coaching,
      then: yup.string().test('required_if_unnecessary_level', 'レベルを選択してください', (value) => {
        if (value === Level.Unnecessary) {
          return false;
        } else {
          return true;
        }
      }),
      otherwise: yup.string().notRequired(),
    }),
    otherwise: yup.string().notRequired(),
  }),
  capacity: yup.number().when('isPublished', {
    is: true,
    then: yup.number().when('type', {
      is: (value: Type) =>
        value === Type.Opponent || value === Type.Individual || value === Type.Teammate || value === Type.Coaching,
      then: yup
        .number()
        .required('募集人数を入力してください')
        .min(1, '募集人数は1名以上にしてください')
        .positive('募集人数は1名以上にしてください')
        .integer(),
    }),
    otherwise: yup.number().notRequired(),
  }),
  startAt: yup.string().when('isPublished', {
    is: true,
    then: yup.string().when('type', {
      is: (value: Type) => value === Type.Opponent || value === Type.Individual,
      then: yup.string().required('開催日時を設定してください'),
      otherwise: yup.string().notRequired(),
    }),
    otherwise: yup.string().notRequired(),
  }),
  closingAt: yup.string().when('isPublished', {
    is: true,
    then: yup
      .string()
      .required('募集期限を設定してください')
      .when(['startAt', 'closingAt'], {
        is: (valueStart: string, valueClosing: string) =>
          differenceInMinutes(new Date(valueStart), new Date(valueClosing)) < 60,
        then: yup.string().test('within_the_deadline', '募集期限は開催日時の1時間以上前に設定してください', () => {
          return false;
        }),
        otherwise: yup.string().notRequired(),
      }),
    otherwise: yup.string().notRequired(),
  }),
  locationLat: yup.number(),
  locationLng: yup.number(),
  isPublished: yup.boolean().required(),
});
