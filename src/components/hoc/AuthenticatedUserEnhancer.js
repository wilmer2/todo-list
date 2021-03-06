import React, { useEffect, useState } from 'react';
import simpleCompose from '../../utils/simpleCompose';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import LoaderSpinner from '../ui/LoaderSpinner';

const REFRESH_TOKEN = gql`
  mutation ADDTask($data:  RefreshTokenInput!) {
    userRefreshToken(data: $data) {
      idToken
      refreshToken
    }
  }
`;

const authenticatedUser = WrappedComponent => props => {
  const{ history } = props;

  const [loading, setLoading] = useState(true);
  const [setRefreshToken, { data, error }] = useMutation(REFRESH_TOKEN);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      history.push('/');
      return;
    }

    const refreshToken = localStorage.getItem('refreshToken');
    const data = { refreshToken: refreshToken };

    setRefreshToken(({ variables: { data }})); 

    const intervalId = setInterval(() => {
      const refreshToken = localStorage.getItem('refreshToken');
      const data = { refreshToken };
      
      setRefreshToken(({ variables: { data }})); 
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
    
  }, [history, setRefreshToken]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }

    if (data) {
      localStorage.setItem('token', data.userRefreshToken.idToken);
      localStorage.setItem('refreshToken', data.userRefreshToken.refreshToken);
    }
  }, [data, loading, setLoading]);

  useEffect(() => {
    if (error) {
      localStorage.clear();
      history.push('/');
    }
  }, [error, history])

  if (error) return null;
  
  if (loading) return (
    <div id='auth-spinner' className='todo__wrapper d-flex justify-content-center align-items-center'>
      <LoaderSpinner />
    </div>
  );
  
  return  <WrappedComponent {...props} />;
}

const enhancer = simpleCompose(
  withRouter,
  authenticatedUser
);

export default enhancer;
