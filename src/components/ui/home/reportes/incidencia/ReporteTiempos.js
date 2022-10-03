import React from 'react';
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useColorModeValue } from '@chakra-ui/react';
import "jspdf-autotable";

import Moment from 'moment';

export default function ReporteTiempos({ reportes }) {
  
	const columns = [
		{
			name: 'USUARIO COMUN',
			selector: row => row.usuarioComun?.nombre + ' ' + row.usuarioComun?.apellido,
			sortable: true,
			cellExport: row => row.usuarioComun?.nombre + ' ' + row.usuarioComun?.apellido,
		},
		{
			name: 'USUARIO TÉCNICO',
			selector: row => row.usuarioTecnico !== null ? row.usuarioTecnico?.nombre + ' ' + row.usuarioTecnico?.apellido : 'SIN ASIGNAR',
			sortable: true,
			cellExport: row => row.usuarioTecnico !== null ? row.usuarioTecnico?.nombre + ' ' + row.usuarioTecnico?.apellido : 'SIN ASIGNAR',
		},
		{
			name: 'FECHA REGISTRO',
			selector: row => Moment(row.registroPendiente).format("DD/MM/YYYY - HH:mm:ss"),
			sortable: true,
			cellExport: row => Moment(row.registroPendiente).format("DD/MM/YYYY - HH:mm:ss"),
			center: true,
		},
		{
			name: 'TRANSCURRIDO',
			selector: row => row.tiempoTranscurridoPendiente ?? '',
            sortable: true,
			center: true,
			cell : row => {
				var dateOne = Moment(row.registroPendiente, "YYYY-MM-DD HH:mm:ss");
				var dateTwo = Moment(row.registroTramitado, "YYYY-MM-DD HH:mm:ss");
				
				var diffD = dateTwo.diff(dateOne, 'd');
				var diffH = dateTwo.diff(dateOne, 'h').toString().slice(-2);
				var diffM = dateTwo.diff(dateOne, 'm').toString().slice(-2);
				var diffS = dateTwo.diff(dateOne, 's').toString().slice(-2);

				if (row.tiempoTranscurridoPendiente  !== null){
					return (
						<div>
							{diffD !== 0 ? diffD + 'd ' : ''}{diffH !== 0 ? diffH + 'h:' : ''}{diffM !== 0 ? diffM + 'm:' : ''}{diffS !== 0 ? diffS + 's' : ''}
						</div>
					)
				}
			},
			cellExport: row => {
				var dateOne = Moment(row.registroPendiente, "YYYY-MM-DD HH:mm:ss");
				var dateTwo = Moment(row.registroTramitado, "YYYY-MM-DD HH:mm:ss");
				
				var diffD = dateTwo.diff(dateOne, 'd');
				var diffH = dateTwo.diff(dateOne, 'h').toString().slice(-2);
				var diffM = dateTwo.diff(dateOne, 'm').toString().slice(-2);
				var diffS = dateTwo.diff(dateOne, 's').toString().slice(-2);

				if (row.tiempoTranscurridoPendiente  !== null){
					return (
						<div>
							{diffD !== 0 ? diffD + 'd ' : ''}{diffH !== 0 ? diffH + 'h:' : ''}{diffM !== 0 ? diffM + 'm:' : ''}{diffS !== 0 ? diffS + 's' : ''}
						</div>
					)
				}
			},
		},
		{
			name: 'EN TRÁMITE',
            selector: row => row.registroTramitado !== null ? Moment(row.registroTramitado).format("DD/MM/YYYY - HH:mm:ss") : '',
			sortable: true,
			center: true,
			cellExport: row => row.registroTramitado !== null ? Moment(row.registroTramitado).format("DD/MM/YYYY - HH:mm:ss") : '',
		},
		{
			name: 'TRANSCURRIDO',
			selector: row => row.tiempoTranscurridoTramitado ?? '',
			cell: row => {
				var dateOne = Moment(row.registroTramitado, "YYYY-MM-DD HH:mm:ss");
				var dateTwo = Moment(row.registroAtendido, "YYYY-MM-DD HH:mm:ss");
				
				var diffD = dateTwo.diff(dateOne, 'd');
				var diffH = dateTwo.diff(dateOne, 'h').toString().slice(-2);
				var diffM = dateTwo.diff(dateOne, 'm').toString().slice(-2);
				var diffS = dateTwo.diff(dateOne, 's').toString().slice(-2);

				if (row.tiempoTranscurridoTramitado  !== null){
					return (
						<div>
						     {diffD !== 0 ? diffD + 'd ' : ''}{diffH !== 0 ? diffH + 'h:' : ''}{diffM !== 0 ? diffM + 'm:' : ''}{diffS !== 0 ? diffS + 's' : ''}
						</div>
					)
				}
			},
			sortable: true,
			center: true,
			cellExport: row => {
				var dateOne = Moment(row.registroTramitado, "YYYY-MM-DD HH:mm:ss");
				var dateTwo = Moment(row.registroAtendido, "YYYY-MM-DD HH:mm:ss");
				
				var diffD = dateTwo.diff(dateOne, 'd');
				var diffH = dateTwo.diff(dateOne, 'h').toString().slice(-2);
				var diffM = dateTwo.diff(dateOne, 'm').toString().slice(-2);
				var diffS = dateTwo.diff(dateOne, 's').toString().slice(-2);

				if (row.tiempoTranscurridoTramitado  !== null){
					return (
						<div>
						     {diffD !== 0 ? diffD + 'd ' : ''}{diffH !== 0 ? diffH + 'h:' : ''}{diffM !== 0 ? diffM + 'm:' : ''}{diffS !== 0 ? diffS + 's' : ''}
						</div>
					)
				}
			}
		},
        {
			name: 'ATENDIDO',
			selector: row => row.registroAtendido !== null ? Moment(row.registroAtendido).format("DD/MM/YYYY - HH:mm:ss") : '',
			sortable: true,
			center: true,
			cellExport: row => row.registroAtendido !== null ? Moment(row.registroAtendido).format("DD/MM/YYYY - HH:mm:ss") : '',
		},
	];

  
	// CREANDO UN TEMA PARA LA TABLA
	createTheme('solarized', {
	  text: {
		primary: '#FFF',
		secondary: '#FFF',
	  },
	  background: {
		default: '#171923',
	  },
	  context: {
		background: '#171923',
		text: '#FFF',
	  },
	  divider: {
		default: '#FFF opacity 92%',
	  },
	});
  
	return (
		<DataTableExtensions columns={columns} data={reportes}>
 			<DataTable
				pagination
				persistTableHead
				paginationPerPage={5}
				paginationRowsPerPageOptions={[10, 15, 20, 30]}
				theme={useColorModeValue('default', 'solarized')}
				responsive={true}
			/>
		</DataTableExtensions>
	);
  }