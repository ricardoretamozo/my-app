import React from 'react';
import Sidebar from '../../../base/Sidebar';
import IncidenciaReportes from './IncidenciaReportes';
import SegundoReporte from './SegundoReporte';
import TercerReporte from './TercerReporte';

export const ReporteIncidencia = () => {

  return (
    <>
      <Sidebar componente={IncidenciaReportes} />
    </>
  );
};

export const IncidenciaSegundoReporte = () => {

  return (
    <>
      <Sidebar componente={SegundoReporte} />
    </>
  );
};

export const IncidenciaTercerReporte = () => {

  return (
    <>
      <Sidebar componente={TercerReporte} />
    </>
  );
};