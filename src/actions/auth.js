import { notification, timerNotification } from '../helpers/alert';
import {
  fetchWithoutToken,
  fetchWithToken,
  fetchToken,
} from '../helpers/fetch';
import { types } from '../types/types';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';

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
    notification( 'ERROR AL INICIAR SESIÓN', 'CREDENCIALES INVALIDAS', 'error');
    }
  };
};

export const LogOut = () =>{
  return async dispatch => {
    localStorage.clear();
    dispatch(
      logout()
    );
    timerNotification('Cerrando de Sesion!');
    window.location.reload();
  }
}

// export const StartDni = (numeroDocumento, codigoVerificacion, fechaNacimiento) => {
//   return async( dispatch ) =>{
//     const response = await fetchServicioDni(`dni?numeroDocumento=${ numeroDocumento }&codigoVerificacion=${ codigoVerificacion }&fechaNacimiento=${ fechaNacimiento }`);
//     const body = await response.json();
//     // console.log(body[0]);
//     if (!!body[0]) {
//       timerNotification('Validacion correcta');
//       dispatch(validadorUsuario(body[0]));
//     } else {
//       notification('ERROR DE VALIDACIÓN', 'Los datos ingresados nos son validos', 'error');
//       Error();
//     }
//   }
// }

export const StartDni = (numeroDocumento, codigoVerificacion, fechaNacimiento) => {
  return async (dispatch) =>{
   await fetch(`http://172.28.206.57:8080/SIJ/Reniec/${numeroDocumento}`, { method:'POST' })
   .then(res =>  res.json())
   .then(data => {
    const stringToDate = (_date, _format, _delimiter) => {
      var formatLowerCase = _format.toLowerCase();
      var formatItems = formatLowerCase.split(_delimiter);
      var dateItems = _date.split(_delimiter);
      var monthIndex = formatItems.indexOf("mm");
      var dayIndex = formatItems.indexOf("dd");
      var yearIndex = formatItems.indexOf("yyyy");
      var month = parseInt(dateItems[monthIndex]);
      month -= 1;
      var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
      return formatedDate;
    }
    var fechax = Moment(new Date(stringToDate(data[28], "dd/MM/yyyy", "/"))).format('yyyy-MM-DD')
      if ((data[0] === numeroDocumento) && (data[1] === codigoVerificacion) && (fechax === fechaNacimiento)) {
        timerNotification('Validacion correcta');
        dispatch(validadorUsuario({
          dni: data[0],
          nombres: data[5],
          apellidos: data[3] + ' ' + data[4],
          fechaNacimiento: data[28],
          sexo: data[17],
        })).then(() => {
          Sigte()
        })
      } else {
        notification('Error los datos ingresados nos son validos', '', 'error');
        Error();
      }
    });
  }
}

export const validadorUsuarioCreado = async (dni) => {
    const response = await fetchToken('personas/dni/'+ dni);
    console.log(response.status)
    if( response.status === 200 || response.status === 201){
      notification('Error, este usuario ya esta registrado en el sistema', '', 'error');
      return false;
    }
    else if (response.status === 404 || response.status === 500 || response.status === 403) {
      return true;
    }else{
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

const Error = () => {
  const history = useHistory();
  return history.push('/auth/register');
}

const Sigte = () => {
  const history = useHistory();
  return history.push('/auth/register/validate');
}

export const validadorUsuario = usuario => ({
  type: types.eventLoadedUsuarioValidadorDni,
  payload: usuario,
});