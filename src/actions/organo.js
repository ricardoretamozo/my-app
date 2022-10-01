import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOrgano } from '../components/ui/organo/organo';

// CREATE ORGANO

export const createOrgano = data => {
  return async dispatch => {
    const response = await fetchToken(
      `organos`,
      {
        organo: data.organo,
        sede: data.sede,
        activo: data.activo,
      },
      'POST'
    );

    if (response.status === 200 || response.status === 201) {
      dispatch(getOrgano(await loadOrgano()));
      notification('Organo registrado', 'Organo se ha registrado correctamente.', 'success');
    } else {
      notification('Error al registrar', 'No se pudo registrar el organo', 'error');
    }
  };
};

export const fetchOrganos = async () => {
  const response = await fetchToken('organos');
  const body = await response.json();
  const Organo = {};
  const data = [];

  body.forEach(organo => {
    data.push({
      idOrgano: organo.idOrgano,
      sede: organo.sede,
      organo: organo.organo,
      activo: organo.activo,
    });
  });
  Organo.data = data;
  return Organo;
};

export const fetchOrgano = async (id) => {
  const response = await fetchToken('organos/listall/' + id);
  const body = await response.json();
  const Organo = {};
  const data = [];

    data.push({
      idOrgano: body.idOrgano,
      sede: body.sede,
      organo: body.organo,
      activo: body.activo,
    });
  Organo.data = data;
  return Organo;
};

// ACTUALIZAR ORGANO

export const updateOrgano = data => {
  var idSede = {};
  if (data.sede.idSede != null) {
    idSede = {
      idSede: Number(data.sede.idSede),
    };
  } else {
    idSede = {
      idSede: Number(data.sede),
    };
  }
  return async dispatch => {
    const response = await fetchToken(
      `organos`,
      {
        idOrgano: data.idOrgano,
        organo: data.organo,
        sede: idSede,
        activo: data.activo,
      },
      'PUT'
    );

    if (response.status === 200) {
      dispatch(getOrgano(await loadOrgano()));
      notification('Organo actualizado', 'Organo actualizado correctamente', 'success');
    } else {
      notification('Error al actualizar', 'No se pudo actualizar el Organo', 'error');
    }
  };
};

// DELETE / DISABLED ORGANO

export const deleteOrgano = id => {
  return async dispatch => {
    const response = await fetchToken(`organos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      dispatch(getOrgano(await loadOrgano()));
      notification('Organo actualizado', 'Organo se ha actualizado el estado correctamente', 'success');
    } else {
      notification('Error al eliminar', 'No se pudo eliminar el Organo', 'error');
    }
  };
};

// Refrescar la tabla

export const loadOrgano = async () => {
  const response = await fetchToken('organos');
  const body = await response.json();
  const Organo = {};
  const data = [];

  body.forEach(organo => {
    data.push({
      idOrgano: organo.idOrgano,
      sede: organo.sede,
      organo: organo.organo,
      activo: organo.activo,
    });
  });
  Organo.data = data;
  return Organo;
};
