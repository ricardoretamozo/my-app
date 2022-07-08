import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getPersonaOrgano } from '../components/ui/persona/persona';

export const createPersonaOrgano = data => {
    return async dispatch => {
        const response = await fetchToken(
            `personaorganos`,
            {
              persona: { idpersona: data.persona.idpersona },
              organo: { idOrgano: data.organo.idOrgano },
            },
            'POST'
        );
        //const body = await response.json();

        if (response.status === 200 || response.status === 201) {
            dispatch(getPersonaOrgano(await loadPersonaOrgano()));
            notification('Organo asiganado correctamente.', "", 'success');
          } else if (response.status === 422){
            notification('No se puede asignar este organo',"", 'error');
            // dispatch(fetchHistorialPersona)
          }else {
            notification('No se pudo asignar este organo',"", 'error');
          }
    }
}

export const fetchPersonaOrgano = async (id) => {
    const response = await fetchToken('personaorganos/persona/'+id);
    const body = await response.json();
    const PersonaOrgano = {};
    const data = [];
  
    body.forEach(x => {
      data.push({
        organo: x.organo,
        persona: x.persona,
        idPersonaOrgano: x.idPersonaOrgano
      });
    });
    PersonaOrgano.data = data;
    // set user info
    return PersonaOrgano;
  };

  export const deletePersonaOrgano = (id, personaid) => {
    return async dispatch => {
      const response = await fetchToken(`personaorganos/${id}`, '', 'DELETE');
      const body = await response.json();
  
      if (response.status === 200) {
        dispatch(getPersonaOrgano(await loadPersonaOrgano(personaid)));
        notification('Se ha Eliminado correctamente', body.message, 'success');
      } else {
        notification('No se pudo eliminar', body.detalles, 'error');

      }
    };
  };

  export const loadPersonaOrgano = async (id) => {
    const response = await fetchToken('personaorganos/persona/'+id);
    const body = await response.json();
    const PersonaOrgano = {};
    const data = [];
  
    body.forEach(x => {
      data.push({
        organo: x.organo,
        persona: x.persona,
        idPersonaOrgano: x.idPersonaOrgano
      });
    });
    PersonaOrgano.data = data;
    // set user info
    return PersonaOrgano;
  };

