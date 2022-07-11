import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  rol,
  component: Component,
  ...rest
}) => {
  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      component={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : ((rol == '[COORDINADOR INFORMATICO]' || rol == '[SOPORTE TECNICO]') ? (
          <Redirect to="/dashboard/home" />
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
