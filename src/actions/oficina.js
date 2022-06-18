import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOficina } from '../components/ui/oficina/oficina';

// CREATE ORGANO

export const createOficina = data => {
  // console.log(data);
  var idOrgano = {};
  if (data.organo != null) {
    idOrgano = {
      idOrgano: Number(data.organo),
    };
    // console.log(data.organo.idOrgano);
    // console.log('ingreso');
  }
  
  return async dispatch => {
    const response = await fetchToken(
      `oficinas`,
      {
        oficina: data.oficina,
        organo: {idOrgano: data.organo},
        activo: data.activo,
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getOficina(await loadOficina()));
      notification('Oficina registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar la Oficina', body.erroresValidacion.oficina, 'error');
    }
  };
};

export const cargarOficinas = () => {
  return async dispatch => {

    const response = await fetchToken('oficinas',
    'GET');
    const body = await response.json();

    if ( response.status === 200 || response.status === 201 ) {
      dispatch(getOficina(body));
    }else{
      notification('No se pudo cargar las Oficinas', body.message, 'error');
    }
  }
}

export const fetchOficinas = async () => {
  const response = await fetchToken('oficinas');
  const body = await response.json();
  const Oficina = {};
  const data = [];

  body.forEach(oficina => {
    data.push({
      idOficina: oficina.idOficina,
      oficina: oficina.oficina,
      organo: oficina.organo,
      activo: oficina.activo,
    });
  });
  Oficina.data = data;
  // set user info

  return Oficina;
};

export const fetchOficina = async (id) => {
  const response = await fetchToken('oficinas/listall/' + id);
  const body = await response.json();
  var Oficina = {};
  const data = [];

  Oficina = {
    idOficina: body.idOficina,
    oficina: body.oficina,
    organo: body.organo,
    activo: body.activo,  
  };

  //Oficina.data = data;
  // set user info

  return Oficina;
};

// ACTUALIZAR ORGANO

export const updateOficina = data => {

  var idOrgano = {};
  if (data.organo.idOrgano != null) {
    idOrgano = {
      idOrgano: Number(data.organo.idOrgano),
    };
    console.log(data.organo.idOrgano);
    console.log('ingreso');
  } else {
    idOrgano = {
      idOrgano: Number(data.organo),
    };
  }

  console.log(data.organo);
  console.log(idOrgano);

  return async dispatch => {
    const response = await fetchToken(
      `oficinas`,
      {
        idOficina: data.idOficina,
        oficina: data.oficina,
        organo: idOrgano,
        activo: data.activo,
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getOficina(await loadOficina()));
      notification('Oficina actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo actualizar el Oficina', body.detalles, 'error');
    }
  };
};

// DELETE / DISABLED ORGANO

export const deleteOficina = id => {
  return async dispatch => {
    const response = await fetchToken(`oficinas/${id}`, '', 'DELETE');
    const body = await response.json();

    if (response.status === 200) {
      dispatch(getOficina(await loadOficina()));
      notification('Oficina actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo eliminar la Oficina', body.detalles, 'error');
    }
  };
};

// Refrescar la tabla

export const loadOficina = async () => {
  const response = await fetchToken('oficinas');
  const body = await response.json();
  const Oficina = {};
  const data = [];

  body.forEach(oficina => {
    data.push({
      idOficina: oficina.idOficina,
      oficina: oficina.oficina,
      organo: oficina.organo,
      activo: oficina.activo,
    });
  });
  Oficina.data = data;
  return Oficina;
};

