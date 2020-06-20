import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import parseError from '../../../utils/parseError';
import guestUserEnhancer from '../../../components/hoc/GuestUserEnhancer';
import RegisterView from '../components/RegisterView';

const SAVE_USER = gql`
  mutation SaveUser($user:  UserCreateInput!, $password: String!, $authProfileId: ID) {
    userSignUpWithPassword(user: $user, password: $password, authProfileId: $authProfileId ) {
      email
    }
  }
`;

const RegisterContainer = () => {
  const [saveUser, { loading, data }] = useMutation(SAVE_USER);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnSubmit = async (values, { setStatus }) => {
    setErrorMessage('');

    const data = { 
      authProfileId:  '{authprofile-id}',
      user: {...omit(values, ['password']) },
      password: values.password,
    };

    try {
      await saveUser({ variables:  { user: data.user, password: data.password, 
        authProfileId: data.authProfileId
      } });
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
    <RegisterView 
      loading={loading}
      errorMessage={errorMessage}
      data={data}
      onSubmit={handleOnSubmit}
    />
  );
};

export default guestUserEnhancer(RegisterContainer);
