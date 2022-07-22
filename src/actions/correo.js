import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getCorreosEnviados } from '../components/ui/correo/index';

// CREATE CORREO /listall/{id}/persona/to

export const createCorreo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `correo/create`,
      {
        to: data.to,
        from: data.from,
        asunto: data.asunto,
        mensaje: data.mensaje,
        activo: data.activo,
        fecha: data.fecha,
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      notification('Correo enviado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo enviar el Correo', body.error, 'error');
    }
  };
};

// UPDATE SET ACTIVO // CORREO LEIDO

export const correoLeido = (id) => {
  return async dispatch => {
    const response = await fetchToken(
      `correo/leido/`+ id,'', 'PUT');
    if (response.status === 200) {
      console.log('correo leido')     
    } else {
      console.log('error', response.status)
    }
  };
};


// LIST CORREOS RECIBIDOS

export const fetchCorreoRecibido = async (id) => {
  const response = await fetchToken('correo/listall/' + id + '/persona/to');
  const body = await response.json();
  var CorreoRecibido = {};
  const data = [];

  body.forEach(correoRecibido => {
    data.push({
      idCorreo: correoRecibido.idCorreo,
      to: correoRecibido.to,
      from: correoRecibido.from,
      asunto: correoRecibido.asunto,
      mensaje: correoRecibido.mensaje,
      activo: correoRecibido.activo,
      fecha: correoRecibido.fecha,
    });
  });
  CorreoRecibido.data = data;
  return CorreoRecibido;
};

export const fetchCorreoEnviado = async (id) => {
  const response = await fetchToken('correo/listall/' + id + '/persona/from');
  const body = await response.json();
  var CorreoEnviado = {};
  const data = [];
  body.forEach(correoEnviado => {
    data.push({
      idCorreo: correoEnviado.idCorreo,
      to: correoEnviado.to,
      from: correoEnviado.from,
      asunto: correoEnviado.asunto,
      mensaje: correoEnviado.mensaje,
      activo: correoEnviado.activo,
      fecha: correoEnviado.fecha,
    });
  });
  CorreoEnviado.data = data;
  return CorreoEnviado;
};

export const fetchCorreoDetalles = async (id) => {
  const response = await fetchToken('correo/listall/' + id);
  const body = await response.json();
  const CorreoDetalle = {
    idCorreo: body.idCorreo,
    to: body.to,
    from: body.from,
    asunto: body.asunto,
    mensaje: body.mensaje,
    activo: body.activo,
    fecha: body.fecha,
  }
  return CorreoDetalle;
}