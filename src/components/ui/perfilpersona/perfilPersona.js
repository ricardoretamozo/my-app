import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import Tables from './TablePersonaOrgano';
import { perfilPersona } from '../../../actions/perfilPersona'; 
import { types } from '../../../types/types';

export const PerfilPersona = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await perfilPersona().then((res)=>{
      dispatch(getPerfilPersona(res));
    });
    
  }
  useEffect(() => {
    console.log(store.getState().perfilPersona);
    if(store.getState().perfilPersona.rows.length <= 0){
      fetchData();
    }
    //fetchData();
  });

  //
  return (
    <>
      <Sidebar componente={Tables} />
    </>
  );
};

export const getPerfilPersona = perfil =>({
  type: types.eventLoadedPerfil,
  payload: perfil,
});
