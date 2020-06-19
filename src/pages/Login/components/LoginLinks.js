import React from 'react';
import { Link } from 'react-router-dom';

const LoginLinks = () => (
  <div className='todo-login__link-container d-flex justify-content-between align-items-center'>
    <div>Aún no tienes cuenta?</div>
    <Link to='/register'>registrate</Link>

  </div>
);

export default LoginLinks;
