import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';

export const createPersonaOrgano = (idpersona, idOrgano) => {
  return async dispatch => {
    const response = await fetchToken(
      `personaorganos`,
      {
        persona: { idpersona: idpersona },
        organo: { idOrgano: idOrgano },
      },
      'POST'
    );
    if (response.status === 200 || response.status === 201) {
      notification('Organo asiganado correctamente.', '', 'success', 'modalOrganoAsignacion');
    } else if (response.status === 422) {
      notification('No se puede asignar este organo', '', 'error', 'modalOrganoAsignacion');
    } else {
      notification('No se pudo asignar este organo', '', 'error', 'modalOrganoAsignacion');
    }
  };
};

export const fetchPersonaOrgano = async id => {

  const response = await fetchToken('personaorganos/persona/' + id);
  const body = await response.json();
  const PersonaOrgano = {};
  const data = [];

  body.forEach(x => {
    data.push({
      organo: x.organo.organo,
      idOrgano: x.organo.idOrgano,
      sede: x.organo.sede.sede,
      idSede: x.organo.sede.idSede,
      idPersonaOrgano: x.idPersonaOrgano,
    });
  });
  PersonaOrgano.data = data;

  // set user info
  return PersonaOrgano;
};

export const deletePersonaOrgano = id => {
  return async dispatch => {
    const response = await fetchToken(`personaorganos/${id}`, '', 'DELETE');

    if (response.status === 200) {
      notification('Se ha Eliminado correctamente', '', 'success', 'modalOrganoAsignacion');
    } else {
      const body = await response.json();
      notification('No se pudo eliminar', body.detalles, 'error', 'modalOrganoAsignacion');
    }
  };
};

export const loadPersonaOrgano = async id => {
  const response = await fetchToken('personaorganos/persona/' + id);
  const body = await response.json();
  const PersonaOrgano = {};
  const data = [];

  body.forEach(x => {
    data.push({
      organo: x.organo,
      persona: x.persona,
      idPersonaOrgano: x.idPersonaOrgano,
    });
  });
  PersonaOrgano.data = data;
  // set user info
  return PersonaOrgano;
};
