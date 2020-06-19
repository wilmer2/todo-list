import React, { useState, useEffect } from 'react';
import simpleCompose from '../../utils/simpleCompose';
import { withRouter } from 'react-router-dom';
import LoaderSpinner from '../ui/LoaderSpinner';

const guestUser =  WrappedComponent => props => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      props.history.push('/home');
    } else {
      setLoading(false);
    }
  }, [token, props, setLoading]);

  if (loading) {
    return (
      <div className='todo__wrapper d-flex justify-content-center align-items-center'>
        <LoaderSpinner />
      </div>
    );
  }
  return  <WrappedComponent {...props} />;
}

const enhancer = simpleCompose(
  withRouter,
  guestUser
);

export default enhancer;
