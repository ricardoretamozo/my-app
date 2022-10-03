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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { CalendarIcon, RepeatIcon } from '@chakra-ui/icons';

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
import IncidenciaViewFile from './IncidenciaViewFile';
import { FaFilter } from 'react-icons/fa';
import { AiFillFilter } from 'react-icons/ai';

export default function TableIncidenciaSoporte() {
  const [openAlert, setOpenAlert] = useState(false);
  const { identificador } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [indiceIncidenciaPersonaNotifica, setIncidenciaPersonaNotifica] = useState(identificador);

  const data = store.getState().incidenciasAsignadasSoporte.rows;

  const [tableRowsData, setTableRowsData] = useState(data);

  const ContadorPendientes = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
  const ContadorTramite = data.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
  const ContadorAtendidas = data.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);

  const fetchDataIncidencias = async () => {
    await fetchIncidenciaSoporte(identificador).then((res) => {
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
      },
      persona_notifica: {
        idpersona: indiceIncidenciaPersonaNotifica ? Number(indiceIncidenciaPersonaNotifica) : Number(identificador),
      }
    }
  });

  const ActualizarIncidenciaEnTramite = () => {
    var incidencia = {
      idIncidencia: indice.idIncidencia,
      historialIncidencia: [indice.historialIncidencia]
    }
    dispatch(incidenciaEnTramite(incidencia))
      .then(() => {
        fetchDataIncidencias();
        setOpenAlert(false);
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleClickOpenAlert = (index) => {
    setIndice({ ...indice, idIncidencia: index.idIncidencia });
    setIncidenciaPersonaNotifica(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A")[0].persona_notifica.idpersona);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const refreshTable = () => {
    fetchDataIncidencias();
  }

  // filtros por estado

  const handleClickFilterPendientes = async () => {
    const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
    setTableRowsData(dataFilter);
  }

  const handleClickFilterTramite = async () => {
    const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "T" && pendiente.estado === "A").length > 0);
    setTableRowsData(dataFilter);
  }

  const handleClickFilterAtendidas = async () => {
    const dataFilter = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "A" && pendiente.estado === "A").length > 0);
    setTableRowsData(dataFilter);
  }

  const columns = [
    {
      name: 'USUARIO',
      selector: row => row.persona?.nombre + ' ' + row.persona?.apellido,
      sortable: true,
    },
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
    },
    {
      name: 'FECHA Y HORA',
      selector: row => Moment(row.fecha).format("DD/MM/YYYY - HH:mm:ss"),
      sortable: true,
    },
    {
      name: 'IP',
      selector: row => row.historialIncidencia.filter(p => p.estado === 'A' ? p.ip : null),
      // selector: row => row.historialIncidencia.ip,
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A' ? p.ip : null);
        return (
          <Text>
            {historial[0].ip}
          </Text>
        )
      }
    },
    {
      name: 'ESTADO',
      // selector: row => row.historialIncidencia.map(row => row.estado === 'A' ? row.estado : ''),
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <div>
            <Badge
              bg={historial[0].estadoIncidencia === 'P' ? 'red.500' : historial[0].estadoIncidencia === 'T' ? 'yellow.500' : 'green.500'}
              color={'white'}
              p="3px 10px"
              w={24}
              textAlign={'center'}
              borderRadius={'md'}
              fontSize={'10px'}
            >
              {historial[0].estadoIncidencia === 'P' ? 'PENDIENTE' : historial[0].estadoIncidencia === 'T' ? 'EN TRÁMITE' : 'ATENDIDO'}
            </Badge>
          </div>
        )
      },
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        var archivosTecnico = row.incidenciaArchivos?.usuario === "R" ? row.incidenciaArchivos : null;
        return (
          <div>
            {historial[0].estadoIncidencia === 'P' ? (
              <div>
                <IncidenciaDetalles
                  rowId={row.idIncidencia}
                  identificador={identificador}
                />
                {archivosTecnico !== null ? (
                  <IncidenciaViewFile
                    rowData={row.incidenciaArchivos}
                    typeFile = {archivosTecnico.file}
                  />
                ) : (null)}
                <IconButton
                  icon={<CalendarIcon />}
                  variant={'outline'}
                  colorScheme={'yellow'}
                  onClick={() => handleClickOpenAlert(row)}
                  size={'sm'}
                  fontSize={'20px'}
                  ml={1}
                  _focus={{ boxShadow: "none" }}
                />
                <IncidenciaAtender
                  rowId={row.idIncidencia}
                />
              </div>
            ) : (
              historial[0].estadoIncidencia === 'T' ? (
                <>
                  <IncidenciaDetalles
                    rowId={row.idIncidencia}
                    identificador={identificador}
                  />
                  {archivosTecnico !== null ? (
                    <IncidenciaViewFile
                      rowData={row.incidenciaArchivos}
                      typeFile = {archivosTecnico.file}
                    />
                  ) : (null)}
                  <IncidenciaAtender
                    rowId={row.idIncidencia}
                  />
                </>
              ) : (
                <IncidenciaDetalles
                  rowId={row.idIncidencia}
                  identificador={identificador}
                />
              )
            )}
            <AlertDialog isOpen={openAlert} onClose={handleCloseAlert} size={'3xl'}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="xl" fontWeight="bold">
                    ¿DESEA CAMBIAR EL ESTADO, EN TRÁMITE?
                  </AlertDialogHeader>
                  <AlertDialogCloseButton _focus={{ boxShadow: "none" }} />
                  <AlertDialogBody>
                    <Box px={2}>
                      <Text>¿CONFIRMAR LA ACCIÓN?</Text>
                    </Box>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button onClick={handleCloseAlert} _focus={{ boxShadow: "none" }} colorScheme="red">CANCELAR</Button>
                    <Button
                      bg={'yellow.500'}
                      _hover={{ bg: 'yellow.600' }}
                      color={'white'}
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
      width: '200px',
      wrap: true,
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
                {ContadorPendientes.length}
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
                {ContadorTramite.length}
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
                {ContadorAtendidas.length}
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
          px={4}
        >
          <Box>
            <Text fontSize="lg" fontWeight="600">
              INCIDENCIAS ASIGNADAS A MI PERSONA
            </Text>
          </Box>
          <Box>
            <Menu size={'xs'}>
              <MenuButton as={'menu'} style={{ cursor: 'pointer'}}>
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="600">
                    FILTRAR POR ESTADO
                  </Text>
                  <IconButton colorScheme={'twitter'} icon={<FaFilter />} size="sm" />
                </HStack>
              </MenuButton>
              <MenuList zIndex={2}>
                <MenuItem onClick={handleClickFilterPendientes} icon={<AiFillFilter color='red' size={'20px'} />}>PENDIENTES</MenuItem>
                <MenuItem onClick={handleClickFilterTramite} icon={<AiFillFilter color='#d69e2e' size={'20px'} />}>EN TRAMITE</MenuItem>
                <MenuItem onClick={handleClickFilterAtendidas} icon={<AiFillFilter color='green' size={'20px'} />}>ATENDIDAS</MenuItem>
                <MenuItem icon={<AiFillFilter size={'20px'} />} onClick={refreshTable}>TODOS</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <IconButton
              size={'sm'} mr={2}
              icon={<RepeatIcon boxSize={4} />}
              colorScheme={'facebook'}
              _focus={{ boxShadow: "none" }}
              onClick={refreshTable}
            />
            <IncidenciaAgregar />
          </Box>
        </HStack>
        <DataTableExtensions columns={columns} data={tableRowsData}>
          <DataTable
            defaultSortAsc={false}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            responsive={true}
            paginationPerPage={10}
            noDataComponent="No hay datos para mostrar refresca la página"
            paginationRowsPerPageOptions={[10, 15, 20, 30]}
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por página:',
              rangeSeparatorText: 'de',
              selectAllRowsItem: true,
              selectAllRowsItemText: 'Todos',
            }}           
            fixedHeader
            fixedHeaderScrollHeight="550px"
            key={ tableRowsData.map((item) => { return item.idIncidencia }) }
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
