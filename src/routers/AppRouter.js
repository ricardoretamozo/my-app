import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { DasboardScreen } from '../components/ui/DasboardScreen';


import { startChecking } from '../actions/auth';
import { fetchSedes } from '../actions/sede';
import { fetchOrganos } from '../actions/organo';
import { getSede } from '../components/ui/sede/sede';
import { getOrgano } from '../components/ui/organo/organo';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { store } from '../store/store';

export const AppRouter = () => {
  const dispatch = useDispatch();

  console.log(useSelector(state => state));
  const { access_token } = useSelector(state => state.auth);
  console.log(!!access_token);

  useEffect( () => {
    dispatch(startChecking());
  }, [dispatch]);

  const fetchData= async ()=> {
    await fetchSedes().then((res)=>{
      dispatch(getSede(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().sede.rows.length <= 0){
      fetchData();
    }
    //fetchData();
  });

  const fetchDataOrgano = async ()=> {
    await fetchOrganos().then((res)=>{
      dispatch(getOrgano(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().organo.rows.length <= 0){
      fetchDataOrgano();
    }
    //fetchData();
  });

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/auth/login"
            component={LoginScreen}
            isAuthenticated={!!access_token}
          />
          <Route exact path="/auth/register" component={RegisterScreen} />
          <PrivateRoute
            exact
            path="/dashboard/home"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/perfil"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/sedes"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/organos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/oficinas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/personas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/cargos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <Redirect to="/dashboard/home" />
        </Switch>
      </div>
    </Router>
  );
};
