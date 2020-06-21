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

export default AddTaskButton;
