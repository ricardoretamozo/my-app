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
import { RegisterValidateScreen } from '../components/auth/RegisterValidateScreen';
import { DasboardScreen } from '../components/ui/DasboardScreen';
import HistorialUsuario  from '../components/historialUsuario/HistorialUsuario';

import { fetchSedes } from '../actions/sede';
import { fetchOrganos } from '../actions/organo';
import { getSede } from '../components/ui/sede/sede';
import { getOrgano } from '../components/ui/organo/organo';
import { perfilPersona } from '../actions/perfilPersona';
import { getPerfilPerson } from '../components/ui/perfil/perfil';
import { fetchOficinas } from '../actions/oficina';
import { getOficina } from '../components/ui/oficina/oficina';
import { fetchCargos } from '../actions/cargo';
import { getCargo } from '../components/ui/cargo/cargo';

import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { store } from '../store/store';

export const AppRouter = () => {
  const dispatch = useDispatch();

  console.log(useSelector(state => state));
  const { access_token } = useSelector(state => state.auth);
  const { rol } = useSelector(state => state.auth);
  
  console.log(rol);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  const fetchData = async () => {
    await fetchSedes().then(res => {
      dispatch(getSede(res));
    });
  };
  useEffect(() => {
    if (store.getState().sede.checking) {
      fetchData();
    }
    //fetchData();
  });

  const fetchDataOrgano = async () => {
    await fetchOrganos().then(res => {
      dispatch(getOrgano(res));
    });
  };
  useEffect(() => {
    if (store.getState().organo.checking) {
      fetchDataOrgano();
    }
    //fetchData();
  });

  const fetchDataPerfil = async () => {
    await perfilPersona().then(res => {
      dispatch(getPerfilPerson(res));
    });
  };
  useEffect(() => {
    console.log(store.getState().perfilPersona);
    if (store.getState().perfilPersona.checking) {
      fetchDataPerfil();
    }
    //fetchData();
  });

  // OFICINAS

  const fetchDataOficina= async ()=> {
    await fetchOficinas().then((res)=>{
      dispatch(getOficina(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().oficina.checking){
      fetchDataOficina();
    }
    //fetchData();
  }, []);

  // CARGOS
  const fetchDataCargos= async ()=> {
    await fetchCargos().then((res)=>{
      dispatch(getCargo(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().cargo.checking){
      fetchDataCargos();
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
            rol={rol}
          />
          <PublicRoute
            exact
            path="/auth/register"
            component={RegisterScreen}
            isAuthenticated={!!access_token}
            rol={rol}
          />
          <PublicRoute
            exact
            path="/auth/register/validate"
            component={RegisterValidateScreen}
            isAuthenticated={!!access_token}
            rol={rol}
          />
          <PrivateRoute
            exact
            path="/dashboard/home"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/usuario"
            component={HistorialUsuario}
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
          <PrivateRoute
            exact
            path="/dashboard/incidencias"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/motivos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <Redirect to="/dashboard/home" />
        </Switch>
      </div>
    </Router>
  );
};
