import React from 'react';

const ErrorGeneral = ({ errorMessage }) => (
  <div className="alert alert-danger mt-1" role="alert">
    {errorMessage}
  </div>
);

export default ErrorGeneral;
