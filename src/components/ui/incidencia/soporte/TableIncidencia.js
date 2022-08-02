import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  useColorModeValue,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  Text,
  HStack,
  Badge,
  IconButton,
  AlertDialogCloseButton,
  SimpleGrid,
  chakra,
  Flex,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import IncidenciaAgregar from '../IncidenciaAgregar';
import IncidenciaDetalles from '../IncidenciaDetalles';
import IncidenciaAtender from './IncidenciaAtender';
import { incidenciaEnTramite, fetchIncidenciaSoporte } from '../../../../actions/incidencia';
import { getIncidenciasAsignadasSoporte } from './incidencia';
import Moment from 'moment';

export default function TableIncidenciaSoporte() {
  const [openAlert, setOpenAlert] = React.useState(false);
  const { identificador } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const data = store.getState().incidenciasAsignadasSoporte.rows;
  const incidenciasPendientes = data.filter(row => row.historialIncidencia.estadoIncidencia === 'P');
  const incidenciasEnTramite = data.filter(row => row.historialIncidencia.estadoIncidencia === 'T');
  const incidenciasAtendidas = data.filter(row => row.historialIncidencia.estadoIncidencia === 'A');


  const fetchDataIncidencias = async () => {
    await fetchIncidenciaSoporte(identificador).then((res)=>{
      dispatch(getIncidenciasAsignadasSoporte(res));
    });
  }

  const [indice, setIndice] = useState({
    idIncidencia: null,
    historialIncidencia: {
      persona_registro: {
        idpersona: Number(identificador)
      },
      persona_asignado: {
        idpersona: Number(identificador)
      }
    }
  });

  const ActualizarIncidenciaEnTramite = () => {
    var incidencia = {
      idIncidencia: indice.idIncidencia,
      historialIncidencia: indice.historialIncidencia
    }
    dispatch(incidenciaEnTramite(incidencia))
    .then(() => {
      fetchDataIncidencias();
      setOpenAlert(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleClickOpenAlert = index => {
    setIndice({...indice, idIncidencia : index});
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    {
      name: 'USUARIO',
      selector: row => row.persona.nombre + ' ' + row.persona.apellido,
      sortable: true,
    },
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
    },
    {
        name: 'FECHA Y HORA',
        selector: row => Moment(row.historialIncidencia.fecha).format("DD/MM/YYYY - HH:mm:ss"),
        sortable: true,
    },
    {
      name: 'IP',
      selector: row => row.historialIncidencia.ip,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.historialIncidencia.estadoIncidencia,
      sortable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.historialIncidencia.estadoIncidencia === 'P' ? 'red.500' : row.historialIncidencia.estadoIncidencia === 'T' ? 'yellow.500': 'green.500'}
            color={'white'}
            p="4px 10px"
            w={24}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'10px'}
          >
            {row.historialIncidencia.estadoIncidencia === 'P' ? 'PENDIENTE' : row.historialIncidencia.estadoIncidencia === 'T' ? 'EN TRAMITE' : 'ATENTIDO'}
          </Badge>
        </div>
      ),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => {
        return (
          <div>
          {row.historialIncidencia.estadoIncidencia === 'P' ? (
            <div>
              <IncidenciaDetalles 
                rowId = {row.idIncidencia}
                identificador = { identificador }
              />
              <IconButton
                icon={<CalendarIcon />}
                variant={'outline'}
                colorScheme={'yellow'}
                onClick={() => handleClickOpenAlert(row.idIncidencia)}
                fontSize='20px'
                size={'sm'}
                ml={1}
                _focus={{ boxShadow: "none" }}
              />
              <IncidenciaAtender 
                rowId = {row.idIncidencia}
              />
            </div>
          ) : (
            row.historialIncidencia.estadoIncidencia === 'T' ? (
              <div>
              <IncidenciaDetalles 
                rowId = {row.idIncidencia}
                identificador = { identificador }
              />
              <IncidenciaAtender 
                rowId = {row.idIncidencia}
              />
              </div>
            ) : (
              <IncidenciaDetalles 
                rowId = {row.idIncidencia}
                identificador = { identificador }
              />
            )
          )}
          <AlertDialog isOpen={openAlert} onClose={handleCloseAlert} size={'3xl'}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="xl" fontWeight="bold">
                  ¿DESEA DERIVAR EL ESTADO DE LA INCIDENCIA, EN TRÁMITE?
                </AlertDialogHeader>
                <AlertDialogCloseButton _focus={{ boxShadow: "none" }}/>
                <AlertDialogBody>
                  <Box px={2}>
                      <Text>¿CONFIRMAR LA ACCIÓN?</Text>
                  </Box>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={handleCloseAlert} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
                  <Button
                    colorScheme="blue"
                    ml={3}
                    _focus={{ boxShadow: "none" }}
                    onClick={() => ActualizarIncidenciaEnTramite()}
                  >
                    CONFIRMAR
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          </div>
        );
      },
      center: true,
      width: '140px',
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
              INCIDENCIAS ASIGNADAS A MI PERSONA
            </Text>
          </Box>
          <Box>
            <IncidenciaAgregar />
          </Box>
        </HStack>
        <DataTableExtensions columns={columns} data={data}>
          <DataTable
            defaultSortAsc={false}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            responsive={true}
            paginationPerPage={8}
            noDataComponent="No hay datos para mostrar refresca la página"
            paginationRowsPerPageOptions={[8, 15, 20, 30]}
            
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
