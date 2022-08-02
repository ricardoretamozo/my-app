import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOrigen } from '../components/ui/origenIncidencia/origen';

export const createOrigen = data => {
    return async dispatch => {
      const response = await fetchToken(
        `origenincidencia`,
        {
          origen: data.origen,
        },
        'POST'
      );
  
      const body = await response.json();
  
      if (response.status === 200 || response.status === 201) {
        dispatch(getOrigen(await loadOrigen()));
        notification('Origen registrado correctamente.', body.message, 'success');
      } else {
        notification('No se pudo registrar el Origen', body.error, 'error');
      }
    };
  };
  
  // LIST ORIGEN
  
  export const fetchOrigen = async () => {
    const response = await fetchToken('origenincidencia/listAll');
    const body = await response.json();
    const Origen = {};
    const data = [];
  
    body.forEach(origen => {
      data.push({
        idOrigen: origen.idOrigen,
        origen: origen.origen,
      });
    });
    Origen.data = data;
    return Origen;
  };
  
  //  UPDATE ORIGEN
  
  export const updateOrigen = data => {
    return async dispatch => {
      const response = await fetchToken(
        `origenincidencia`,
        {
          idOrigen: data.idOrigen,
          origen: data.origen,
        },
        'PUT'
      );
  
      const body = await response.json();
  
      if (response.status === 200) {
        dispatch(getOrigen(await loadOrigen()));
        notification('Origen actualizado correctamente', body.message, 'success');
      } else {
        notification('No se pudo actualizar el Origen', body.error, 'error');
      }
    };
  };
  
  //  Delete ORIGEN
  
  export const deleteOrigen = (id) => {
    return async dispatch => {
      const response = await fetchToken(`origenincidencia/${id}`, '', 'DELETE');
  
      if (response.status === 200) {
        dispatch(getOrigen(await loadOrigen()));
        notification('Origen eliminado correctamente', "", 'success');
  
      } else {
        notification('No se pudo eliminar el Origen', "", 'error');
      }
    };
  };
  
  // Refrescar la tabla
  
  export const loadOrigen = async () => {
    const response = await fetchToken('origenincidencia/listAll');
    const body = await response.json();
    const Origen = {};
    const data = [];
  
    body.forEach(origen => {
      data.push({
        idOrigen: origen.idOrigen,
        origen: origen.origen,
      });
    });
    Origen.data = data;
    return Origen;
  };
  