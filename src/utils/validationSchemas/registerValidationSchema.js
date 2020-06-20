import * as Yup  from 'yup';

const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),

  firstName: Yup.string()
    .required(),
  
  lastName: Yup.string()
    .required(),

  password: Yup.string()
    .required(),
});

export default registerValidationSchema;
