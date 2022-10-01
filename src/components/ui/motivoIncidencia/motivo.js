import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchMotivos } from '../../../actions/motivo';
import { types } from '../../../types/types';
import TableMotivo from './TableMotivo';

export const Motivo = () => {
  
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchMotivos().then((res)=>{
      dispatch(getMotivo(res));
    }).catch((err)=>{
      console.log("WARN " + err);
    });
  }

  useEffect(() => {
    if(store.getState().motivo.checking){
      fetchData();
    }
  });

  //
  return (
    <>
      <Sidebar componente={TableMotivo} />
    </>
  );
};

export const getMotivo = motivo =>({
  type: types.eventLoadedMotivo,
  payload: motivo
});
