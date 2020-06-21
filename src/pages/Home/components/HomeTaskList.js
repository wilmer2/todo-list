import React from 'react';
import HomeTaskListItemContainer from '../container/HomeTaskListItemContainer';

const HomeTaskEmptyList = () => (
  <div className='card'>
    <div className='card-body text-center'>
     Aún no has agregado tareas
    </div>
  </div>
);

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
