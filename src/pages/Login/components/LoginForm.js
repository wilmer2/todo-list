import React from 'react';
import { Formik, Form } from 'formik';
import BasicInput from '../../../components/input/BasicInput';
import loginValidationSchema from '../../../utils/validationSchemas/loginValidationSchema';

const LoginForm = ({ onSubmit, loading }) => {

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {
        ({ handleBlur, handleChange, setStatus, values, errors, touched, status }) => (
          <Form>
            <BasicInput 
              title='Correo electrónico'
              name='email'
              type='email'
              errors={errors}
              status={status}
              value={values.email}
              touched={touched.email}
              onBlur={handleBlur}
              onChange={handleChange}
              setStatus={setStatus}
            />
            <BasicInput 
              title='Contraseña'
              name='password'
              type='password'
              errors={errors}
              status={status}
              value={values.password}
              touched={touched.password}
              onBlur={handleBlur}
              onChange={handleChange}
              setStatus={setStatus}
            />
            <button 
              disabled={loading}
              type='submit' 
              className='btn btn-primary btn-block todo-login__button'
            >
              {!loading ? 'Ingresa' : 'Cargando ' }
            </button>
          </Form>
        )
      }
    </Formik>
  );
};

export default LoginForm;
