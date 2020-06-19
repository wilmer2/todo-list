import React from 'react';
import HomeTaskList from './HomeTaskList';
import HomeInputContainer from '../container/HomeInputContainer';

const HomeView = ({ 
  tasks,
  users,
  currentUser
 }) => (
  <div className='todo-home__main-container'>
    <div className='container'>
      <div className='todo-home__container'>
        <h1 className='text-center mt-5'>Tareas</h1>
        <HomeInputContainer currentUser={currentUser} />
        <HomeTaskList tasks={tasks} users={users} />
      </div>
    </div>
  </div>
);

export default HomeView;
