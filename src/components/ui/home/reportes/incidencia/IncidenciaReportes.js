import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  useColorModeValue,
  Text,
  HStack,
} from '@chakra-ui/react';

import { store } from '../../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

export default function IncidenciaReportes() {

  const data = store.getState().origenIncidencia.rows;

  const columns = [
    {
      name: 'ORIGEN',
      selector: row => row.origen,
      sortable: true,
      wrap: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

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
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={'md'}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <HStack
        spacing="24px"
        width={'100%'}
        justifyContent={'space-between'}
        verticalAlign={'center'}
        p={4}
      >
        <Box>
          <Text fontSize="lg" fontWeight="600">
            TABLA DE REPORTES INCIDENCIAS
          </Text>
        </Box>
        <Box>
          {/* <OrigenAgregar /> */}
        </Box>
      </HStack>
      <DataTableExtensions {...tableData}>
        <DataTable
          zIndex={-1}
          columns={columns}
          data={data}
          defaultSortAsc={false}
          theme={useColorModeValue('default', 'solarized')}
          pagination
          ignoreRowClick={true}
          responsive={true}
          paginationPerPage={8}
          paginationRowsPerPageOptions={[8, 15, 20, 30]}
        />
      </DataTableExtensions>
    </Box>
  );
}
