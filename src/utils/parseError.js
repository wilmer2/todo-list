import hasIn from 'lodash/hasIn';
import has from 'lodash/has';

const VALIDATION_ERROR = 'ValidationError';
const BAD_CREDENTIAL_MESSAGE = 'Incorrect email or password';

const getValidationErrorFormat = fields => (
  Object.keys(fields).reduce((validationFieldError, fieldKey) => ({
    ...validationFieldError,
    [fieldKey]: fields[fieldKey],
  }), {})
);

const parseError = errors => {
  let validationInputError = {};
  let validationMessageError = '';

  if (errors.networkError) {
    validationMessageError = errors.networkError.message;
  }

  if (errors.graphQLErrors) {
    errors.graphQLErrors.forEach(error => {
      validationMessageError = error.message;
      
      if ((hasIn(error, ['details', 'password'])) && 
        (error.details.password === BAD_CREDENTIAL_MESSAGE)
      ) {
        validationMessageError = BAD_CREDENTIAL_MESSAGE;
        return;
      }
  
      if (has(error, 'code') && error.code === VALIDATION_ERROR) {
        validationInputError = getValidationErrorFormat(error.details);
      }
    });
  }

  if (errors.error) {
    validationMessageError =  errors.error.message;
  }

  return {
    validationInputError,
    validationMessageError,
  };
};

export default parseError;
