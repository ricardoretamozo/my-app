import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import { notification } from '../../../helpers/alert';

import Select from "react-select";

import { AddIcon, SearchIcon } from '@chakra-ui/icons';

import { store } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { buscarUsuarioDni } from '../../../actions/incidencia';

import {
  createIncidencia, fetchIncidenciaSoporte
} from '../../../actions/incidencia';

import { getIncidenciasAsignadasSoporte } from './soporte/incidencia';

import { fetchHistorialPersona } from '../../../actions/historialpersona'

const IncidenciaAgregar = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const motivoData = store.getState().motivo.rows;
  const origenData = store.getState().origenIncidencia.rows;
  const { identificador } = useSelector(state => state.auth);

  const usuario = store.getState().auth;

  const [usuarioDNI, setUsuarioDNI] = useState(null);
  const [usuarioData, setUsuarioData] = useState([]);
  const [usuarioSede, setUsuarioSede] = useState(null);
  const [usuarioOrgano, setUsuarioOrgano] = useState(null);
  const [usuarioOficina, setUsuarioOficina] = useState(null);
  const [usuarioCargo, setUsuarioCargo] = useState(null);

  const [indiceMotivo, setIndiceMotivo] = useState(null);
  const [indiceOrigen, setIndiceOrigen] = useState(null);

  const [indiceIncidencia, setIndiceIncidencia] = useState({
    idIncidencia: null,
    persona: {
      idpersona: null,
    },
    persona_registro: {
      idpersona: null,
    },
    persona_asignado: {
      idpersona: null,
    },
    oficina: {
      idOficina: null,
    },
    motivo: {
      idMotivo: null,
    },
    origen: {
      idOrigen: null,
    },
    descripcion: '',
    historialIncidencia: {
      persona_registro: {
        idpersona: null
      },
      persona_asignado: {
        idpersona: null
      }
    }
  });

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setIndiceMotivo(null);
    setIndiceOrigen(null);
    setOpenCreate(false);

    setUsuarioData([]);
    setUsuarioDNI(null);

    setUsuarioSede(null);
    setUsuarioOrgano(null);
    setUsuarioOficina(null);
    setUsuarioCargo(null);
  };

  const fetchDataSoporteIncidencias = async () => {
    await fetchIncidenciaSoporte(identificador).then((res) => {
      dispatch(getIncidenciasAsignadasSoporte(res));
    });
  }

  const crearIncidencia = e => {
    e.preventDefault();
    var incidencia = {
      persona: {
        idpersona: usuarioData.idpersona,
      },
      motivo: {
        idMotivo: indiceMotivo,
      },
      origen: {
        idOrigen: indiceOrigen,
      },
      descripcion: indiceIncidencia.descripcion,
      historialIncidencia: (usuario.rol !== '[SOPORTE TECNICO]') ? ({
        persona_registro: {
          idpersona: Number(identificador),
        }
      }) : ({
        persona_registro: {
          idpersona: Number(identificador),
        },
        persona_asignado: {
          idpersona: Number(identificador)
        }
      })
    }
    dispatch(createIncidencia(incidencia))
      .then(() => {
        handleCloseModal(true);
        fetchDataSoporteIncidencias()
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchDataUsuario = async () => {
    await buscarUsuarioDni(usuarioDNI).then((res) => {
      fetchHistorialPersona(res.idpersona).then(historial => {
        setUsuarioSede(historial.oficina.organo.sede.sede)
        setUsuarioOrgano(historial.oficina.organo.organo)
        setUsuarioOficina(historial.oficina.oficina)
        setUsuarioCargo(historial.cargo.cargo)
      }).catch(() => {
        notification('Historial no encontrado', 'El usuario no pertenece a ningun sede, organo, sede', 'error', 'modalCrearIncidencia');
        setUsuarioSede(null);
        setUsuarioOrgano(null);
        setUsuarioOficina(null);
        setUsuarioCargo(null);
        setUsuarioData([]);
        setUsuarioDNI(null);
      });
      setUsuarioData(res);
    }).catch(() => {
      notification('Usuario no encontrado', 'No se pudo encontrar el Usuario', 'error', 'modalCrearIncidencia');
      setUsuarioSede(null);
      setUsuarioOrgano(null);
      setUsuarioOficina(null);
      setUsuarioCargo(null);
      setUsuarioData([]);
      setUsuarioDNI(null);
    });
  }

  const handleSearchDNI = () => {
    fetchDataUsuario();
  }

  const handleChangeMotivo = value => {
    if (value === null) {
      return "--------- SELECCIONE UN MOTIVO -----------"
    } else {
      setIndiceMotivo(value.value);
    }
  };

  const handleChangeOrigen = value => {
    if (value === null) {
      return "--------- SELECCIONE UN ORIGEN -----------"
    } else {
      setIndiceOrigen(value.value);
    }
  };

  return (
    <>

      <Button leftIcon={<AddIcon />} size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'} _focus={{ boxShadow: "none" }}>
        NUEVA INCIDENCIA
      </Button>

      <Modal
        id="modalCrearIncidencia"
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'4xl'}
      >
        <ModalOverlay />

        <form onSubmit={crearIncidencia}>
          <ModalContent>
            <ModalHeader>CREAR NUEVA INCIDENCIA</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>ORIGEN</FormLabel>
                <Select
                  placeholder="--------- SELECCIONE UN ORIGEN -----------"
                  onChange={handleChangeOrigen}
                  options={origenData.map(origen => ({
                    value: origen.idOrigen,
                    label: origen.origen
                  }))}
                  isSearchable
                  isClearable
                />
              </FormControl>
              <HStack spacing={2} mt={4} mb={2}>
                <FormControl isRequired zIndex={0}>
                  <FormLabel>VALIDACIÓN DE USUARIO POR DNI</FormLabel>
                  <InputGroup >
                    <InputRightElement
                      children={
                        <IconButton
                          colorScheme='blue'
                          onClick={handleSearchDNI}
                          icon={<SearchIcon />}

                        />
                      }
                    />
                    <Input placeholder="DIGITE EL DNI" onChange={e => { setUsuarioDNI(e.target.value) }} isRequired />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>NOMBRE DEL USUARIO</FormLabel>
                  <Input value={usuarioData.nombre + ' ' + usuarioData.apellido} readOnly isDisabled />
                </FormControl>
              </HStack>
              <TableContainer>
                <Table size='sm'>
                  <Thead>
                    <Tr>
                      <Th>SEDE</Th>
                      <Th>ORGANO</Th>
                      <Th>OFICINA</Th>
                      <Th>CARGO</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{usuarioSede}</Td>
                      <Td>{usuarioOrgano}</Td>
                      <Td>{usuarioOficina}</Td>
                      <Td>{usuarioCargo}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <FormControl isRequired mt={4}>
                <FormLabel>MOTIVO</FormLabel>
                <Select
                  placeholder="--------- SELECCIONE UN MOTIVO -----------"
                  onChange={handleChangeMotivo}
                  options={motivoData.map(motivo => ({
                    value: motivo.idMotivo,
                    label: motivo.motivo
                  }))}
                  isSearchable
                  isClearable
                  required
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>DESCRIPCIÓN</FormLabel>
                <Textarea
                  onChange={e => {
                    setIndiceIncidencia({
                      ...indiceIncidencia,
                      descripcion: e.target.value.toUpperCase(),
                    });
                  }}
                  placeholder='Aqui describe la incidencia'
                  textTransform={'uppercase'}
                  size='sm'
                />
              </FormControl>              
            </ModalBody>
            <ModalFooter>
              <Button disabled={indiceMotivo === null ? true : false || indiceOrigen === null ? true : false} type={'submit'} colorScheme={'blue'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default IncidenciaAgregar;
