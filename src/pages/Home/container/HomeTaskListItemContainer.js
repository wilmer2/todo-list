import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import omit from 'lodash/omit';
import { toast } from 'react-toastify';
import api from '../../../api';
import parseError from '../../../utils/parseError';
import HomeTaskListItem from '../components/HomeTaskListItem';

const UPDATE_TASK = gql`
  mutation UpdateTask($data: TaskUpdateInput!) {
    taskUpdate(data: $data) {
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

const DELETE_TASK = gql`
  mutation DeleteTask($data: TaskDeleteInput!) {
    taskDelete(data: $data) {
      success
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

const HomeTaskListItemContainer = ({ task, users }) => {
  const client = useApolloClient();
  const [taskDoneLoading, setTaskDoneLoading] = useState(false);

  const [updateTask, { loading: loadingUpdate }] = useMutation(UPDATE_TASK);
  const [deleteTask, { loading: loadingDelete}] = useMutation(DELETE_TASK, {
    update(cache, { data: { taskDelete }}) {
      if (taskDelete && taskDelete.success) {
        const tasks = cache.readQuery({ query: GET_TASKS });
        const removedTask = tasks.tasksList.items.filter(taskItem => taskItem.id !== task.id);

        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasksList: {
              items: removedTask,
              __typename: tasks.tasksList.__typename,
            },
          }
        });
      }
    }
  });

  const handleDeleteTask = async () => { 
    try {
      await deleteTask({ variables: { data: { id: task.id }}});
    } catch(error) {
      const parsedError = parseError(error);

      toast.error(parsedError.validationMessageError);
    }

  };

  const handleChangeComplete = async () => {
    const data = {  
      ...omit(task, ['__typename', 'user']),
      completed: !task.completed, 
    };

    if (task.completed) {
      uncheckTask(data);
    } else {
      checkTask(data);
    }
  };

  const checkTask = async data => {
    setTaskDoneLoading(true);
    try {
      const token = await localStorage.getItem('token');
      const response = await api.taskDone({ task: data, token });

      if (response.data && response.data.errors) {
        const parsedError = parseError(response.data.errors);

        toast.error(parsedError.validationMessageError);
      } else {
        const taskUpdated = response.data.taskUpdate;
        const currentTasksList = client.readQuery({ query: GET_TASKS });
        const taskItems = currentTasksList.tasksList.items.map(task => (
          task.id === taskUpdated.id ?  { ...taskUpdated,
            __typename: 'Task',
            user: {
              ...taskUpdated.user,
              __typename: 'User',
            }
          } : task
        ));
        
        client.writeQuery({
          query: GET_TASKS,
          data: {
            tasksList: {
              items: taskItems,
              __typename: currentTasksList.tasksList.__typename,
            },
          }
        });
      }

      setTaskDoneLoading(false);
      
    } catch(error) {
      const parsedError = parseError(error);

      toast.error(parsedError.validationMessageError);
      setTaskDoneLoading(false);
    }
  };

  const uncheckTask = async data => {
    try { 
      await updateTask({ variables: { data }});
    } catch(error) {
      const parsedError = parseError(error);

      toast.error(parsedError.validationMessageError);
    }
  };

  const handleChangeUser = async userId => {
    if (task.user.id === userId) return;

    const data = {
      ...omit(task, ['__typename']),
      completed: false,
      user: {
        connect: { id: userId },
      },
    };

    try {
      await updateTask({ variables: { data }});
    } catch(error) {
      const parsedError = parseError(error);

      toast.error(parsedError.validationMessageError);
    }

  };

  const loading = loadingUpdate || loadingDelete || taskDoneLoading;
  
  return (
    <HomeTaskListItem 
      task={task} 
      users={users}
      onChangeComplete={handleChangeComplete}
      onChangeUser={handleChangeUser}
      loading={loading}
      onDeleteTask={handleDeleteTask}
    />
  );
};

export default HomeTaskListItemContainer;
