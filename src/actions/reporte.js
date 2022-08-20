import { fetchToken } from '../helpers/fetch';
import { notification } from '../helpers/alert';


// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRÁMITE

export const fetchReporteTecnicos = async(datos) => {
    
    const response = await fetchToken(`reporte/incidencia/tecnico`,
    {
        startDate: datos.fechaInicio,
        endDate: datos.fechaActual,
        sede: {idSede: datos.sede.idSede},
    }, 'POST');
    const body = await response.json();

    const ReporteTecnico = {};
    const data = [];

    body.forEach(x => {
        data.push({
        usuario: x.usuario,
        pendientes: x.pendientes,
        tramitadas: x.tramitadas,
        atendidas: x.atendidas,
        total: x.total,
        });
    });

    ReporteTecnico.data = data;

    return ReporteTecnico;

  };