import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import parseError from '../../../utils/parseError';
import guestUserEnhancer from '../../../components/hoc/GuestUserEnhancer';
import LoginView from '../components/LoginView';

const SEND_CREDENTIALS = gql`
  mutation Login($data: UserLoginInput!) {
    userLogin(data: $data) {
      auth {
        idToken
        refreshToken
      }
    }
  }
`;

const FIND_USER_BY_EMAIL = gql`
  query FindUserByEmail($email: String) {
    user(email: $email) {
      id
    }
  }
`;


const LoginContainer = ({ history }) => {
  const [findUserByEmail, { data: user, error: errorUser }] = useLazyQuery(FIND_USER_BY_EMAIL);
  const [sendCredentials, { loading }] = useMutation(SEND_CREDENTIALS);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnSubmit = async (values, { setStatus }) => {
    setErrorMessage('');

    try {
      const { data: { userLogin } } = await sendCredentials({ variables: { data: {...values } } });
      
      await localStorage.setItem('token', userLogin.auth.idToken);
      await localStorage.setItem('refreshToken', userLogin.auth.refreshToken);
      await localStorage.setItem('email', values.email);
      await findUserByEmail({ variables: { email: values.email }});
      
    } catch(error) {
      const parsedError = parseError(error);

      if (!isEmpty(parsedError.validationInputError)) {
        setStatus(parsedError.validationInputError);
      } else {
        setErrorMessage(parsedError.validationMessageError);
      }
    }
  }

  useEffect(() => {
    if (errorUser) {
      localStorage.clear();
      setErrorMessage('Correo o contraseña incorrectos');
    }
  }, [errorUser, setErrorMessage, localStorage]);

  useEffect(() => {
    if (user) {
      history.push('/home');
    }
  }, [user, history]);

  return (
    <LoginView onSubmit={handleOnSubmit} errorMessage={errorMessage}  loading={loading} />
  );
};

export default guestUserEnhancer(LoginContainer);
