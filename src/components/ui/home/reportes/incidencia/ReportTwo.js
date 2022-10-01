import React, { useState } from 'react';
import DataTable, { createTheme } from "react-data-table-component";
import { Button, useColorModeValue } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import jsPDF from "jspdf";
import "jspdf-autotable";

import Export from "react-data-table-component"

const FilterComponent = ({ filterText, onFilter }) => (
	<>
		{/* <Input
			id="search"
			type="text"
			placeholder="BUSCAR"
			value={filterText}
			onChange={onFilter}
            size="sm"
            variant="flushed"
            textAlign="center"
		/> */}
	</>
);

// export const Exportar = ({ onExport }) => <Button colorScheme="facebook" _focus={{ boxShadow: "none" }} rightIcon={<DownloadIcon />} size="sm" onClick={e => onExport(e.target.value)}>EXPORTAR</Button>;

export const UsuarioReporte = ({ reportes }) => {

	const reports = reportes;
	// console.log(reports);

	const columns = [
		{
			name: 'USUARIO COMUN',
			selector: row => row?.usuario.nombre + ' ' + row?.usuario.apellido,
			sortable: true,
		},
		{
			name: 'PENDIENTES',
			selector: row => row.pendientes,
			sortable: true,
			center: true,
		},
		{
			name: 'EN TRAMITE',
			selector: row => row.tramitadas,
			sortable: true,
			center: true,
		},
		{
			name: 'ATENDIDOS',
			selector: row => row.atendidas,
			sortable: true,
			center: true,
		},
		{
			name: 'TOTAL',
			selector: row => row.total,
			sortable: true,
			center: true,
		},
	];

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

	const [filterText, setFilterText] = React.useState('');

	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

	const filteredItems = reportes.filter(
		item => item.usuario?.nombre && item.usuario?.nombre.toLowerCase().includes(filterText.toLowerCase()),
	);

	const actionsMemo = React.useMemo(() => <Exportar reportes = { reports } onExport={() => downloadCSV(reportes)} />, []);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />

		);
	}, [filterText, resetPaginationToggle]);


	function convertArrayOfObjectsToCSV(array) {
		const filteredItems = reportes.filter(
			item => item.usuario?.nombre && item.usuario?.nombre.toLowerCase(),
		);

		let result;

		const columnDelimiter = ',';
		const lineDelimiter = '\n';
		const keys = Object.keys(reportes[0]);

		result = '';
		result += keys.join(columnDelimiter);
		result += lineDelimiter;

		array.forEach(item => {
			let ctr = 0;
			keys.forEach(key => {
				if (ctr > 0) result += columnDelimiter;

				result += item[key];

				ctr++;
			});
			result += lineDelimiter;
		});

		return result;
	}

	function downloadCSV(array) {
		const link = document.createElement('a');
		let csv = convertArrayOfObjectsToCSV(array);
		if (csv == null) return;

		const filename = 'export.csv';

		if (!csv.match(/^data:text\/csv/i)) {
			csv = `data:text/csv;charset=utf-8,${csv}`;
		}

		link.setAttribute('href', encodeURI(csv));
		link.setAttribute('download', filename);
		link.click();
	}

	return (
		<DataTable
			columns={columns}
			data={reportes}
			pagination
			paginationResetDefaultPage={resetPaginationToggle}
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead
			paginationPerPage={5}
			paginationRowsPerPageOptions={[5, 15, 20, 30]}
			actions={actionsMemo}
			theme={useColorModeValue('default', 'solarized')}
			responsive={true}
		/>
	);
};

export default {
	title: 'Examples/Filtering',
	component: UsuarioReporte,
};

export const Exportar = ({ reportes }) => {

	const exportPDF = () => {

		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "portrait"; // portrait or landscape
	
		const marginLeft = 40;
		const doc = new jsPDF(orientation, unit, size);
	
		doc.setFontSize(10);
	
		const title = "REPORTE DE TICKETS HÁCIA UN SOPORTE TECNICO";
		const headers = [["TECNICO", "PENDIENTES", "EN TRAMITE", "ATENDIDOS", "TOTAL"]];
	
		const data = reportes.map(row => [row.usuario.nombre + ' ' + row.usuario.apellido, row.pendientes, row.tramitadas, row.atendidas, row.total]);
		console.log(data);
		let content = {
		  startY: 50,
		  head: headers,
		  body: data,
		};
	
		doc.text(title, marginLeft, 40);
		doc.autoTable(content);
		doc.save("report.pdf")
	  }

	return (
		<>
			<Button colorScheme="facebook" _focus={{ boxShadow: "none" }} rightIcon={<DownloadIcon />} size="sm" onClick={ exportPDF }>EXPORTAR PDF</Button>
		</>
	)
}