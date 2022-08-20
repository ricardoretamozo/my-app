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
} from '@chakra-ui/react';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Moment from 'moment';
import Select from 'react-select';

import IncidenciaDetalles from '../IncidenciaDetalles';
import { reAsignarIncidencia } from '../../../../actions/incidencia';
import { RiUserShared2Line } from 'react-icons/ri';

export default function TableIncidenciaAsignados() {
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);

  const data = store.getState().incidenciasAsignadas.rows;
  const tecnicosData = store.getState().tecnicoDisponible.rows;

  //Contadores o Dashboard
  const incidenciasPendientes = data.filter(row => row.historialIncidencia.estadoIncidencia === 'P');
  const incidenciasEnTramite = data.filter(row => row.historialIncidencia.estadoIncidencia === 'T');
  const incidenciasAtendidas = data.filter(row => row.historialIncidencia.estadoIncidencia === 'A');
  
  const [openModal, setOpenModal] = useState(false);  
  const [idIncidencia, setIndiceIncidencia] = useState(null);
  const [indiceTecnico, setIndiceTecnico] = useState(null);
  const [indiceIdPersona, setIndiceIdPersona] = useState(null);

  // filtrar tecnicos que no se repitan en la lista de tecnicos para asignar
  const tecnicoFilter = tecnicosData.filter(row => row.persona.idpersona !== indiceIdPersona);

  const ReAsignacionIncidencia = (e) => {
    e.preventDefault();
    var incidencia = {
      idIncidencia: idIncidencia,
      historialIncidencia: {
        persona_registro: {
          idpersona: Number(identificador)
        },
        persona_asignado: {
          idpersona: indiceTecnico,
        }
      }
    }
    dispatch(reAsignarIncidencia(incidencia))
    .then(() => {
      setOpenModal(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleClickOpenModal = (index) => {
    setIndiceIdPersona(index.historialIncidencia.persona_asignado.idpersona);
    setIndiceIncidencia(index.idIncidencia);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setIndiceTecnico(null)
    setOpenModal(false);
  }

  const handleChangeTecnico = value => {
    setIndiceTecnico(value.value);
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
      selector: row => Moment(row.fecha).format("DD/MM/YYYY - HH:mm:ss"),
      sortable: true,
    },
    {
      name: 'TÉCNICO ASIGNADO',
      selector: row => row.historialIncidencia.persona_asignado.nombre + ' ' + row.historialIncidencia.persona_asignado.apellido,
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
            p="3px 10px"
            w={24}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'10px'}
          >
            {row.historialIncidencia.estadoIncidencia  === 'P' ? 'PENDIENTE' : row.historialIncidencia.estadoIncidencia === 'T' ? 'EN TRAMITE' : 'ATENTIDO'}
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
          <IncidenciaDetalles 
            rowId = {row.idIncidencia}
            identificador = { identificador }
          />
          {row.historialIncidencia.estadoIncidencia  === 'A' ? (null) : (
            <IconButton
              icon={<RiUserShared2Line />}
              colorScheme={'teal'}
              onClick={() => handleClickOpenModal(row)}
              fontSize='20px'
              size={'sm'}
              ml={1}
              _focus={{ boxShadow: "none" }}
            />       
            )}
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
                    <Button disabled = {indiceTecnico === null ? true : false} colorScheme="facebook" _focus={{ boxShadow: "none" }} mr={3} type={'submit'}>
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
      center: true,
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
            TABLA DE INCIDENCIAS ASIGNADAS
            </Text>
          </Box>
          <Box>
            {/* <IncidenciaAgregar /> */}
          </Box>
        </HStack>
        <DataTableExtensions columns={columns} data={data}>
          <DataTable
            defaultSortAsc={false}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            responsive={true}
            paginationPerPage={5}
            noDataComponent="No hay datos para mostrar refresca la página"
            paginationRowsPerPageOptions={[5, 15, 20, 30]}
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
