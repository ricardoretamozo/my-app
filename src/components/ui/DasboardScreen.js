import React from 'react';
import { Switch } from 'react-router-dom';

import { home } from './home/home';
import { Perfil } from './perfil/perfil';
import { PrivateRoute } from '../../routers/PrivateRoute'; 
import { useSelector } from 'react-redux';
import { Sede } from './sede/sede';
import { Organo } from './organo/organo';
import { Oficina } from './oficina/oficina';

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
      </Switch>
    </>
  );
};
