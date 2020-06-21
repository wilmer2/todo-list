import React from 'react';
import { Link } from 'react-router-dom';

const LoginLinks = ({ isDisabled }) => (
  <div className='todo-login__link-container d-flex justify-content-between align-items-center'>
    <div>Aún no tienes cuenta?</div>
    <Link to='/register' className={`${isDisabled ? 'todo__disabled' : ''}`}>regístrate</Link>

  </div>
);

export default LoginLinks;
