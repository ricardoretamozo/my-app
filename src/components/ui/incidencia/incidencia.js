import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchIncidencias } from '../../../actions/incidencia'; 
import { types } from '../../../types/types';
import TableIncidencia from './TableIncidencia';

export const Incidencia = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchIncidencias().then((res)=>{
      dispatch(getIncidencia(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().incidencia.checking){
      fetchData();
    }
    //fetchData();
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
