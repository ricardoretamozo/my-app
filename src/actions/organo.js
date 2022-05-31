import { fetchToken } from '../helpers/fetch';

export const fetchOrganos = async () => {
  const response = await fetchToken('organos');
  const body = await response.json();
  const Organo = {};
  const data = [];

  body.forEach(organo => {
    data.push({
      idOrgano: organo.idOrgano,
      organo: organo.organo,
      sede: organo.sede,
      activo: organo.activo,
    });
  });
  Organo.data = data;
  // set user info

  return Organo;
};
