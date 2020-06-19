import React from 'react';
import LoginLinks from './LoginLinks';
import LoginLogo from './LoginLogo';
import LoginForm from './LoginForm';
import ErrorGeneral from '../../../components/ui/ErrorGeneral';
import isEmpty from 'lodash/isEmpty';

const LoginView = ({ onSubmit, loading, errorMessage }) => (
  <section className='todo__wrapper'>
    <div className='todo-login__form-main-wrapper'>
      <div className='container'>
        <div className='position-relative'>
          <LoginLogo />
          <div className='todo-login__form-wrapper'>
            {!isEmpty(errorMessage) && <ErrorGeneral errorMessage={errorMessage} />}
            <LoginForm  onSubmit={onSubmit} loading={loading} />
            <LoginLinks />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LoginView;
