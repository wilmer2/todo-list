import hasIn from 'lodash/hasIn';
import has from 'lodash/has';
import I18n from 'i18n-js';

const VALIDATION_ERROR = 'ValidationError';
const BAD_CREDENTIAL_MESSAGE = 'Incorrect email or password';
const THORTTLING_ERROR = 'ThrottlingThresholdReachedError';

const getValidationErrorFormat = fields => {
  return Object.keys(fields).reduce((validationFieldError, fieldKey) => ({
    ...validationFieldError,
    [fieldKey]: I18n.t(`fromServer.${fields[fieldKey]}`),
  }), {});
};

const parseError = errors => {
  let validationInputError = {};
  let validationMessageError = 'Ha ocurrido un error, vuelve a intentarlo';

  if (errors.networkError) {
    validationMessageError = I18n.t(`fromServer.${errors.networkError.message}`);
  }

  if (errors.graphQLErrors) {
    errors.graphQLErrors.forEach(error => {
      validationMessageError = I18n.t(`fromServer.${error.message}`);
      
      if ((hasIn(error, ['details', 'password'])) && 
        (error.details.password === BAD_CREDENTIAL_MESSAGE)
      ) {
        validationMessageError = I18n.t(`fromServer.${BAD_CREDENTIAL_MESSAGE}`);
        return;
      }
  
      if (has(error, 'code') && error.code === VALIDATION_ERROR) {
        validationInputError = getValidationErrorFormat(error.details);
      }

      if (has(error, 'code') && error.code === THORTTLING_ERROR) {
        validationMessageError = I18n.t(`fromServer.${THORTTLING_ERROR}`); 
      }
    });
  }

  return {
    validationInputError,
    validationMessageError,
  };
};

export default parseError;
