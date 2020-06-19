import React from 'react';
import loginLogo from '../../../images/login-logo.jpeg';

const LoginLogo = () => (
  <div className='todo-login__img-overlap-container'>
    <figure className='todo-login__img-container'>
      <img  className='todo-login__img' src={loginLogo} alt='login logo' />
    </figure>
  </div>
);

export default LoginLogo;
