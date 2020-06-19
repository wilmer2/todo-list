import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import LayoutWrapper from '../components/LayoutWrapper';
import authenticatedUserEnhancer from '../../components/hoc/AuthenticatedUserEnhancer'



//const [setToken, { error, data }] = useMutation(REFRESH_TOKEN);
const LayoutContainer = ({ children, history }) => {
  const client = useApolloClient();
  
  const handleOnClickLogout = () => {
    localStorage.clear();
    client.clearStore();
    history.push('/');
  };

  return (
    <LayoutWrapper 
      onClickLogout={handleOnClickLogout}
      children={children} 
    />
  );
};

export default authenticatedUserEnhancer(LayoutContainer);
