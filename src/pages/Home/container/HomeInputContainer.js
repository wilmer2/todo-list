import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import parseError from '../../../utils/parseError';
import HomeInput from '../components/HomeInput';

const ADD_TASK = gql`
  mutation ADDTask($data:  TaskCreateInput!) {
    taskCreate(data: $data) {
      id
      completed
      name
      user {
        id
        email
      }
    }
  }
`;

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

const HomeInputContainer = ({ currentUser }) => {
  const [taskName, setTaskName] = useState('');

  const [addTask, { loading, error }] = useMutation(ADD_TASK, {
    update(cache, { data: { taskCreate: task} }) {
      const tasks = cache.readQuery({ query: GET_TASKS });
      const addingTask = [...tasks.tasksList.items, task] ;

      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasksList: {
            items: addingTask,
            __typename:  tasks.tasksList.__typename,
          },
        }
      });      
    }
  });

  const handleSubmitAddTask = async taskName => {
    const data = { name: taskName, user: { connect: { id: currentUser.id } } };
    
    try {
      await addTask({ variables: { data }});
      setTaskName('');
    } catch (error) {
      const parsedError = parseError(error);

      toast.error(parsedError.validationMessageError);
    }
  };

  const handleChangeTaskName = e => setTaskName(e.target.value);
  
  return (
    <HomeInput 
      onSubmitAddTask={handleSubmitAddTask}
      onChangeTaskName={handleChangeTaskName}
      taskName={taskName}
      loading={loading}
    />
  );
};

export default HomeInputContainer;
