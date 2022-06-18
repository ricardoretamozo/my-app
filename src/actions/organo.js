import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOrgano } from '../components/ui/organo/organo';

// CREATE ORGANO

export const createOrgano = data => {
  // var idSede = {};
  // if (data.sede != null) {
  //   idSede = {
  //     idSede: Number(data.sede),
  //   };
  //   console.log(data.sede);
  //   console.log('ingreso');
  // } else {
  //   idSede = {
  //     idSede: Number(data.sede),
  //   };
  // }
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

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getOrgano(await loadOrgano()));
      notification('Organo registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar el Organo', body.erroresValidacion.organo, 'error');
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
  // set user info
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
  // set user info
  return Organo;
};

// ACTUALIZAR ORGANO

export const updateOrgano = data => {
  var idSede = {};
  if (data.sede.idSede != null) {
    idSede = {
      idSede: Number(data.sede.idSede),
    };
    console.log(data.sede.idSede);
    console.log('ingreso');
  } else {
    idSede = {
      idSede: Number(data.sede),
    };
  }
  console.log(data.sede);
  console.log(idSede);
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

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getOrgano(await loadOrgano()));
      notification('Organo actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo actualizar el Organo', body.detalles, 'error');
    }
  };
};

// DELETE / DISABLED ORGANO

export const deleteOrgano = id => {
  return async dispatch => {
    const response = await fetchToken(`organos/${id}`, '', 'DELETE');
    const body = await response.json();

    if (response.status === 200) {
      dispatch(getOrgano(await loadOrgano()));
      notification('Organo actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo eliminar el Organo', body.detalles, 'error');
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
