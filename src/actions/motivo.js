import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getMotivo } from '../components/ui/motivoIncidencia/motivo';

// CREATE SEDE

export const createMotivo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `motivos`,
      {
        motivo: data.motivo,
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getMotivo(await loadMotivo()));
      notification('Motivo registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar el Motivo', body.error, 'error');
    }
  };
};

// LIST CARGO

export const fetchMotivos = async () => {
  const response = await fetchToken('motivos');
  const body = await response.json();
  const Motivo = {};
  const data = [];

  body.forEach(motivo => {
    data.push({
      idMotivo: motivo.idMotivo,
      motivo: motivo.motivo,
    });
  });
  Motivo.data = data;
  return Motivo;
};

//  UPDATE SEDE

export const updateMotivo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `motivos`,
      {
        idMotivo: data.idMotivo,
        motivo: data.motivo,
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getMotivo(await loadMotivo()));
      notification('Motivo actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo actualizar el Motivo', body.error, 'error');
    }
  };
};

//  Delete la tabla

export const deleteMotivo = (id) => {
  return async dispatch => {
    const response = await fetchToken(`motivos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getMotivo(await loadMotivo()));
      notification('Motivo eliminado correctamente', "", 'success');

    } else {
      notification('No se pudo eliminar el Motivo', "", 'error');
    }
  };
};

// Refrescar la tabla

export const loadMotivo = async () => {
  const response = await fetchToken('motivos');
  const body = await response.json();
  const Motivo = {};
  const data = [];

  body.forEach(motivo => {
    data.push({
      idMotivo: motivo.idMotivo,
      motivo: motivo.motivo,
    });
  });
  Motivo.data = data;
  return Motivo;
};
