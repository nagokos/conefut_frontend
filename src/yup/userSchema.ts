import * as yup from 'yup';

const signupSchema = yup.object().shape({
  name: yup.string().max(50, 'お名前は50文字以内で入力してください').required('お名前を入力してください'),
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以内で入力してください')
    .matches(
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
      'メールアドレスを正しく入力してください'
    ),
  password: yup
    .string()
    .min(8, 'パスワードは8文字以上にしてください')
    .required('パスワードを入力してください')
    .matches(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i, 'パスワードを正しく入力してください'),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以内で入力してください')
    .matches(
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/i,
      'メールアドレスを正しく入力してください'
    ),
  password: yup
    .string()
    .min(8, 'パスワードは8文字以上にしてください')
    .required('パスワードを入力してください')
    .matches(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i, 'パスワードを正しく入力してください'),
});

export { signupSchema, loginSchema };
