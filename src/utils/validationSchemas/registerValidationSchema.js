import * as Yup  from 'yup';
import validationTranslate from './validationTranslate';

const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationTranslate('email', 'isEmail'))
    .required(validationTranslate('email', 'isRequired')),

  firstName: Yup.string()
    .required(validationTranslate('firstName', 'isRequired')),
  
  lastName: Yup.string()
    .required(validationTranslate('lastName', 'isRequired')),

  password: Yup.string()
    .required(validationTranslate('password', 'isRequired')),
});

export default registerValidationSchema;
