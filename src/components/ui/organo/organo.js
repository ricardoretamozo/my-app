import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store/store';
import Sidebar from '../base/Sidebar';
import { fetchOrganos } from '../../../actions/organo'; 
import { types } from '../../../types/types';
import TableOrgano from './TableOrgano';

export const Organo = () => {
  const dispatch = useDispatch();

  const fetchData= async ()=> {
    await fetchOrganos().then((res)=>{
      dispatch(getOrgano(res));
    }).catch((err)=>{
      // console.log("WARN " + err);
    });
  }

  useEffect(() => {
    if(store.getState().organo.checking){
      fetchData();
    }
  });

  return (
    <>
      <Sidebar componente={TableOrgano} />
    </>
  );
};

export const getOrgano = organo =>({
  type: types.eventLoadedOrgano,
  payload: organo
});
