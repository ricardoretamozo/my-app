import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { personaList } from '../../../actions/persona'; 
import { types } from '../../../types/types';
import TablesPersona from './table';

export const Persona = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await personaList().then((res)=>{
      dispatch(getPersona(res));
    });
    
  }
  useEffect(() => {
    // console.log(store.getState().personaList);
    if(store.getState().persona.rows.length <= 0){
      fetchData();
    }
    //fetchData();
  }, []);

  //
  return (
    <>
      <Sidebar componente={TablesPersona} />
    </>
  );
};

export const getPersona = persona =>({
  type: types.eventLoadedPersona,
  payload: persona,
});
