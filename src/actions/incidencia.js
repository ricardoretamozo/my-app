import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getIncidencia } from '../components/ui/incidencia/incidencia';
import { getIncidenciaNoAsignadas, getIncidenciaAsignadas } from '../components/ui/incidencia/asistente/incidencia';

// CREATE PERSONA

export const createIncidencia = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `incidencias/usuariocomun`,
      {
        descripcion: data.descripcion,
        estado: data.estado,
        persona: { idpersona: data.persona.idpersona},
        persona_registro: { idpersona: data.persona_registro.idpersona},
        motivo: data.motivo,
        origen: data.origen,
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

export const asignarIncidencia = (id, data) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/asignacion/${id}`,
      {
        idpersona: data
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      notification('Incidencia asignada correctamente.', body.message, 'success');
    }
    else {
      notification('No se pudo asignar la Incidencia', body.message, 'error');
    }
  };
};

// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRÁMITE
export const incidenciaEnTramite = (id) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/tramite/${id}`,'', 'PUT');
    const body = await response.json();
    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      notification('Incidencia actualizada correctamente.', body.message, 'success');
    }
    else {
      notification('No se pudo actualizar el estado de la Incidencia', body.message, 'error');
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
        origen: incidencia.origen,
    });
  });
  Incidencia.data = data;
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
        origen: incidencia.origen,
    });
  });
  Incidencia.data = data;
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
        origen: body.origen
      };
    // Incidencia.data = data;
    // set user info
    return Incidencia;
};

// MOSTRAR INCIDENCIAS ASIGNADAS

export const fetchIncidenciasAsignadas = async () => {
  const response = await fetchToken('incidencias/persona/asignados');
  const body = await response.json();
  const IncidenciaAsignados = {};
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
        origen: incidencia.origen,
    });
  });
  IncidenciaAsignados.data = data;
  // set user info
  return IncidenciaAsignados;
};

// MOSTRAR INCIDENCIAS NO ASIGNADAS

export const fetchIncidenciasNoAsignadas = async () => {
  const response = await fetchToken('incidencias/persona/noasignados');
  const body = await response.json();
  const IncidenciaNoAsignados = {};
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
        origen: incidencia.origen,
    });
  });
  IncidenciaNoAsignados.data = data;
  // set user info
  return IncidenciaNoAsignados;
};


//LISTAR INCIDENCIAS ASIGNADOS AL USUARIO

export const fetchIncidenciaSoporte = async (id) => {
  const response = await fetchToken(`incidencias/persona/asignado/${id}`);
  const body = await response.json();
  console.log(body);
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
        origen: incidencia.origen,
    });
  });
  Incidencia.data = data;
  // set user info
  return Incidencia;
};


// DELETE 

export const deleteIncidencia = id => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/${id}`, '', 'DELETE');
    const body = await response.json();

    if (response.status === 200) {
        dispatch(getIncidencia(await loadIncidencias()));
        notification('Incidencia eliminado correctamente', body.message, 'success');
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
          origen: incidencia.origen,
      });
    });
    Incidencia.data = data;
    // set user info
  
    return Incidencia;
  };


  // MOSTRAR TECNICOS DISPONIBLES

export const fetchTecnicosDisponibles = async () => {
  const response = await fetchToken('tecnico/disponibilidad');
  const body = await response.json();
  const TecnicosDisponibles = {};
  const data = [];
  body.forEach(tecnico => {
    data.push({
      idHistorialPersona: tecnico.idHistorialPersona,
      persona: tecnico.persona,
      estado: tecnico.activo,
    });
  });
  TecnicosDisponibles.data = data;
  // set user info
  return TecnicosDisponibles;
};

// BUSCAR POR DNI

  export const buscarUsuarioDni = async (dni) => {
    const response = await fetchToken(`personas/dni/${dni}`);
    const body = await response.json();
    const PersonasDni = {
      idpersona: body.idpersona,
      nombre: body.nombre,
      apellido: body.apellido,
      dni: body.dni,
      oficina: body.oficina
    };
    // PersonasDni.data = data;
    // set user info
    return PersonasDni;
  }