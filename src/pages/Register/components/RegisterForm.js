import React from 'react';
import { Formik, Form } from 'formik';
import LoaderSpinner from '../../../components/ui/LoaderSpinner';
import BasicInput from '../../../components/input/BasicInput';
import registerValidationSchema from '../../../utils/validationSchemas/registerValidationSchema';

const RegisterForm = ({ onSubmit, loading }) => {
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
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
            <BasicInput 
              title='Nombre'
              name='firstName'
              type='text'
              errors={errors}
              status={status}
              value={values.firstName}
              touched={touched.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              setStatus={setStatus}
            />
            <BasicInput 
              title='Apellido'
              name='lastName'
              type='text'
              errors={errors}
              status={status}
              value={values.lastName}
              touched={touched.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              setStatus={setStatus}
            />
            <button 
              disabled={loading}
              type='submit' 
              className='btn btn-primary btn-block todo-register__button'
            >
              {!loading ? 'Registrate' : <LoaderSpinner width={20} height={20} color='white' /> }
            </button>
          </Form>
        )
      }
    </Formik>
  );
};

export default RegisterForm;
