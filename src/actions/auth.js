import { notification, timerNotification } from '../helpers/alert';
import {
  fetchWithoutToken,
  fetchWithToken,
  fetchToken,
} from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (dni, password) => {
  return async dispatch => {
    try {
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
        notification('Error al Iniciar Sesión', 'Credenciales Inválidas', 'error');
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        notification('Error de conexión', 'Error al intentar conectarse a la API', 'error');
      } else {
        notification('Error', 'No se pudo encontrar el error', 'error');
      }
    }
  }
};

export const LogOut = () => {
  return async dispatch => {
    localStorage.clear();
    dispatch(
      logout()
    );
    timerNotification('Cerrando de Sesion!');
    window.location.reload();
  }
}

export const validadorUsuarioCreado = async (dni) => {
  const response = await fetchToken('personas/dni/' + dni);
  if (response.status === 200 || response.status === 201) {
    notification('Error, este usuario ya esta registrado en el sistema', '', 'error');
    return false;
  }
  else if (response.status === 404 || response.status === 500 || response.status === 403) {
    return true;
  } else {
    notification('Error, no se logró validar, intente de nuevo', '', 'error');
    return false;
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

export const validadorUsuario = usuario => ({
  type: types.eventLoadedUsuarioValidadorDni,
  payload: usuario,
});