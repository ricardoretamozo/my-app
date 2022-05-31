import { fetchToken } from '../helpers/fetch';

export const fetchSedes = async () => {
  const response = await fetchToken('sedes');
  const body = await response.json();
  const Sede = {};
  const data = [];

  body.forEach(sede => {
    data.push({
      idSede: sede.idSede,
      sede: sede.sede,
      direccion: sede.direccion,
      activo: sede.activo,
    });
  });
  Sede.data = data;
  // set user info

  return Sede;
};
