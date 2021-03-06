import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import HomeView from '../components/HomeView';
import ErrorGeneral from '../../../components/ui/ErrorGeneral';
import LoaderSpinner from '../../../components/ui/LoaderSpinner';
import parseError from '../../../utils/parseError';

const GET_TASKS = gql`
  query {
    tasksList {
      items {
        id
        completed
        name
        user {
          id
          email
        }
      }
    }
  }
`;

const GET_USERS = gql`
  query {
    usersList {
      items {
        email
        id
      }
    }
  }
`;

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

const HomeLoading = () => (
  <div className='text-center mt-5'>
    <LoaderSpinner />
  </div>
);

const HomeError = ({ error }) => {
  const parsedError = parseError(error);
  
  return (
    <div className='todo__main-box'>
      <div className='container'>
        <ErrorGeneral errorMessage={parsedError.validationMessageError} />
      </div>
    </div>
  )
};

const HomeContainer = () => {
  const email = localStorage.getItem('email');
  const { loading: loadingTask, error: errorTask, data: tasks } = useQuery(GET_TASKS);
  const { loading: loadingUser, error: errorUser, data: users } = useQuery(GET_USERS);
  const { loading: loadingCurrentUser, error: errorCurrentUser, data } = useQuery(GET_CURRENTE_USER, {
    variables: { email }
  });

  const loading = loadingTask || loadingUser || loadingCurrentUser;
  const error = errorTask || errorUser || errorCurrentUser;

  if (error) return <HomeError error={error}  />
  if (loading) return <HomeLoading />

  return (
    <HomeView 
      tasks={tasks} 
      users={users}
      currentUser={data.user}
    />
  );
};

export default HomeContainer;
