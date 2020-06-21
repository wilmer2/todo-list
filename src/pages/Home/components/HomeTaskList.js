import React from 'react';
import HomeTaskListItemContainer from '../container/HomeTaskListItemContainer';
import HomeTaskEmptyList from './HomeTaskEmptyList';


const HomeTaskList = ({ tasks, users }) => (
  <div className='todo-home__task-list mt-2'>    
    {!tasks.tasksList.items.length ? <HomeTaskEmptyList /> : tasks.tasksList.items.map(task => (
      <HomeTaskListItemContainer 
        key={task.id}
        task={task}
        users={users}
      />
    ))}
  </div>
);

export default HomeTaskList;
