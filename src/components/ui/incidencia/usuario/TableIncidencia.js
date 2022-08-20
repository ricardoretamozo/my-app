import React from 'react';
import {
  Box,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  chakra,
  Flex,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react';
import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Moment from 'moment';
import IncidenciaAgregar from './IncidenciaAgregar';
import { RepeatIcon } from '@chakra-ui/icons';
import { fetchIncidenciasPersonas } from '../../../../actions/incidencia';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidenciaId } from '../incidencia';

export default function TableIncidencia() {

  const { identificador } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  var data = store.getState().incidenciaId.rows;
  console.log(data)

  const incidenciasPendientes = data.filter(row => row.historialIncidencia.estadoIncidencia === 'P');
  const incidenciasEnTramite = data.filter(row => row.historialIncidencia.estadoIncidencia === 'T');
  const incidenciasAtendidas = data.filter(row => row.historialIncidencia.estadoIncidencia === 'A');

  const fetchDataId = async () => {
    await fetchIncidenciasPersonas(identificador).then((res) => {
      dispatch(getIncidenciaId(res));
    });
  }

  const refreshTable = () => {
    fetchDataId();
  }

  const columns = [
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
      reorder: true,
    },
    {
      name: 'DESCRIPCION',
      selector: row => row.descripcion,
      sortable: true,
      reorder: true,
      hide: 'md',
      maxWidth: '20rem',
    },
    {
      name: 'FECHA Y HORA',
      selector: row => Moment(row.fecha).format("DD/MM/YYYY - HH:mm:ss"),
      sortable: true,
      reorder: true,
    },
    {
      name: 'TÉCNICO ASIGNADO',
      selector: row => row.historialIncidencia.persona_asignado == null ? "NO ASIGNADO" : row.historialIncidencia.persona_asignado.nombre + " " + row.historialIncidencia.persona_asignado.apellido,
      sortable: true,
      wrap: false,
    },
    {
      name: 'ESTADO',
      selector: row => row.historialIncidencia.estadoIncidencia,
      sortable: true,
      cell: row => (
        <Badge
          bg={row.historialIncidencia.estadoIncidencia === 'P' ? 'red.500' : row.historialIncidencia.estadoIncidencia === 'T' ? 'yellow.500' : 'green.500'}
          color={'white'}
          p="4px 0px"
          w={24}
          textAlign={'center'}
          borderRadius={'md'}
          fontSize={'10px'}
        >
          {row.historialIncidencia.estadoIncidencia === 'P' ? 'PENDIENTE' : row.historialIncidencia.estadoIncidencia === 'T' ? 'EN TRAMITE' : 'ATENTIDO'}
        </Badge>
      ),
      center: true,
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
    <>
      <Box borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'md'}
        mb={4}
        p={2}
        fontSize={['6px', '9px', '10px', '12px']}
        bg={useColorModeValue('gray.100', 'gray.900')} >
        <SimpleGrid columns={4} spacing={5} textColor={'white'}>
          <Box
            w={'100%'}
            bg="white"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign={'center'}
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="red.500"
              _dark={{ color: "white" }}
            >
              INCIDENCIAS PENDIENTES
            </chakra.h3>
            <Flex
              alignItems="center"
              justify={'center'}
              py={2}
              w={'100%'}
              bg="red.500"
              _dark={{ bg: "gray.700" }}
            >
              <chakra.span
                fontWeight="bold"
                color="white"
                _dark={{ color: "gray.200" }}
              >
                {incidenciasPendientes.length}
              </chakra.span>
            </Flex>
          </Box>
          <Box
            w={'100%'}
            bg="white"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign={'center'}
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="yellow.500"
              _dark={{ color: "white" }}
            >
              Incidencias en Tramite
            </chakra.h3>
            <Flex
              alignItems="center"
              justify={'center'}
              py={2}
              px={3}
              bg="yellow.500"
              _dark={{ bg: "gray.700" }}
            >
              <chakra.span
                fontWeight="bold"
                color="gray.200"
                _dark={{ color: "gray.200" }}
              >
                {incidenciasEnTramite.length}
              </chakra.span>
            </Flex>
          </Box>
          <Box
            w={'100%'}
            bg="white"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign={'center'}
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="green.500"
              _dark={{ color: "white" }}
            >
              INCIDENCIAS ATENDIDAS
            </chakra.h3>
            <Flex
              alignItems="center"
              justify={'center'}
              py={2}
              px={3}
              bg="green.500"
              _dark={{ bg: "gray.700" }}
            >
              <chakra.span
                fontWeight="bold"
                color="white"
                _dark={{ color: "gray.200" }}
              >
                {incidenciasAtendidas.length}
              </chakra.span>
            </Flex>
          </Box>
          <Box
            w={'100%'}
            bg="white"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign={'center'}
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.600"
              _dark={{ color: "white" }}
            >
              TOTAL DE INCIDENCIAS
            </chakra.h3>
            <Flex
              alignItems="center"
              justify={'center'}
              py={2}
              px={3}
              bg="gray.600"
              _dark={{ bg: "gray.700" }}
            >
              <chakra.span
                fontWeight="bold"
                color="white"
                _dark={{ color: "gray.200" }}
              >
                {data.length}
              </chakra.span>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'md'}
        bg={useColorModeValue('white', 'gray.900')}
        paddingBottom={8}
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
              MIS INCIDENCIAS REPORTADAS
            </Text>
          </Box>
          <Box>
            <IconButton 
              size={'sm'} mr={2} 
              icon={<RepeatIcon boxSize={4} />} 
              colorScheme={'facebook'}
              _focus={{ boxShadow: "none" }}
              onClick={refreshTable} />
            <IncidenciaAgregar />
          </Box>
        </HStack>
        <DataTableExtensions {...tableData}>
          <DataTable
            defaultSortAsc={false}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            paginationPerPage={6}
            noDataComponent="No hay datos para mostrar refresca la página"
            paginationRowsPerPageOptions={[6, 15, 20, 30]}
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
