import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import Sidebar from '../../base/Sidebar';
import { fetchIncidenciasPersonas, fetchIncidenciaSoporte } from '../../../../actions/incidencia'; 
import { types } from '../../../../types/types';
import TableIncidenciaSoporte from './TableIncidencia';

export const IncidenciaSoporte = () => {

  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchIncidenciaSoporteData = async ()=> {
    await fetchIncidenciaSoporte(identificador).then((res)=>{
      dispatch(getIncidenciasAsignadasSoporte(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().incidenciasAsignadasSoporte.checking){
      fetchIncidenciaSoporteData();
    }
  });

  const fetchDataId = async ()=> {
    await fetchIncidenciasPersonas(identificador).then((res)=>{
      dispatch(getIncidenciaId(res));
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
      <Sidebar componente={TableIncidenciaSoporte} />
    </>
  );
};

export const getIncidenciasAsignadasSoporte = incidenciasSoporte =>({
  type: types.eventLoadedIncidenciasAsignadasSoporte,
  payload: incidenciasSoporte
});

export const getIncidenciaId = incidenciaId =>({
  type: types.eventLoadedIncidenciaId,
  payload: incidenciaId
});
