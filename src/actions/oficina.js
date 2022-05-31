import { fetchToken } from '../helpers/fetch';

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
