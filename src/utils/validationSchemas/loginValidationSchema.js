import * as Yup  from 'yup';
import validationTranslate from './validationTranslate';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationTranslate('email', 'isEmail'))
    .required(validationTranslate('email', 'isRequired')),

  password: Yup.string()
    .required(validationTranslate('password', 'isRequired')),
});

export default loginValidationSchema;
