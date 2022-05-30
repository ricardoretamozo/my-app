import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {SidebarWithHeader} from './base/Sidebar';
import { Flex, Text, IconButton } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { LoginScreen } from '../auth/LoginScreen';
import { home } from './home/home';
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
        component = { SidebarWithHeader({componente : home}) } 
        isAuthenticated = { !!access_token }
        />
      </Switch>
    </>
  );
};
