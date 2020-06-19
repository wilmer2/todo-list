import React from 'react';

const ErrorInput = ({ errorMessage }) => (
  <div className="text-danger pt-1  ">
    {errorMessage}
  </div>
);

export default ErrorInput;
