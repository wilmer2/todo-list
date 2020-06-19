import React from 'react';
import LoaderSpinner from '../../../components/ui/LoaderSpinner';

const AddTaskButton = ({ loading }) => (
  <button 
    type='submit' 
    className='btn btn-primary btn-sm ml-2'
    disabled={loading}
  >
    {!loading ? 'Agregar' : <LoaderSpinner 
      height='20' 
      width='50' 
      color='white'
    />}
  </button>
);

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
