import React from 'react';
import ErrorInput from '../ui/ErrorInput';
import omit from 'lodash/omit';

const BasicInput = ({
  name,
  type,
  onBlur,
  onChange,
  setStatus,
  errors,
  status,
  touched,
  value,
  title
}) => {
  const errorMessage = (status && status[name]) || (errors[name]);
  const hasError = () => (status && status[name]) || (errors[name] && touched);

  const handleOnChange = e => {
    if (status && status[name]) {
      const newStatus = omit(status, [name]);

      setStatus(newStatus); 
    }

    onChange(e);
  };
  
  return (
    <div className='form-group'>
      <label htmlFor={name}>{title}</label>
      <input 
        className={`form-control ${errors[name] && touched ? 'todo__input-error' : ''}`}
        type={type} 
        id={name} 
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={handleOnChange}
      />
      {hasError() && <ErrorInput errorMessage={errorMessage} />}
    </div>
  )
}

BasicInput.defaultProps = {
  type: 'text',
};

export default BasicInput;
