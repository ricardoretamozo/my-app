import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getCargo } from '../components/ui/cargo/cargo';

// CREATE SEDE

export const createCargo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `cargos`,
      {
        cargo: data.cargo,
        activo: data.activo,
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getCargo(await loadCargo()));

      notification('Cargo registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar el Cargo', body.error, 'error');
    }
  };
};

// LIST CARGO

export const fetchCargos = async () => {
  const response = await fetchToken('cargos');
  const body = await response.json();
  const Cargo = {};
  const data = [];
  body.forEach(cargo => {
    data.push({
      idCargo: cargo.idCargo,
      cargo: cargo.cargo,
      activo: cargo.activo,
    });
  });
  Cargo.data = data;
  return Cargo;
};

export const fetchCargo = async (id) => {
  const response = await fetchToken('cargos/listall/' + id);
  const body = await response.json();
  var Cargo = {};
  const data = [];
  Cargo = {
    idCargo: body.idCargo,
    cargo: body.cargo,
    activo: body.activo,  
  };
  Cargo.data = data;
  return Cargo;
};

//  UPDATE SEDE

export const updateCargo = data => {
  return async dispatch => {
    const response = await fetchToken(
      `cargos`,
      {
        idCargo: data.idCargo,
        cargo: data.cargo,
        activo: data.activo,
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getCargo(await loadCargo()));
      notification('Cargo actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo actualizar el Cargo', body.error, 'error');
    }
  };
};

//  DELETE / DISABLED SEDE

export const deleteCargo = id => {
  return async dispatch => {
    const response = await fetchToken(`cargos/${id}`, '', 'DELETE');

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getCargo(await loadCargo()));
      notification('Cargo actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo eliminar el Cargo', body.error, 'error');
    }
  };
};

// Refrescar la tabla

export const loadCargo = async () => {
  const response = await fetchToken('cargos');
  const body = await response.json();
  const Cargo = {};
  const data = [];

  body.forEach(cargo => {
    data.push({
      idCargo: cargo.idCargo,
      cargo: cargo.cargo,
      activo: cargo.activo,
    });
  });
  Cargo.data = data;
  return Cargo;
};
