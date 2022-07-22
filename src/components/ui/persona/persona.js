import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { personaList } from '../../../actions/persona';
import { fetchPersonaOrgano } from '../../../actions/personaOrgano';
import { types } from '../../../types/types';
import TablePersona from './TablePersona';

export const Persona = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await personaList().then((res)=>{
      dispatch(getPersona(res));
    });
    
  }

  const fetchDataPersonaOrgano = async () => {
    await fetchPersonaOrgano().then((res)=>{
      dispatch(getPersonaOrgano(res));
    });
    
  }

  useEffect(() => {
    // console.log(store.getState().personaList);
    if(store.getState().persona.checking){
      fetchData();
    }
    if(store.getState().personaOrgano.rows.length <= 0){
      fetchDataPersonaOrgano();
    }
    //fetchData();
  });

  //
  return (
    <>
      <Sidebar componente={TablePersona} />
    </>
  );
};

export const getPersona = persona =>({
  type: types.eventLoadedPersona,
  payload: persona,
});


export const getPersonaOrgano = personaOrgano =>({
  type: types.eventLoadedPersonaOrgano,
  payload: personaOrgano,
});
