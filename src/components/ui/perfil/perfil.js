import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../base/Sidebar';
import { Tabla } from './tabla';
import { perfilPersona } from '../../../actions/perfilPersona'; 
import { types } from '../../../types/types';

export const Perfil = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const PerfilPersona = await perfilPersona();
      dispatch(getPerfilPersona(PerfilPersona));
    }
    fetchData();
  }, [dispatch]);

  //
  return (
    <>
      <Sidebar componente={Tabla} />
    </>
  );
};

export const getPerfilPersona = perfil => ({
  type: types.eventLoadedPerfil,
  payload: perfil,
});
