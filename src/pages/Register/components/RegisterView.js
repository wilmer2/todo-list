import React from 'react';
import isEmpty from 'lodash/isEmpty';
import RegisterForm from './RegisterForm';
import RegisterLinks from './RegisterLinks';
import ErrorGeneral from '../../../components/ui/ErrorGeneral';

const RegisterView = ({ onSubmit, loading, errorMessage}) => (
  <section className='todo__wrapper'>
    <div className='todo-register__form-main-wrapper'>
      <div className='container'>
        <div className='position-relative'>
          <div className='todo-register__form-wrapper'>
            <h2 className='mb-3'>Registrate</h2>
            {!isEmpty(errorMessage) && <ErrorGeneral errorMessage={errorMessage} />}
            <RegisterForm  onSubmit={onSubmit} loading={loading} />
            <RegisterLinks />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default RegisterView;
