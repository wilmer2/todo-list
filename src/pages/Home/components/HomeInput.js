import React from 'react';
import AddTaskButton from './AddTaskButton';

const HomeInput = ({
  onChangeTaskName,
  taskName,
  onSubmitAddTask,
  loading
}) => {

  const handleOnSubmit = e => {
    e.preventDefault();

    if (taskName) 
      onSubmitAddTask(taskName);
  };
 
  return (
    <div className='todo-home__input-container'>
      <form className='d-flex mt-2' onSubmit={handleOnSubmit}>
        <input 
          className='todo-home__input form-control' 
          type='text' 
          placeholder='Nueva tarea'
          disabled={loading}
          onChange={onChangeTaskName}
          value={taskName}
        />
        <AddTaskButton loading={loading} />
      </form>
    </div>
  );  
}

export default HomeInput;
