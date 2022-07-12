import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getPersona } from '../components/ui/persona/persona';
import { startLogin } from './auth';

// // CREATE PERSONA

export const createPersona = data => {
  console.log(data);
  var idPerfilPersona = {};
  if (data.perfilPersona.idPerfilPersona != null) {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona.idPerfilPersona),
    };
    console.log(data.perfilPersona.idPerfilPersona);
    console.log('ingreso');
  } else {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona),
    };
  }
  return async dispatch => {
    const response = await fetchToken(
      `personas`,
      {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.usuario,
        password: data.password,
        correo: data.correo,
        celular: data.celular,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: {idPerfilPersona: data.perfilPersona}
      },
      'POST'
    );

    const body = await response.json();

    if (response.status === 200 || response.status === 201) {
      dispatch(getPersona(await loadPersona()));
      notification('Usuario registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar al Usuario', body.error, 'error');
    }
  };
};

export const createPersonaRegister = data => {
  console.log(data);
  return async dispatch => {
    const response = await fetchToken(
      `personas/register`,
      {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        usuario: data.dni,
        password: data.password,
        correo: data.correo,
        celular: data.celular,
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: {idPerfilPersona: 4}
      },
      'POST'
    );
    const body = await response.json();
    if (response.status === 200 || response.status === 201) {
      dispatch(startLogin(data.dni, data.password));
      notification('Usuario registrado correctamente.', body.message, 'success');
    } else {
      notification('No se pudo registrar el Usuario', body.mensaje, 'error');
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
      password: persona.password,
      correo: persona.correo,
      celular: persona.celular,
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
  if (data.perfilPersona.idPerfilPersona != null) {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona.idPerfilPersona),
    };
    console.log(data.perfilPersona.idPerfilPersona);
    console.log('ingreso');
  } else {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona),
    };
  }

  return async dispatch => {
    const response = await fetchToken(
      `personas`,
      {
      idpersona: data.idpersona,
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      usuario: data.usuario,
      password: data.password,
      correo: data.correo,
      celular: data.celular,
      fecha: data.fecha,
      sexo: data.sexo,
      activo: data.activo,
      perfilPersona: idPerfilPersona
      },
      'PUT'
    );

    const body = await response.json();

    if (response.status === 200) {
      dispatch(getPersona(await loadPersona()));
      notification('Persona actualizado correctamente', body.message, 'success');
    } else {
      notification('No se pudo actualizar la Persona', body.detalles, 'error');
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
      notification('No se pudo eliminar la Persona', body.detalles, 'error');
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
      password: persona.password,
      correo: persona.correo,
      celular: persona.celular,
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