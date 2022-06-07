import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getPersona } from '../components/ui/persona/persona';

// // CREATE PERSONA

export const createPersona = data => {
  var idPerfilPersona = {};
  if (data.organo.idPerfilPersona != null) {
    idPerfilPersona = {
      idPerfilPersona: Number(data.organo.idPerfilPersona),
    };
    console.log(data.organo.idPerfilPersona);
    console.log('ingreso');
  } else {
    idPerfilPersona = {
      idPerfilPersona: Number(data.organo),
    };
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
      dispatch(getPersona(await loadPersona()));

      notification('Oficina registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar la Oficina', body.error, 'error');
    }
  };
};


export const personaList = async () => {
  const response = await fetchToken('personas');
  const body = await response.json();
  const Persona = {};
  const data = [];

  body.forEach(persona => {
    data.push({
      idpersona: persona.idpersona,
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
      usuario: persona.usuario,
      fecha: persona.fecha,
      sexo: persona.sexo,
      activo: persona.activo,
      perfilPersona: persona.perfilPersona
    });
  });
  Persona.data = data;
  // set user info

  return Persona;
};

// ACTUALIZAR ORGANO

export const updatePersona = data => {

  var idPerfilPersona = {};
  if (data.organo.idPerfilPersona != null) {
    idPerfilPersona = {
      idPerfilPersona: Number(data.organo.idPerfilPersona),
    };
    console.log(data.organo.idPerfilPersona);
    console.log('ingreso');
  } else {
    idPerfilPersona = {
      idPerfilPersona: Number(data.organo),
    };
  }

  return async dispatch => {
    const response = await fetchToken(
      `oficinas`,
      {
      idpersona: data.idpersona,
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      usuario: data.usuario,
      fecha: data.fecha,
      sexo: data.sexo,
      activo: data.activo,
      perfilPersona: data.perfilPersona
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getPersona(await loadPersona()));
      notification('Persona actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo actualizar la Persona', body.error, 'error');
    }
  };
};

// DELETE / DISABLED ORGANO

export const deletePersona = id => {
  return async dispatch => {
    const response = await fetchToken(`personas/${id}`, '', 'DELETE');
    const body = await response.json();

    if (response.status === 200) {
      dispatch(getPersona(await loadPersona()));
      notification('Persona actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo eliminar la Persona', body.error, 'error');
    }
  };
};

// Refrescar la tabla

export const loadPersona = async () => {
  const response = await fetchToken('personas');
  const body = await response.json();
  const Persona = {};
  const data = [];

  body.forEach(persona => {
    data.push({
      idpersona: persona.idpersona,
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
      usuario: persona.usuario,
      fecha: persona.fecha,
      sexo: persona.sexo,
      activo: persona.activo,
      perfilPersona: persona.perfilPersona
    });
  });
  Persona.data = data;
  // set user info

  return Persona;
};


