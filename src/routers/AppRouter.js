import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { RegisterValidateScreen } from '../components/auth/RegisterValidateScreen';
import { DasboardScreen } from '../components/ui/DasboardScreen';
import HistorialUsuario from '../components/historialUsuario/HistorialUsuario';

import { fetchSedes } from '../actions/sede';
import { fetchOrganos } from '../actions/organo';
import { getSede } from '../components/ui/sede/sede';
import { getOrgano } from '../components/ui/organo/organo';
import { perfilPersona } from '../actions/perfilPersona';
import { getPerfilPersona } from '../components/ui/perfilpersona/perfilPersona';
import { fetchOficinas } from '../actions/oficina';
import { getOficina } from '../components/ui/oficina/oficina';
import { fetchCargos } from '../actions/cargo';
import { getCargo } from '../components/ui/cargo/cargo';
import { fetchMotivos } from '../actions/motivo';
import { getMotivo } from '../components/ui/motivoIncidencia/motivo';
import { fetchIncidenciasPersonas } from '../actions/incidencia';
import { getIncidenciaId } from '../components/ui/incidencia/incidencia';
import { personaList } from '../actions/persona';
import { getPersona } from '../components/ui/persona/persona';

import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { store } from '../store/store';
import { fetchOrigen } from '../actions/origenIncidencia';
import { getOrigen } from '../components/ui/origenIncidencia/origen';

export const AppRouter = () => {
  const dispatch = useDispatch();
  // console.log(useSelector(state => state));
  const { access_token } = useSelector(state => state.auth);
  const { rol } = useSelector(state => state.auth);
  const { identificador } = useSelector(state => state.auth);

  useSelector(state => state);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  // SEDES

  useEffect(() => {
    if (store.getState().sede.checking) {
      fetchSedes().then(res => {
        dispatch(getSede(res))
      }).catch((err)=>{
        console.log("warn " + err);
      });
    }
  });

  // ORGANOS

  useEffect(() => {
    if (store.getState().organo.checking) {
      fetchOrganos().then(res => {
        dispatch(getOrgano(res));
      }).catch((err)=>{
        console.log("warn " + err);
      });
    }
  });

  // OFICINAS

  const FetchDataOficinas = async () => {
    await fetchOficinas().then(res => {
      dispatch(getOficina(res));
    }).catch((err)=>{
      console.log("WARN " + err);
    });
  }

  useEffect(() => {
    if (store.getState().oficina.checking) {
      FetchDataOficinas();
    }
  });

  // CARGOS

  useEffect(() => {

    if (store.getState().cargo.checking) {
      fetchCargos().then((res) => {
        dispatch(getCargo(res));
      }).catch((err) => {
        console.log("warn " + err);
      });
    }
  });

  // PERFIL PERSONA

  useEffect(() => {
    if (store.getState().perfilPersona.checking) {
      perfilPersona().then(res => {
        dispatch(getPerfilPersona(res));
      }).catch((err) => {
        console.log("warn " + err);
      });
    }
  });



  // MOTIVOS

  useEffect(() => {
    if (store.getState().motivo.checking) {
      fetchMotivos().then((res) => {
        dispatch(getMotivo(res))
      }).catch((err) => {
        console.log("warn " + err);
      });
    }
  });

  // INCIDENCIAS POR CADA USUARIO

  const DataFetchIncidenciasPersonas = async () => {
    await fetchIncidenciasPersonas(identificador).then((res) => {
      dispatch(getIncidenciaId(res));
    }).catch((err) => {
      console.log("WARN " + err);
    })
  }

  useEffect(() => {
    if (store.getState().incidenciaId.checking) {
      DataFetchIncidenciasPersonas()
    }
  });

  //PERSONAS

  const DataFetchPersonas = async () => {
    await personaList().then((res) => {
      dispatch(getPersona(res));
    }).catch((err) => {
      console.log("WARN " + err);
    });
  }

  useEffect(() => {
    if (store.getState().persona.checking) {
      DataFetchPersonas()
    }
  });

  // ORIGEN INCIDENCIAS

  useEffect(() => {
    if (store.getState().origenIncidencia.checking) {
      fetchOrigen().then((res) => {
        dispatch(getOrigen(res))
      }).catch((err) => {
        console.log("WARN " + err);
      });
    }
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
            path="/dashboard/usuario/incidencias"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/incidencias-asignadas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/incidencias-no-asignadas"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/soporte/incidencias"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/motivos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/correos"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/origen-incidencia"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/reportes"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            exact
            path="/dashboard/reportes/incidencias-one"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/reportes/incidencias-two"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/reportes/incidencias-three"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/mi-perfil"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/ftp"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <PrivateRoute
            path="/dashboard/tabla-conocimiento"
            component={DasboardScreen}
            isAuthenticated={!!access_token}
          />
          <Redirect to="/dashboard/incidencias" />
        </Switch>
      </div>
    </Router>
  );
};
