import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { Tabla } from './tabla';
import { fetchOficinas } from '../../../actions/oficina'; 
import { types } from '../../../types/types';

export const Oficina = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchOficinas().then((res)=>{
      dispatch(getOficina(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().oficina.rows.length <= 0){
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

export const getOficina = oficina =>({
  type: types.eventLoadedOficina,
  payload: oficina
});
