import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  SimpleGrid,
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Stack,
  Avatar,
} from '@chakra-ui/react';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Moment from 'moment';
import Select from 'react-select';

import IncidenciaDetalles from '../IncidenciaDetalles';
import { fetchIncidenciasAsignadas, reAsignarIncidencia } from '../../../../actions/incidencia';
import { RiUserShared2Line } from 'react-icons/ri';
import { FaFilter, FaHistory } from 'react-icons/fa';
import { AiFillFilter } from 'react-icons/ai';

export default function TableIncidenciaAsignados() {
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);

  const data = store.getState().incidenciasAsignadas.rows;
  const tecnicosData = store.getState().tecnicoDisponible.rows;

  const [tableRowsData, setTableRowsData] = useState(data);

  //Contadores de incidencia
  const ContadorPendientes = data.filter(row => row.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A").length > 0);
  const ContadorTramite = data.filter(row => row.historialIncidencia.filter(tramite => tramite.estadoIncidencia === "T" && tramite.estado === "A").length > 0);
  const ContadorAtendidas = data.filter(row => row.historialIncidencia.filter(atendida => atendida.estadoIncidencia === "A" && atendida.estado === "A").length > 0);

  const [openModal, setOpenModal] = useState(false);
  const [idIncidencia, setIndiceIncidencia] = useState(null);
  const [indiceTecnico, setIndiceTecnico] = useState(null);
  const [indiceIdPersona, setIndiceIdPersona] = useState(null);
  const [incidenciaPersonaNotifica, setIncidenciaPersonaNotifica] = useState(null);

  // filtrar tecnicos que no se repitan en la lista de tecnicos para asignar
  const tecnicoFilter = tecnicosData.filter(p => p.persona.idpersona !== indiceIdPersona);

  const ReAsignacionIncidencia = (e) => {
    e.preventDefault();
    var incidencia = {
      idIncidencia: idIncidencia,
      historialIncidencia: [{
        persona_registro: {
          idpersona: Number(identificador)
        },
        persona_asignado: {
          idpersona: indiceTecnico,
        },
        persona_notifica: {
          idpersona: incidenciaPersonaNotifica ? incidenciaPersonaNotifica : Number(identificador),
        }
      }]
    }
    dispatch(reAsignarIncidencia(incidencia))
      .then(() => {
        setOpenModal(false);
      }).catch((error) => {
        console.log(error);
      })
  }

  const handleClickOpenModal = (index) => {
    var idPersona = index.historialIncidencia.filter(p => p.estado === 'A');
    setIndiceIdPersona(idPersona[0].persona_asignado.idpersona);
    setIndiceIncidencia(index.idIncidencia);
    setIncidenciaPersonaNotifica(index.historialIncidencia.filter(pendiente => pendiente.estadoIncidencia === "P" && pendiente.estado === "A")[0]?.persona_notifica.idpersona);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setIndiceTecnico(null)
    setIndiceIdPersona(null);
    setOpenModal(false);
  }

  const handleChangeTecnico = value => {
    setIndiceTecnico(value.value);
  };

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

  const fetchDataId = async () => {
    await fetchIncidenciasAsignadas().then(() => {
      setTableRowsData(store.getState().incidenciasAsignadas.rows);
    });
  }

  const refreshTable = () => {
    fetchDataId();
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
      // selector: row => row.historialIncidencia.map(row => row.estado === 'A'? row.persona_asignado !== null ? row.persona_asignado.nombre + ' ' + row.persona_asignado.apellido : 'NO ASIGNADO' : ''),
      // selector: row => row.historialIncidencia.persona_asignado.nombre + ' ' + row.historialIncidencia.persona_asignado.apellido,
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <Text>
            {historial[0]?.persona_asignado.nombre + ' ' + historial[0]?.persona_asignado.apellido}
          </Text>
        )
      }
    },
    {
      name: 'IP',
      // selector: row => row.historialIncidencia.map(row => row.estado === 'A' ? row.ip : ''),
      // selector: row => row.historialIncidencia.ip,
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <Text>
            {historial[0].ip}
          </Text>
        )
      }
    },
    {
      name: 'ESTADO',
      selector: row => row.historialIncidencia.map(row => row.estado === 'A' ? row.estado : ''),
      // selector: row => row.historialIncidencia.filter(e => e.estado === 'A' ? e.estadoIncidencia : ''),
      // selector: row => row.historialIncidencia.estadoIncidencia,
      sortable: true,
      cell: row => {
        var historial = row.historialIncidencia.filter(p => p.estado === 'A');
        return (
          <div>
            <Badge
              bg={historial[0].estadoIncidencia === 'P' ? 'red.500' : historial[0].estadoIncidencia === 'T' ? 'yellow.500' : 'green.500'}
              // bg={ row.historialIncidencia.map(e => e.estado === 'A' ? e.estadoIncidencia === 'P' ? 'red.500' : e.estadoIncidencia === 'T' ? 'yellow.500' : 'green.500' : '') }
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
        let historial = row.historialIncidencia.filter(p => p.estado === 'A');
        let historialTecnico = row.historialIncidencia.filter(e => e.estado === 'N' && e.persona_asignado !== null).slice(-3).reverse();
        return (
          <div>
            <IncidenciaDetalles
              rowId={row.idIncidencia}
              identificador={identificador}
            />
            {historial[0].estadoIncidencia !== 'A' ? (
              <IconButton
                icon={<RiUserShared2Line />}
                colorScheme={'teal'}
                onClick={() => handleClickOpenModal(row)}
                fontSize='20px'
                size={'sm'}
                ml={1}
                _focus={{ boxShadow: "none" }}
              />
            ) : null}
            {historialTecnico.length > 0 && historial[0].estadoIncidencia !== 'A' ? (
              <Popover placement='right'>
                <PopoverTrigger>
                  <IconButton
                    icon={<FaHistory size={'20px'} />}
                    variant={'solid'}
                    colorScheme={'orange'}
                    ml={1}
                    size={'sm'}
                    _focus={{ boxShadow: "none" }}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent _focus={{ boxShadow: "none" }}>
                    <PopoverArrow />
                    <PopoverHeader>
                      <Text fontSize={'12px'} textAlign='center' fontWeight={'semibold'}>ÚLTIMOS DE TÉCNICOS ASIGNADOS</Text>
                    </PopoverHeader>
                    <PopoverCloseButton _focus={{ boxShadow: "none" }} />
                    <PopoverBody>
                      <Stack direction={'column'} spacing={2}>
                        {historialTecnico.map((row, index) => (
                          <Stack direction={['column', 'row']} textAlign={['center', 'justify']} key={index} alignItems='baseline' w='full' spacing={1}>
                            <Avatar size={'xs'} name={row.persona_asignado?.nombre + ' ' + row.persona_asignado?.apellido} />
                            <HStack justifyContent='space-between' w={'full'}>
                              <Text fontSize={'10px'}>{row.persona_asignado?.nombre + ' ' + row.persona_asignado?.apellido}</Text>
                              <Text fontSize={'9px'}>{Moment(row.fecha).format("DD/MM/YYYY - HH:mm:ss").trimEnd()}</Text>
                            </HStack>
                          </Stack>
                        ))}
                      </Stack>
                    </PopoverBody>
                    {/* <PopoverFooter>This is the footer</PopoverFooter> */}
                  </PopoverContent>
                </Portal>
              </Popover>
            ) : null}

            <Modal
              isOpen={openModal}
              onClose={handleCloseModal}
              size={'2xl'}
            >
              <ModalOverlay />
              <form onSubmit={ReAsignacionIncidencia}>
                <ModalContent>
                  <ModalHeader>RE-ASIGNAR A OTRO SOPORTE TÉCNICO</ModalHeader>
                  <ModalCloseButton _focus={{ boxShadow: "none" }} />
                  <ModalBody pb={6}>
                    <FormControl isRequired>
                      <FormLabel>SOPORTES TÉCNICOS</FormLabel>
                      <Select
                        placeholder="--------- ELIGE UN SOPORTE TECNICO -----------"
                        onChange={handleChangeTecnico}
                        options={tecnicoFilter.map(tecnico => ({
                          value: tecnico.persona.idpersona,
                          label: tecnico.persona.nombre + ' ' + tecnico.persona.apellido
                        }))}
                        isSearchable
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button disabled={indiceTecnico === null ? true : false} colorScheme="facebook" _focus={{ boxShadow: "none" }} mr={3} type={'submit'}>
                      RE-ASIGNAR
                    </Button>
                    <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
                  </ModalFooter>
                </ModalContent>
              </form>
            </Modal>
          </div>
        );
      },
      width: '140px',
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
              TABLA DE INCIDENCIAS ASIGNADAS
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
          {/* <Box>
            <IncidenciaAgregar />
          </Box> */}
        </HStack>
        <DataTableExtensions columns={columns} data={tableRowsData}>
          <DataTable
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            responsive={true}
            paginationPerPage={10}
            noDataComponent="No hay datos para mostrar refresca la página"
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
