import serverMessage from './serverMessage';

export default {
  keys: {
    firstName: 'nombre',
    lastName: 'apellido',
    email: 'correo electrónico',
    password: 'contraseña',
  },
  fromServer: {
    [serverMessage.EMAIL_REQUIRED]: 'Ingresa correo electrónico',
    [serverMessage.PASSWORD_REQUIRED]: 'Ingresa contraseña',
    [serverMessage.CREDENTIAL_BAD]: 'Correo o contraseña incorrectos',
    [serverMessage.FAILED_FETCH]: 'No se pudo establecer conexión, verifica si tienes internet',
    [serverMessage.INVALID_TOKEN]: 'Vuelve a conectarte',
    [serverMessage.LIMIT_REQUEST_TIME]: 'Ha superado limite de solicitudes, espere 120 segundos, esto debido a su plan',
    [serverMessage.AUTH_PROFILE_ID_NOT_FOUND]: 'Debes registrar un authProfileId, cambia a un plan pago',
  },
  validationInput: {
    isEmail: 'Ingrese  %{key}  válido',
    isRequired: 'Ingrese %{key}',
  },
};