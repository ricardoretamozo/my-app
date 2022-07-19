import React from 'react';
import { Switch } from 'react-router-dom';

import { home } from './home/home';
import { Incidencia } from './incidencia/incidencia';
import { IncidenciaUsuario } from './incidencia/usuario/incidencia';
import { IncidenciaAsistenteNoAsignados, IncidenciaAsistenteAsignados } from './incidencia/asistente/incidencia';
import { Perfil } from './perfil/perfil';
import { PrivateRoute } from '../../routers/PrivateRoute'; 
import { useSelector } from 'react-redux';
import { Sede } from './sede/sede';
import { Organo } from './organo/organo';
import { Oficina } from './oficina/oficina';
import { Persona } from './persona/persona';
import { Cargo } from './cargo/cargo';
import { Motivo } from './motivo/motivo';
import { IncidenciaSoporte } from './incidencia/soporte/incidencia'

export const DasboardScreen = () => {
  //
  const { access_token } = useSelector(state => state.auth);
  return (
    <>
      <Switch>
        <PrivateRoute
        exact path="/dashboard/home"
        component = { home } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
          exact path="/dashboard/motivos"
          component = { Motivo } 
          isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/incidencias"
        component = { Incidencia } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/usuario/incidencias"
        component = { IncidenciaUsuario } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/asistente/incidencias_asignadas"
        component = { IncidenciaAsistenteAsignados } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/asistente/incidencias_no_asignadas"
        component = { IncidenciaAsistenteNoAsignados } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/soporte/incidencias"
        component = { IncidenciaSoporte } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/perfil"
        component = { Perfil } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/sedes"
        component = { Sede } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/organos"
        component = { Organo } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/oficinas"
        component = { Oficina } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/personas"
        component = { Persona } 
        isAuthenticated = { !!access_token }
        />
        <PrivateRoute
        exact path="/dashboard/cargos"
        component = { Cargo } 
        isAuthenticated = { !!access_token }
        />
      </Switch>
    </>
  );
};
