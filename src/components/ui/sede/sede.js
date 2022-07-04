import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchSedes } from '../../../actions/sede'; 
import { types } from '../../../types/types';
import TableSede from './TableSede';

export const Sede = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchSedes().then((res)=>{
      dispatch(getSede(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().sede.checking){
      fetchData();
    }
    //fetchData();
  });

  //
  return (
    <>
      <Sidebar componente={TableSede} />
    </>
  );
};

export const getSede = sede =>({
  type: types.eventLoadedSede,
  payload: sede
});
