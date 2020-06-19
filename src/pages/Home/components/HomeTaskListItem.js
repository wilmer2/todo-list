import React from 'react';
import HomeTaskListItemAvatar from './HomeTaskListItemAvatar';

const HomeListItemActions = ({ completed, onChangeComplete, onDeleteTask }) => (
  <div className='todo-home__task-item-actions'>
    <input 
      type='checkbox'
      checked={completed} 
      onChange={onChangeComplete} 
    />
    <i 
      onClick={onDeleteTask}
      className='todo-icon-delete-24px ml-2 text-danger todo-home__task-item-delete' 
    />
  </div>
);

const HomeTaskListItemName = ({ task }) => (
  <div 
    className={`todo-home__task-item-name ${task.completed ? 'todo-home__task-item-name--completed' : ''} `}
  >
    {task.name}
  </div>
);

const HomeTaskListItem = ({ 
  task,
  users, 
  onChangeComplete,
  onChangeUser, 
  loading,
  onDeleteTask 
}) => (
  <div className='todo-home__task-item d-flex justify-content-between align-items-center'>
      <div 
        className={`todo-home__task-item-overlay ${loading ? 'todo-home__task-item-overlay--active': ''}`} 
      />
      <HomeTaskListItemAvatar 
        users={users}
        task={task}
        onChangeUser={onChangeUser}
      />
      <HomeTaskListItemName  
        task={task} 
      />
      <HomeListItemActions 
        completed={task.completed} 
        onChangeComplete={onChangeComplete}
        onDeleteTask={onDeleteTask}
      />
  </div>
);

export default HomeTaskListItem;
