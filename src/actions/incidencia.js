import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getIncidencias } from '../components/ui/incidencia/incidencia';
import { getIncidenciaNoAsignadas, getIncidenciaAsignadas } from '../components/ui/incidencia/asistente/incidencia';

// CREATE PERSONA

export const createIncidencia = (data) => {
  return async dispatch => {
    var incidencia;
    if (data.historialIncidencia.persona_asignado != null){
       incidencia = {
        descripcion: data.descripcion,
        persona: { idpersona: data.persona.idpersona },
        motivo: { idMotivo: data.motivo.idMotivo },
        origen: { idOrigen: data.origen.idOrigen },
        historialIncidencia: {
          persona_registro: {
            idpersona: data.historialIncidencia.persona_registro.idpersona
          },
          persona_asignado: {
            idpersona: data.historialIncidencia.persona_asignado.idpersona
          },
        }
      }
    } else {
      incidencia = {
        descripcion: data.descripcion,
        persona: { idpersona: data.persona.idpersona },
        motivo: { idMotivo: data.motivo.idMotivo },
        origen: { idOrigen: data.origen.idOrigen },
        historialIncidencia: {
          persona_registro: {
            idpersona: data.historialIncidencia.persona_registro.idpersona
          },
        }
      }
    }
    const response = await fetchToken(`incidencias/usuariocomun`, incidencia, 'POST');
    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      dispatch(getIncidencias(await fetchIncidencias()));
      notification('Incidencia Creada', 'La incidencia ha sido creada correctamente', 'success');
      // notification((data.historialIncidencia.estado !== true ? 'Incidencia Creada, Asignada a un Técnico' : 'Incidencia Creada, Revisar si fue asignado a un Técnico'), '', 'success');
    } else {
      notification('No se pudo registrar la Incidencia', '', 'error');
    }
  };
};

export const createIncidenciaUsuario = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `incidencias/usuariocomun`,
      {
        descripcion: data.descripcion,
        persona: { idpersona: data.persona.idpersona },
        motivo: { idMotivo: data.motivo.idMotivo },
        origen: { idOrigen: data.origen.idOrigen },
        historialIncidencia: {
          persona_registro: data.historialIncidencia.persona_registro,
        }
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

// ASIGNACION DE INCIDENCIAS A SOPORTES TECNICOS

export const asignarIncidencia = (data) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/asignacion/`,
      {
        idIncidencia: data.idIncidencia,
        historialIncidencia: {
          persona_registro: {
            idpersona: data.historialIncidencia.persona_registro.idpersona
          },
          persona_asignado: {
            idpersona: data.historialIncidencia.persona_asignado.idpersona
          }
        }
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      dispatch(getIncidenciaNoAsignadas(await fetchIncidenciasNoAsignadas()));
      notification('Incidencia ha sido asignado correctamente.', body.message, 'success');
    }
    else {
      notification('No se pudo asignar la Incidencia', body.message, 'error');
    }
  };
};


export const reAsignarIncidencia = (data) => {
  console.log(data)
  return async dispatch => {
    const response = await fetchToken(`incidencias/asignacion/`,
      {
        idIncidencia: data.idIncidencia,
        historialIncidencia: {
          persona_registro: {
            idpersona: data.historialIncidencia.persona_registro.idpersona
          },
          persona_asignado: {
            idpersona: data.historialIncidencia.persona_asignado.idpersona
          }
        }
      },
      'PUT'
    );

    // const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getIncidenciaAsignadas(await fetchIncidenciasAsignadas()));
      notification('Incidencia Re-Asignada correctamente al técnico.', '', 'success');
    }
    else {
      notification('No se pudo Re-Asignar la Incidencia', '', 'error');
    }
  };
};


// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRÁMITE

export const incidenciaEnTramite = (data) => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/tramite/`,
      {
        idIncidencia: data.idIncidencia,
        historialIncidencia: data.historialIncidencia
      }, 'PUT');
    const body = await response.json();
    if (response.status === 200 || response.status === 201) {
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
      fecha: incidencia.fecha,
      persona: incidencia.persona,
      oficina: incidencia.oficina,
      motivo: incidencia.motivo,
      origen: incidencia.origen,
      historialIncidencia: incidencia.historialIncidencia,
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
      fecha: incidencia.fecha,
      origen: incidencia.origen,
      motivo: incidencia.motivo,
      historialIncidencia: incidencia.historialIncidencia,
      persona: incidencia.persona,
      oficina: incidencia.oficina,
    });
  });
  Incidencia.data = data;
  return Incidencia;
};

