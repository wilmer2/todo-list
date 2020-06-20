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

  },
};