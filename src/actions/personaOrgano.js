import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';
import { getOrgano } from '../components/ui/organo/organo';

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
            // dispatch(startLogin(data.dni, data.password));
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

  export const deletePersonaOrgano = id => {
    return async dispatch => {
      const response = await fetchToken(`personaorganos/${id}`, '', 'DELETE');
      const body = await response.json();
  
      if (response.status === 200) {
        // dispatch(getOficina(await loadOficina()));
        notification('Se ha Eliminado correctamente', body.message, 'success');
      } else {
        notification('No se pudo eliminar', body.detalles, 'error');
      }
    };
  };

