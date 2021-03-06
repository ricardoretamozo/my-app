import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store/store';
import Sidebar from '../../base/Sidebar';
import { fetchIncidenciasPersonas, fetchIncidenciasAsignadas, fetchIncidenciasNoAsignadas, fetchTecnicosDisponibles } from '../../../../actions/incidencia'; 
import { types } from '../../../../types/types';
import TableIncidenciaAsignados from './TableIncidencia';
import TableIncidenciaNoAsignados from './TableIncidenciaNoAsignado';

export const IncidenciaAsistenteAsignados = () => {

  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchIncidenciasAsignadasData = async ()=> {
    await fetchIncidenciasAsignadas().then((res)=>{
      dispatch(getIncidenciaAsignadas(res));
    });
  }
  useEffect(() => {
    
    if(store.getState().incidenciasAsignadas.checking){
      fetchIncidenciasAsignadasData();
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
    //fetchData();
  });

  //
  return (
    <>
      <Sidebar componente={TableIncidenciaAsignados} />
    </>
  );
};

export const IncidenciaAsistenteNoAsignados = () => {

  const dispatch = useDispatch();

  const { identificador } = useSelector(state => state.auth);

  const fetchIncidenciasNoAsignadasData = async ()=> {
    await fetchIncidenciasNoAsignadas().then((res)=>{
      dispatch(getIncidenciaNoAsignadas(res));
    });
  }
  useEffect(() => {
    if(store.getState().incidenciasNoAsignadas.checking){
      fetchIncidenciasNoAsignadasData();
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

  // INCIDENCIAS POR CADA USUARIO

  const fetchDataTecnicoDisponible = async ()=> {
    await fetchTecnicosDisponibles().then((res)=>{
      dispatch(getTecnicosDisponibles(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().tecnicoDisponible.checking){
      fetchDataTecnicoDisponible();
    }
    //fetchData();
  });

  //
  return (
    <>
      <Sidebar componente={TableIncidenciaNoAsignados} />
    </>
  );
};


export const getIncidenciaAsignadas = incidenciasAsignadas => ({
  type: types.eventLoadedIncidenciasAsignadas,
  payload: incidenciasAsignadas
});

export const getIncidenciaNoAsignadas = incidenciasNoAsignadas => ({
  type: types.eventLoadedIncidenciasNoAsignadas,
  payload: incidenciasNoAsignadas
});

export const getIncidenciaId = incidenciaId =>({
  type: types.eventLoadedIncidenciaId,
  payload: incidenciaId
});

export const getTecnicosDisponibles = tecnicoDisponibles => ({
  type: types.eventLoadedTecnicoDisponible,
  payload: tecnicoDisponibles
});