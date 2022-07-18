import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { types } from '../types/types';
import { useDispatch } from 'react-redux';

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
    //const body = await response.json();
    if (response.status === 200 || response.status === 201) {
      // AlertChackra('success', 'Correcto', 'Persona Organo creado correctamente');
      //dispatch(fetchPersonaOrgano(idpersona));
      notification('Organo asiganado correctamente.', '', 'success');
    } else if (response.status === 422) {
      // AlertChackra('error', 'Error', 'No se logró asignar a este usuario');
      notification('No se puede asignar este organo', '', 'error');
      // dispatch(fetchHistorialPersona)
    } else {
      notification('No se pudo asignar este organo', '', 'error');
      // AlertChackra('error', 'Error', 'No se logró asignar a este usuario');
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
      notification('Se ha Eliminado correctamente', '', 'success');
    } else {
      const body = await response.json();
      notification('No se pudo eliminar', body.detalles, 'error');
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

const getPersonaOrgano = personaOrgano => {
  return {
    type: types.eventLoadedPersonaOrgano,
    payload: personaOrgano,
  };
}
