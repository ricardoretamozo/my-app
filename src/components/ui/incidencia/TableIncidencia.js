import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  SimpleGrid,
  chakra,
  Flex,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component-with-filter';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Moment from 'moment';

import IncidenciaDetalles from './IncidenciaDetalles';
import IncidenciaAgregar from './IncidenciaAgregar';
import { RepeatIcon } from '@chakra-ui/icons';
import { fetchIncidencias, resetEstadoIncidencia } from '../../../actions/incidencia';
import { getIncidencias } from './incidencia';
import { BsArrowDown } from 'react-icons/bs';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import { AiFillFilter } from 'react-icons/ai';

export default function TableIncidencia() {
  const [openAlert, setOpenAlert] = useState(false);
  const { identificador } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const data = store.getState().incidencia.rows;

  const [tableRowsData, setTableRowsData] = useState(data);

  //Contadores de incidencia
  const ContadorPendientes = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
  const ContadorTramite = data.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
  const ContadorAtendidas = data.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);

  const [indiceIncidencia, setIndiceIncidencia] = useState([]);
  const [indiceIncidenciaPersonaAsignada, setIncidenciaPersonaAsignada] = useState(null);
  const [incidenciaPersonaNotifica, setIncidenciaPersonaNotifica] = useState(null);

  const fetchDataIncidencias = async () => {
    await fetchIncidencias().then((res) => {
      dispatch(getIncidencias(res));
    });
  }

  const refreshTable = () => {
    fetchDataIncidencias();
  }

  const handleClickCloseAlert = () => {
    setOpenAlert(false);
  }

  const handleClickOpenAlert = (index) => {
    setIndiceIncidencia(index);
    setIncidenciaPersonaAsignada(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "A" && pendiente.estado === "A"));
    setIncidenciaPersonaNotifica(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "A" && pendiente.estado === "A")[0].persona_notifica.idpersona);
    setOpenAlert(true);
  }

  const ResetAsignacionIncidencia = () => {
    var incidencia = {
      idIncidencia: indiceIncidencia.idIncidencia,
      historialIncidencia: [{
        persona_registro: {
          idpersona: Number(identificador)
        },
        persona_asignado: {
          idpersona: indiceIncidenciaPersonaAsignada[0]?.persona_asignado.idpersona,
        },
        persona_notifica: {
          idpersona: incidenciaPersonaNotifica ? incidenciaPersonaNotifica : Number(identificador),
        }
      }]
    }
    dispatch(resetEstadoIncidencia(incidencia))
      .then(() => {
        setOpenAlert(false);
        fetchDataIncidencias();
      }).catch((error) => {
        console.log(error);
      })
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
      selector: row => Moment(row.fecha).format("DD/MM/YYYY - HH:mm:ss"),
      sortable: true,
    },
    {
      name: 'TÉCNICO ASIGNADO',
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <Text key={row.idIncidencia}>
            {historial[0]?.persona_asignado === null ? "NO ASIGNADO" : historial[0]?.persona_asignado.nombre + ' ' + historial[0]?.persona_asignado.apellido}
          </Text>
        )
      }
    },
    {
      name: 'IP',
      // selector: row => row.historialIncidencia.map(row => row.estado === 'A' ? row.ip : ''),
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <Text key={row.idIncidencia}>
            {historial[0]?.ip}
          </Text>
        )
      }
    },
    {
      name: 'ESTADO',
      selector: row => row.historialIncidencia.map(row => row.estado === 'A' ? row.estado : ''),
      // selector: row => row.historialIncidencia.estadoIncidencia,
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <div>
            <Badge
              bg={historial[0]?.estadoIncidencia === 'P' ? 'red.500' : historial[0]?.estadoIncidencia === 'T' ? 'yellow.500' : 'green.500'}
              // bg={ row.historialIncidencia.map(e => e.estado === 'A' ? e.estadoIncidencia === 'P' ? 'red.500' : e.estadoIncidencia === 'T' ? 'yellow.500' : 'green.500' : '') }
              color={'white'}
              p="3px 10px"
              w={24}
              textAlign={'center'}
              borderRadius={'md'}
              fontSize={'10px'}
            >
              {historial[0]?.estadoIncidencia === 'P' ? 'PENDIENTE' : historial[0]?.estadoIncidencia === 'T' ? 'EN TRÁMITE' : 'ATENDIDO'}
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
        return (
          <div>
            <IncidenciaDetalles
              rowId={row.idIncidencia}
              identificador={identificador}
            />
            {historial[0]?.estadoIncidencia === 'A' ? (
              <IconButton
                icon={<MdSettingsBackupRestore size={20} />}
                colorScheme={'red'}
                ml={2}
                onClick={() => handleClickOpenAlert(row)}
                size={'sm'}
                fontSize={'20px'}
                _focus={{ boxShadow: 'none' }}
              />
            ) : null}

            <AlertDialog isOpen={openAlert} onClose={handleClickCloseAlert} size={'3xl'}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="xl" fontWeight="bold">
                    ¿ESTÁ SEGURO DE ACTUALIZAR AL ESTADO INICIAL DE LA INCIDENCIA?
                  </AlertDialogHeader>
                  <AlertDialogCloseButton _focus={{ boxShadow: "none" }} />
                  <AlertDialogBody>
                    ¿CONFIRMAR LA ACCIÓN?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button onClick={handleClickCloseAlert} _focus={{ boxShadow: "none" }} colorScheme="red">CANCELAR</Button>
                    <Button
                      colorScheme="facebook"
                      ml={3}
                      _focus={{ boxShadow: "none" }}
                      onClick={() => ResetAsignacionIncidencia()}
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
          spacing="20px"
          width={'100%'}
          justifyContent={'space-between'}
          verticalAlign={'center'}
          p={4}
        >
          <Box>
            <Text fontSize="lg" fontWeight="600">
              TABLA DE INCIDENCIAS
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
              onClick={refreshTable} />
            <IncidenciaAgregar />
          </Box>
        </HStack>
        <DataTableExtensions data={tableRowsData} columns={columns}>
          <DataTable
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            sortIcon={<BsArrowDown />}
            responsive={true}
            noDataComponent="No hay datos para mostrar refresca la página"
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20, 30]}
            fixedHeader
            fixedHeaderScrollHeight="550px"
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por página:',
              rangeSeparatorText: 'de',
              selectAllRowsItem: true,
              selectAllRowsItemText: 'Todos',
            }}
            key={ tableRowsData.map((item) => { return item.idIncidencia }) }
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
