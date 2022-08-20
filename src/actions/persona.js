import { fetchServicioReniec, fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getPersona } from '../components/ui/persona/persona';
import { startLogin } from './auth';

// // CREATE PERSONA

export const createPersona = data => {
  var idPerfilPersona = {};
  if (data.perfilPersona.idPerfilPersona != null) {
    idPerfilPersona = {
      idPerfilPersona: Number(data.perfilPersona.idPerfilPersona),
    };
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
        perfilPersona: {idPerfilPersona: Number(data.perfilPersona)}
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
        fecha: data.fecha,
        sexo: data.sexo,
        activo: data.activo,
        perfilPersona: {
          idPerfilPersona: 4
        }
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
      notification('Persona actualizado correctamente', '', 'success');
    } else {
      notification('No se pudo actualizar la Persona', '', 'error');
    }
  };
};

export const fetchUsuarioId = async (id) => {
  const response = await fetchToken(`personas/${id}`);
  const body = await response.json();
  const Usuario = {
    idpersona: body.idpersona,
    nombre: body.nombre,
    apellido: body.apellido,
    dni: body.dni,
    usuario: body.usuario,
    password: body.password,
    correo: body.correo,
    celular: body.celular,
    fecha: body.fecha,
    sexo: body.sexo,
    activo: body.activo,
    perfilPersona: body.perfilPersona
  };

  return Usuario;
}

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

// Consulta API reniec para obtener datos de persona

export const consultaReniec = (dni) => {
  return async dispatch => {
    const response = await fetchServicioReniec(`SIJ/Reniec/${dni}`);
    const body = await response.json();
    console.log(body);
  }
}

// Busqueda de usuarios por apellido
export const buscarPersonaApellido = async (apellido) => {
    const response = await fetchToken(`personas/buscar/apellido?apellido=${apellido}`);
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
  }

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