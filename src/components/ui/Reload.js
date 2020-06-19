import React from 'react';
import ErrorGeneral from './ErrorGeneral';
import parseError from '../../utils/parseError';

const Reload = ({ error, onClickReload }) => {
  const parsedError = parseError(error);
  
  return (
    <div className='todo__main-box'>
      <div className='container'>
        <ErrorGeneral errorMessage={parsedError.validationMessageError} />
       <div className='mt-2'>
          <button className='btn btn-primary' onClick={onClickReload}>Volver a intentar</button>
        </div>
      </div>
    </div>
  );
};

export default Reload;
