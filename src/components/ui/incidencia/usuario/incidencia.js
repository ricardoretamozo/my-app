import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import Sidebar from '../../base/Sidebar';
import { fetchIncidencias, fetchIncidenciasPersonas } from '../../../../actions/incidencia'; 
import { types } from '../../../../types/types';
import TableIncidencia from './TableIncidencia';

export const IncidenciaUsuario = () => {
  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchData = async ()=> {
    await fetchIncidencias().then((res)=>{
      dispatch(getIncidencia(res));
    }).catch((err)=>{
      console.log("Acceso no autorizado " + err);
    });
    
  }

  useEffect(() => {    
    if(store.getState().incidencia.checking){
      fetchData();
    }    
  });

  const fetchDataId = async ()=> {
    await fetchIncidenciasPersonas(identificador).then((res)=>{
      dispatch(getIncidenciaId(res));
    }).catch((err)=>{
      console.log("WARN " + err);
    });
    
  }
  useEffect(() => {
    if(store.getState().incidenciaId.checking){
      fetchDataId();
    }
  });

  //
  return (
    <>
      <Sidebar componente={TableIncidencia} />
    </>
  );
};

export const getIncidencia = incidencia =>({
  type: types.eventLoadedIncidencia,
  payload: incidencia
});

export const getIncidenciaId = incidenciaId =>({
  type: types.eventLoadedIncidenciaId,
  payload: incidenciaId
});
