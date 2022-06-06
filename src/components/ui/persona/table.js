import React from 'react';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  TableContainer,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import { store } from '../../../store/store';

import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { columns } from './Data';

export default function TablesPersona () {

const data = store.getState().personaList.rows;

  console.log(data);
  const tableData = {
    columns,
    data,
  };

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data }, useSortBy);

  return (
    <Box  borderWidth='1px' borderRadius='lg' overflow='hidden' bg={useColorModeValue('white', 'gray.900')}>
          <DataTableExtensions
            {...tableData}
            >
            <DataTable
                data={data}
                noHeader
                defaultSortAsc={false}
                pagination
                highlightOnHover
            />
            </DataTableExtensions>
    </Box>
  );
};