//LISTAR INCIDENCIA POR ID PARA VER LOS DETALLES

export const fetchIncidenciaDetalles = async (id) => {
  const response = await fetchToken('incidencias/persona/detalles/' + id);
  const body = await response.json();
  const Incidencia = {
    idIncidencia: body.idIncidencia,
    descripcion: body.descripcion,
    fecha: body.fecha,
    persona: body.persona,
    oficina: body.oficina,
    motivo: body.motivo,
    origen: body.origen,
    historialIncidencia: body.historialIncidencia,
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
      fecha: incidencia.fecha,
      origen: incidencia.origen,
      motivo: incidencia.motivo,
      historialIncidencia: incidencia.historialIncidencia,
      persona: incidencia.persona,
      oficina: incidencia.oficina,
    });
  });
  IncidenciaAsignados.data = data;
  // set user info
  return IncidenciaAsignados;
};

// LISTAR INCIDENCIAS NO ASIGNADAS

export const fetchIncidenciasNoAsignadas = async () => {
  const response = await fetchToken('incidencias/persona/noasignados');
  if (await response.status !== 404) {
    const body = await response.json();
    const IncidenciaNoAsignados = {};
    const data = [];
    body.forEach(incidencia => {
      data.push({
        idIncidencia: incidencia.idIncidencia,
        descripcion: incidencia.descripcion,
        fecha: incidencia.fecha,
        origen: incidencia.origen,
        motivo: incidencia.motivo,
        historialIncidencia: incidencia.historialIncidencia,
        persona: incidencia.persona,
        oficina: incidencia.oficina,
      });
    });
    IncidenciaNoAsignados.data = data;

    return IncidenciaNoAsignados;
  } else {

    const IncidenciaNoAsignados = {};
    const data = [];
    IncidenciaNoAsignados.data = data;

    return IncidenciaNoAsignados;
  }
};

//LISTAR INCIDENCIAS ASIGNADOS AL USUARIO

export const fetchIncidenciaSoporte = async (id) => {
  const response = await fetchToken(`incidencias/persona/asignado/${id}`);
  const body = await response.json();
  const Incidencia = {};
  const data = [];
  body.forEach(incidencia => {
    data.push({
      idIncidencia: incidencia.idIncidencia,
      descripcion: incidencia.descripcion,
      fecha: incidencia.fecha,
      origen: incidencia.origen,
      motivo: incidencia.motivo,
      historialIncidencia: incidencia.historialIncidencia,
      persona: incidencia.persona,
      oficina: incidencia.oficina,
    });
  });
  Incidencia.data = data;
  // set user info
  return Incidencia;
};

// SOLUCION DE LA INCIDENCIA

export const createSolucionIncidencia = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `incidencia/descripcion/save`,
      {
        descripcion: data.descripcion,
        incidencia: { idIncidencia: data.incidencia }
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      notification('Atención de la Incidencia registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar la Atención de la Incidencia correctamente', body.message, 'error');
    }
  };
};

// LISTAR SOLUCIONES DE LA INCIDENCIA

export const fetchDetallesIncidenciaAtendida = async (id) => {
  const response = await fetchToken(`incidencia/descripcion/incidencia/${id}`);
  const body = await response.json();
  const SolucionIncidencia = {
    idDescripcionIncidencia: body.idDescripcionIncidencia,
    descripcion: body.descripcion,
  };
  // set user info
  return SolucionIncidencia;
}


// DELETE 

export const deleteIncidencia = id => {
  return async dispatch => {
    const response = await fetchToken(`incidencias/${id}`, '', 'DELETE');
    const body = await response.json();

    if (response.status === 200) {
      dispatch(getIncidencias(await loadIncidencias()));
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
      fecha: incidencia.fecha,
      origen: incidencia.origen,
      motivo: incidencia.motivo,
      historialIncidencia: incidencia.historialIncidencia,
      persona: incidencia.persona,
      oficina: incidencia.oficina,
    });
  });
  Incidencia.data = data;
  // set user info

  return Incidencia;
};


// MOSTRAR TECNICOS DISPONIBLES

export const fetchTecnicosDisponibles = async () => {
  const response = await fetchToken('tecnico/');
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

  return PersonasDni;

}

// 