import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
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


const LoginContainer = ({ history }) => {
  const [sendCredentials, { loading }] = useMutation(SEND_CREDENTIALS);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnSubmit = async (values, { setStatus }) => {
    setErrorMessage('');

    try {
      const { data: { userLogin } } = await sendCredentials({ variables: { data: {...values } } });
      
      localStorage.setItem('token', userLogin.auth.idToken);
      localStorage.setItem('refreshToken', userLogin.auth.refreshToken);
      localStorage.setItem('email', values.email);
      
      history.push('/home');
    } catch(error) {
      const parsedError = parseError(error);

      if (!isEmpty(parsedError.validationInputError)) {
        setStatus(parsedError.validationInputError);
      } else {
        setErrorMessage(parsedError.validationMessageError);
      }
    }
  }
  
  return (
    <LoginView onSubmit={handleOnSubmit} errorMessage={errorMessage}  loading={loading} />
  );
};

export default guestUserEnhancer(LoginContainer);
