import { fetchToken } from '../helpers/fetch';


// ACTUALIZAR EL ESTADO DE LA INCIDENCIA EN TRÁMITE

export const fetchReporteTecnicos = async(datos) => {
    
    const response = await fetchToken(`reporte/incidencia/tecnico`,
    {
        startDate: datos.fechaInicio,
        endDate: datos.fechaActual,
        sede: datos.sede[0],
    }, 'POST');
    
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error);
    }else{
        return body;
    }
  };

  export const fetchReporteUsuario = async(datos) => {
    
    const response = await fetchToken(`reporte/incidencia/usuario`,
    {
        startDate: datos.fechaInicio,
        endDate: datos.fechaActual,
        sede: datos.sede[0],
    }, 'POST');
    const body = await response.json();

    const ReporteUsuario = {};
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

    ReporteUsuario.data = data;

    return ReporteUsuario;

  };

  export const fetchReporteTiempo = async(datos) => {
    
    const response = await fetchToken(`reporte/incidencia/tiempo`,
    {
        startDate: datos.fechaInicio,
        endDate: datos.fechaActual,
        sede: datos.sede[0],
    }, 'POST');
    const body = await response.json();

    const ReporteTiempo = {};
    const data = [];

    body.forEach(x => {
        data.push({
        usuarioComun: x.usuarioComun,
        usuarioTecnico: x.usuarioTecnico,
        registroPendiente: x.registroPendiente,
        tiempoTranscurridoPendiente: x.tiempoTranscurridoPendiente,
        registroTramitado: x.registroTramitado,
        tiempoTranscurridoTramitado: x.tiempoTranscurridoTramitado,
        registroAtendido: x.registroAtendido,
        });
    });

    ReporteTiempo.data = data;

    return ReporteTiempo;

  };