import { fetchToken } from '../helpers/fetch';

export const personaList = async () => {
  const response = await fetchToken('personas');
  const body = await response.json();
  const personaList = {};
  const data = [];

  body.forEach(persona => {
    data.push({
      idPersona: persona.idPersona,
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
      usuario: persona.usuario,
      sexo: persona.sexo,
      activo: persona.activo,
    });
  });
  personaList.data = data;
  // set user info

  return personaList;
};
