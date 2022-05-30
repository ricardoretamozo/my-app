import { notification, timerNotification } from '../helpers/alert';
import {
  fetchWithoutToken,
  fetchWithToken,
  fetchServicioDni,
} from '../helpers/fetch';
import { types } from '../types/types';

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

      dispatch(
        login({
          access_token: body.access_token,
          refresh_token: body.refresh_token,
        })
      );

      timerNotification('Inicio de Sesion Exitoso!');
    } else {
      notification('ERROR', body.error, 'error');
    }
  };
};

export async function startDni(numeroDocumento, ubigeo ,apellidoMaterno) {

    const response = await fetchServicioDni(`dni?numeroDocumento=${ numeroDocumento }&ubigeo=${ ubigeo }&apellidoMaterno=${ apellidoMaterno }`);
    const body = await response.json();
    console.log(!!body[0]);
    if (!!body[0]) {   
      timerNotification('Validacion correcta');   
    } else {
      notification('ERROR', body.error, 'error');
    }

    return body;

};

export const startChecking = () => {
  return async dispatch => {
    const response = await fetchWithToken('refreshtoken');
    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      // set user info
      localStorage.setItem('access_token', body.access_token);
      localStorage.setItem('refresh_token', body.refresh_token);

      dispatch(
        login({
          access_token: body.access_token,
          refresh_token: body.refresh_token,
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
