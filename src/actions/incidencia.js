import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getIncidencia } from '../components/ui/incidencia/incidencia';
import { getIncidenciaId } from '../components/ui/incidencia/incidencia';
import { useSelector, useDispatch } from 'react-redux';
// CREATE PERSONA

export const createIncidencia = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `incidencias/usuariocomun`,
      {
        descripcion: data.descripcion,
        fecha: data.fecha,
        estado: data.estado,
        persona: { idpersona: data.persona.idpersona},
        persona_registro: { idpersona: data.persona_registro.idpersona},
        persona_asignado: { idpersona: data.persona_asignado.idpersona},
        motivo: data.motivo,
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
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

export const fetchIncidenciasPersonas = async (id) => {
  const response = await fetchToken('incidencias/persona/' + id);
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

//LISTAR INCIDENCIA POR ID

export const fetchIncidencia = async (id) => {
    const response = await fetchToken('incidencias/persona/detalles/' + id);
    const body = await response.json();
    const Incidencia = {
        idIncidencia: body.idIncidencia,
        descripcion: body.descripcion,
        estado: body.estado,
        fecha: body.fecha,
        ip: body.ip,
        persona: body.persona,
        persona_registro: body.persona_registro,
        persona_asignado: body.persona_asignado,
        oficina: body.oficina,
        motivo: body.motivo,
      };
    // Incidencia.data = data;
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

export const loadIncidencias = async (id) => {
    const response = await fetchToken('incidencias/personas/' + id);
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