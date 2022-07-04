import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchCargos } from '../../../actions/cargo'; 
import { types } from '../../../types/types';
import TableCargo from './TableCargo';

export const Cargo = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchCargos().then((res)=>{
      dispatch(getCargo(res));
    });
    
  }
  useEffect(() => {
    
    if(store.getState().cargo.checking){
      fetchData();
    }
    //fetchData();
  });

  //
  return (
    <>
      <Sidebar componente={TableCargo} />
    </>
  );
};

export const getCargo = cargo =>({
  type: types.eventLoadedCargo,
  payload: cargo
});
