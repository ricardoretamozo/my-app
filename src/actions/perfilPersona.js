import { fetchToken } from '../helpers/fetch';

export const perfilPersona = async () => {
  const response = await fetchToken('perfil');
  const body = await response.json();
  const PerfilPersona = {};
  const data = [];

  body.forEach(perfil => {
    data.push({
      idPerfilPersona: perfil.idPerfilPersona,
      perfil: perfil.perfil,
      descripcion: perfil.descripcion,
      activo: perfil.activo,
    });
  });
  PerfilPersona.data = data;
  // set user info

  return PerfilPersona;
};
