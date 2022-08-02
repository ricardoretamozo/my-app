import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchOrigen } from '../../../actions/origenIncidencia';
import { types } from '../../../types/types';
import TableOrigen from './TableOrigen';

export const OrigenIncidencia = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchOrigen().then((res)=>{
      dispatch(getOrigen(res));
    });
  }

  useEffect(() => {
    
    if(store.getState().origenIncidencia.checking){
      fetchData();
    }
    //fetchData();
  });

  //
  return (
    <>
      <Sidebar componente={TableOrigen} />
    </>
  );
};

export const getOrigen = origen =>({
  type: types.eventLoadedOrigenIncidencia,
  payload: origen
});
