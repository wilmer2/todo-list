import React from 'react';
import HomeTaskListItemContainer from '../container/HomeTaskListItemContainer';

const HomeTaskList = ({ tasks, users }) => (
  <div className='todo-home__task-list mt-2'>    
    {tasks.tasksList.items.map(task => (
      <HomeTaskListItemContainer 
        key={task.id}
        task={task}
        users={users}
      />
    ))}
  </div>
);

export default HomeTaskList;
