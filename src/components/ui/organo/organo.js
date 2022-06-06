import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { Tabla } from './tabla';
import { fetchOrganos } from '../../../actions/organo'; 
import { types } from '../../../types/types';

export const Organo = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchOrganos().then((res)=>{
      dispatch(getOrgano(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().organo.rows.length <= 0){
      fetchData();
    }
    //fetchData();
  }, []);

  //
  return (
    <>
      <Sidebar componente={Tabla} />
    </>
  );
};

export const getOrgano = organo =>({
  type: types.eventLoadedOrgano,
  payload: organo
});