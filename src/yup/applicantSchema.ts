import * as yup from 'yup';

const applicantSchema = yup.object().shape({
  content: yup.string().required('メッセージを入力してください'),
});

export { applicantSchema };
