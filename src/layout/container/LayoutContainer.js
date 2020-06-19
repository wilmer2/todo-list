import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import LayoutWrapper from '../components/LayoutWrapper';
import Reload from '../../components/ui/Reload';
import authenticatedUserEnhancer from '../../components/hoc/AuthenticatedUserEnhancer';

const GET_CURRENTE_USER = gql`
 query GetCurrentUser($email: String) {
   user(email: $email) {
     id
     email
     firstName
     lastName
   } 
 }
`;
const LayoutContainer = ({ children, history }) => {
  const client = useApolloClient();
  const email = localStorage.getItem('email');
  const { loading, error, data, refetch } = useQuery(GET_CURRENTE_USER, {
    variables: { email }
  });

  const handleOnClickReload = () => refetch();
  
  const handleOnClickLogout = () => {
    client.clearStore();

    localStorage.clear();
    history.push('/');
  };

  if (loading) return (
    <div className='d-flex justify-content-center mt-5'>
      <LoaderSpinner /> 
    </div>  
  );

  if (error) return <Reload error={error}  handleOnClickReload={handleOnClickReload} />

  return (
    <LayoutWrapper 
      onClickLogout={handleOnClickLogout}
      children={children}
      currentUser={data.user} 
    />
  );
};

export default authenticatedUserEnhancer(LayoutContainer);
