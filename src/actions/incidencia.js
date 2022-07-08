import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getIncidencia } from '../components/ui/incidencia/incidencia';

// CREATE PERSONA

export const createIncidencia = data => {
  return async dispatch => {
    const response = await fetchToken(
      `incidencias`,
      {
        descripcion: data.descripcion,
        fecha: data.fecha,
        estado: data.estado,
        ip: data.ip,
        persona: { idpersona: data.persona.idpersona},
        persona_registro: { idpersona: data.persona_registro.idpersona},
        persona_asignado: { idpersona: data.persona_asignado.idpersona},
        oficina: { idOficina: data.oficina.idOficina},
        motivo: {idMotivo: data.motivo.idMotivo},
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidencia(await loadIncidencias()));
      notification('Incidencia registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar la Incidencia', body.message, 'error');
    }
  };
};


export const fetchIncidencias = async () => {
  const response = await fetchToken('incidencias');
  const body = await response.json();
  const Incidencia = {};
  const data = [];

  body.forEach(incidencia => {
    data.push({
        idIncidencia: incidencia.idIncidencia,
        descripcion: incidencia.descripcion,
        estado: incidencia.estado,
        fecha: incidencia.fecha,
        ip: incidencia.ip,
        persona: incidencia.persona,
        persona_registro: incidencia.persona_registro,
        persona_asignado: incidencia.persona_asignado,
        oficina: incidencia.oficina,
        motivo: incidencia.motivo,
    });
  });
  Incidencia.data = data;
  // set user info
  return Incidencia;
};


// DELETE / DISABLED ORGANO

export const deleteIncidencia = id => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/${id}`, '', 'DELETE');
    const body = await response.json();

    if (response.status === 200) {
        dispatch(getIncidencia(await loadIncidencias()));
        notification('Incidencia actualizado correctamente', body.message, 'success');
    } else {
        notification('No se pudo eliminar la incidencia', body.detalles, 'error');
    }
  };
};

// Refrescar la tabla

export const loadIncidencias = async () => {
    const response = await fetchToken('incidencias');
    const body = await response.json();
    const Incidencia = {};
    const data = [];
  
    body.forEach(incidencia => {
      data.push({
          idIncidencia: incidencia.idIncidencia,
          descripcion: incidencia.descripcion,
          estado: incidencia.estado,
          fecha: incidencia.fecha,
          ip: incidencia.ip,
          persona: incidencia.persona,
          persona_registro: incidencia.persona_registro,
          persona_asignado: incidencia.persona_asignado,
          oficina: incidencia.oficina,
          motivo: incidencia.motivo,
      });
    });
    Incidencia.data = data;
    // set user info
  
    return Incidencia;
  };