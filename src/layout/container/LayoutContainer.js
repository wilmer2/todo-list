import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import LoaderSpinner from '../../components/ui/LoaderSpinner';
import LayoutWrapper from '../components/LayoutWrapper';
import authenticatedUserEnhancer from '../../components/hoc/AuthenticatedUserEnhancer'



//const [setToken, { error, data }] = useMutation(REFRESH_TOKEN);

const LayoutContainer = ({ children }) => {
  return (
    <LayoutWrapper children={children} />
  );
};

export default authenticatedUserEnhancer(LayoutContainer);
