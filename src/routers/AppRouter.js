import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { DasboardScreen } from "../components/ui/DasboardScreen";

import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  console.log(useSelector(state => state));
  const { access_token } = useSelector(state => state.auth);
  console.log(!!access_token);
  useEffect(async () => {
    dispatch(startChecking());
  }, [dispatch]);

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
                    component = { DasboardScreen } 
                    isAuthenticated = { !!access_token }
                />
          <Redirect to="/no-found" />
        </Switch>
      </div>
    </Router>
  );
};
