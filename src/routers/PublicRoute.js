import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  rol,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
        (rol == '[COORDINADOR INFORMATICO]') ? (
          <Redirect to="/dashboard/incidencias"/>
        ) : (rol == '[ASISTENTE INFORMATICO]') ? (
          <Redirect to="/dashboard/incidencias_asignadas"/>
        ) : (rol == '[SOPORTE TECNICO]') ? (
          <Redirect to="/dashboard/soporte/incidencias" />
        ) : (
          <Redirect to="/usuario" />
        ))
      }
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
