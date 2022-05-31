import React from 'react';
import { Switch } from 'react-router-dom';

import { home } from './home/home';
import { Perfil } from './perfil/perfil';
import { PrivateRoute } from '../../routers/PrivateRoute'; 
import { useSelector } from 'react-redux';

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
      </Switch>
    </>
  );
};
