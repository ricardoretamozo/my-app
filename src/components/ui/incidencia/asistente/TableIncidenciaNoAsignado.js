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
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Moment from 'moment';

import { asignarIncidencia } from '../../../../actions/incidencia';

import IncidenciaAgregar from '../IncidenciaAgregar';
import IncidenciaDetalles from '../IncidenciaDetalles';

export default function TableIncidenciaNoAsignados() {
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);
  const usuario = store.getState().auth;

  const data = store.getState().incidenciasNoAsignadas.rows;
  const tecnicosDisponibles = store.getState().tecnicoDisponible.rows;

  const handleClickOpenModal = index => {
    setOpenModal(true);
  };

  const [indice, setIndice] = useState({
    idHistorialPersona: null,
    persona: {
      idpersona: null,
    },
    activo:''
  })

  const actualizarAsignacion = (id) => {
    dispatch(asignarIncidencia(id, indice.persona))
    .then(() => {
      setOpenModal(false);      
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const columns = [
    {
      name: 'USUARIO',
      selector: row => row.persona.nombre + ' ' + row.persona.apellido,
      sortable: true,
    },
    {
      name: 'IP',
      selector: row => row.ip,
      sortable: true,
    },
    {
      name: 'FECHA Y HORA',
      selector: row => Moment(row.fecha).format("DD/MM/YYYY - HH:mm:ss"),
      sortable: true,
    },
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.estado,
      sortable: true,
      cell: row => (
        <div>
          <Badge
              bg={row.estado === 'P' ? 'red.500' : row.estado === 'T' ? 'yellow.500': 'green.500'}
              color={'white'}
              p="3px 10px"
              w={24}
              textAlign={'center'}
              borderRadius={'md'}
              fontSize={'10px'}
            >
              {row.estado === 'P' ? 'PENDIENTE' : row.estado === 'T' ? 'EN TRAMITE' : 'ATENTIDO'}
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
              rowId={row.idIncidencia}
              identificador={identificador}
            />
            {usuario.rol === '[SOPORTE TECNICO]' ? (null) : (
            <IconButton
              icon={<AddIcon />}
              variant={'solid'}
              colorScheme={'green'}
              onClick={() => handleClickOpenModal(row.idIncidencia)}
              fontSize='20px'
              size={'sm'}
              ml={1}
              _focus={{ boxShadow: "none" }}
            />       
            )}
            <Modal
              isOpen={openModal}
              onClose={handleCloseModal}
              size={'xl'}
            >
              <ModalOverlay />
                <ModalContent>
                  <ModalHeader>ASIGNAR A UN SOPORTE TÉCNICO</ModalHeader>
                  <ModalCloseButton _focus={{ boxShadow: "none" }} />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>SOPORTES TÉCNICOS</FormLabel>
                      
                      <Select placeholder='ELIGE UN SOPORTE TECNICO'
                      
                      onChange={(e)=> {setIndice({ ...indice, persona: (e.target.value) })}} 
                      >
                        {tecnicosDisponibles.map((item, idx) => (
                          <option value={item.persona.idpersona} key={idx}>
                            {item.persona.nombre + ' ' + item.persona.apellido}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" _focus={{ boxShadow: "none" }} mr={3} onClick={() => actualizarAsignacion(row.idIncidencia)}>
                      ASIGNAR
                    </Button>
                    <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
                  </ModalFooter>
                </ModalContent>
            </Modal>
          </div>
        );
      },
      center: true,
      width: '150px',
    },
  ];

  // TEMA PARA LA TABLA

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
              TABLA DE INCIDENCIAS NO ASIGNADAS
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
