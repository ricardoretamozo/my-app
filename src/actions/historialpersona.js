import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';

export const fetchHistorialPersona = async (id) => {
  const response = await fetchToken('historialpersonas/persona/' + id);
  if (response.status === 200 || response.status === 201) {
    const body = await response.json();
    var HistorialPersona = {};

    HistorialPersona = {
      idHistorialPersona: body.idHistorialPersona,
      persona: body.persona,
      cargo: body.cargo,
      oficina: body.oficina,
      iniciaCargo: body.iniciaCargo,
      terminaCargo: body.terminaCargo,
      activo: body.activo,
      fecha: body.fecha,
      ip: body.ip,
    };

    return HistorialPersona;

  } else {
    return false;
  }
};

export const createHistorialPersona = (data) => {
  return async dispatch => {
    const response = await fetchToken(
      `historialpersonas/save`,
      {
        persona: { idpersona: data.persona.idpersona },
        cargo: { idCargo: data.cargo ? data.cargo.idCargo : null },
        oficina: {
          idOficina: data.oficina ? data.oficina.idOficina : null,
        },
        iniciaCargo: data.iniciaCargo,
        terminaCargo: data.terminaCargo,
        activo: data.activo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      notification('Historial registrado correctamente.', 'El historial Ha sido registrado correctamente', 'success');
    } else {
      notification('Error de registro Historial', 'No se pudo registrar el Historial', 'error');
      // dispatch(fetchHistorialPersona)
    }
  };
};
