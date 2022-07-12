import { notification, timerNotification } from '../helpers/alert';
import {
  fetchWithoutToken,
  fetchWithToken,
  fetchServicioDni,
} from '../helpers/fetch';
import { types } from '../types/types';
import { Link, useHistory } from 'react-router-dom';

export const startLogin = (dni, password) => {
  return async dispatch => {
    const response = await fetchWithoutToken(
      'login',
      { dni, password },
      'POST'
    );
    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      // set user info
      localStorage.setItem('access_token', body.access_token);
      localStorage.setItem('refresh_token', body.refresh_token);
      localStorage.setItem('name', body.name);
      localStorage.setItem('rol', body.rol);
      localStorage.setItem('identificador', body.identificador);

      dispatch(
        login({
          access_token: body.access_token,
          refresh_token: body.refresh_token,
          name: body.name,
          rol: body.rol,
          identificador: body.identificador,
        })
      );
      timerNotification('Inicio de Sesion Exitoso!');
    } else {
    notification( body.mensaje, 'El nombre de usuario o contraseña es incorrecto', 'error');
    }
  };
};

export const LogOut = () =>{
  return async dispatch => {
    localStorage.clear();
    dispatch(
      logout()
    );
  }
}

export const StartDni = (numeroDocumento, codigoVerificacion, fechaNacimiento) => {
  return async( dispatch ) =>{
    const response = await fetchServicioDni(`dni?numeroDocumento=${ numeroDocumento }&codigoVerificacion=${ codigoVerificacion }&fechaNacimiento=${ fechaNacimiento }`);
    const body = await response.json();
    // console.log(body[0]);
    if (!!body[0]) {
      timerNotification('Validacion correcta');
      dispatch(validadorUsuario(body[0]));
    } else {
      notification('ERROR DE VALIDACIÓN', body.error, 'error');
      Error();
    }
  }
}

export const startChecking = () => {
  return async dispatch => {
    const response = await fetchWithToken('refreshtoken');
    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      // set user info
      localStorage.setItem('access_token', body.access_token);
      localStorage.setItem('refresh_token', body.refresh_token);
      localStorage.setItem('name', body.name);
      localStorage.setItem('rol', body.rol);
      localStorage.setItem('identificador', body.identificador);

      dispatch(
        login({
          access_token: body.access_token,
          refresh_token: body.refresh_token,
          name: body.name,
          rol: body.rol,
          identificador: body.identificador,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = user => ({
  type: types.login,
  payload: user,
});

const logout = () => ({
  type: types.logout,
});

const Error = () => {
  const history = useHistory();
  return history.push('/auth/register');
}

export const validadorUsuario = usuario => ({
  type: types.eventLoadedUsuarioValidadorDni,
  payload: usuario,
});