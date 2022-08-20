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
  Radio,
  RadioGroup,
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
  Stack,
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
import { buscarPersonaApellido } from '../../../actions/persona';
import { fetchHistorialPersona } from '../../../actions/historialpersona';

const IncidenciaAgregar = () => {
  const dispatch = useDispatch();
  const usuario = store.getState().auth;
  const { identificador } = useSelector(state => state.auth);
  
  const motivoData = store.getState().motivo.rows;
  const origenData = store.getState().origenIncidencia.rows;
  
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openSearch, setOpenSearchUsuarios] = React.useState(false);
  const [radioValue, setRadioValue] = useState('apellido');

  const [usuarioDNI, setUsuarioDNI] = useState(null);
  const [usuarioApellido, setUsuarioApellido] = useState(null);
  const [usuarioData, setUsuarioData] = useState([]);
  const [usuarioListData, setUsuarioListData] = useState([]);
  const [usuarioDataNombre, setUsuarioDataNombre] = useState(null);
  const [usuarioSede, setUsuarioSede] = useState(null);
  const [usuarioOrgano, setUsuarioOrgano] = useState(null);
  const [usuarioOficina, setUsuarioOficina] = useState(null);
  const [usuarioCargo, setUsuarioCargo] = useState(null);

  const [indiceMotivo, setIndiceMotivo] = useState(null);
  const [indiceOrigen, setIndiceOrigen] = useState(null);
  const [indiceUsuario, setIndiceUsuario] = useState(null);

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

  const handleResetValues = () => {
    setUsuarioData([]);
    setUsuarioDNI(null);
    setUsuarioSede(null);
    setUsuarioOrgano(null);
    setUsuarioOficina(null);
    setUsuarioCargo(null);
    setIndiceUsuario(null);
    setUsuarioApellido(null);
    setUsuarioDataNombre(null);
  }

  const handleCloseModal = () => {
    setIndiceMotivo(null);
    setIndiceOrigen(null);
    handleResetValues();
    setRadioValue('apellido');
    setOpenCreate(false);
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
        idpersona: indiceUsuario === null ? usuarioData.idpersona : indiceUsuario,
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
        },
        estado: false,
      }) : ({
        persona_registro: {
          idpersona: Number(identificador),
        },
        persona_asignado: {
          idpersona: Number(identificador)
        },
        estado: true,
      })
    }
    dispatch(createIncidencia(incidencia))
      .then(() => {
        // notification('Historial no encontrado', 'El usuario no pertenece a ningun sede, organo, sede', 'error', 'modalCrearIncidencia');
        handleCloseModal(true);
        fetchDataSoporteIncidencias();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const buscarPorDni = async () => {
    await buscarUsuarioDni(usuarioDNI).then((res) => {
      fetchHistorialPersona(res.idpersona).then(historial => {
        setUsuarioSede(historial.oficina.organo.sede.sede)
        setUsuarioOrgano(historial.oficina.organo.organo)
        setUsuarioOficina(historial.oficina.oficina)
        setUsuarioCargo(historial.cargo.cargo)
      }).catch(() => {
        notification('Historial no encontrado', 'El usuario no pertenece a ningun sede, organo, sede', 'error', 'modalCrearIncidencia');
        handleResetValues();
      });
      setUsuarioData(res);
    }).catch(() => {
      notification('Usuario no encontrado', 'No se pudo encontrar el Usuario', 'error', 'modalCrearIncidencia');
      handleResetValues();
    });
  }

  const buscarPorApellido = async () => {
    await buscarPersonaApellido(usuarioApellido).then((res) => {
      if (res.data.length > 0) {
        setUsuarioListData(res.data);
        setOpenSearchUsuarios(true);
      } else {
        notification('Usuario no encontrado', 'No se pudo encontrar el usuario con ese apellido', 'error', 'modalCrearIncidencia');
        handleResetValues()
      }
    }).catch(() => {
      notification('Usuario no encontrado', 'No se pudo encontrar el usuario', 'error', 'modalCrearIncidencia');
      setUsuarioData([]);
    })
  }

  const seleccionarUsuario = async (usuario) => {
    await fetchHistorialPersona(usuario).then(historial => {
      setUsuarioDataNombre(historial.persona.nombre + ' ' + historial.persona.apellido);
      setUsuarioSede(historial.oficina.organo.sede.sede)
      setUsuarioOrgano(historial.oficina.organo.organo)
      setUsuarioOficina(historial.oficina.oficina)
      setUsuarioCargo(historial.cargo.cargo)
    }).catch(() => {
      setOpenSearchUsuarios(false);
      notification('Error al Seleccionar', 'No se puede crear incidencia para este usuario, no tiene asignado a ninguna sede, organo, oficina', 'info', 'modalCrearIncidencia');
      handleResetValues();
    })
  }

  const handleSearchDNI = () => {
    buscarPorDni();
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

  const handleChangeRadio = value => {
    handleResetValues();
    setRadioValue(value);
  }

  const handleChangeUsuario = (value) => {
    if (value === null) {
      return "SELECCIONE UN USUARIO"
    } else {
      seleccionarUsuario(value.value);
      setIndiceUsuario(value.value);
    }
  }

  const handleSearchApellido = () => {
    buscarPorApellido();
  }

  const handleCloseModalSearch = () => {
    setOpenSearchUsuarios(false);
  }

  return (
    <>

      <Button leftIcon={<AddIcon />} size="sm" onClick={handleClickOpenCreate} colorScheme={'facebook'} _focus={{ boxShadow: "none" }}>
        NUEVA INCIDENCIA
      </Button>

      <Modal
        id="modalCrearIncidencia"
        isOpen={openCreate}
        onClose={handleCloseModal}
        size={'5xl'}
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

              <RadioGroup onChange={handleChangeRadio} value={radioValue} defaultValue={'apellido'} mt={4}>
                <Stack direction='row'>
                  <Radio size='md' value='apellido' _focus={{ boxShadow: "none" }} defaultChecked={true}>BUSQUEDA POR APELLIDO</Radio>
                  <Radio size='md' value='dni' _focus={{ boxShadow: "none" }}>BUSQUEDA POR DNI</Radio>
                </Stack>
              </RadioGroup>

              <HStack spacing={2} mt={2} mb={2} hidden = { radioValue === 'apellido' } >
                <FormControl isRequired = { radioValue === 'dni' } zIndex={0}>
                  <FormLabel>BUSQUEDA DE USUARIO POR DNI</FormLabel>
                  <InputGroup >
                    <InputRightElement
                      children={
                        <IconButton
                          colorScheme='facebook'
                          onClick={handleSearchDNI}
                          icon={<SearchIcon />}
                          _focus={{ boxShadow: "none" }}
                        />
                      }
                    />
                    <Input placeholder="DIGITE EL DNI" onChange={e => { setUsuarioDNI(e.target.value) }} />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>NOMBRE DEL USUARIO</FormLabel>
                  <Input value={usuarioData.nombre + ' ' + usuarioData.apellido} isDisabled />
                </FormControl>
              </HStack>

              <HStack spacing={2} mt={2} mb={2} hidden = { radioValue === 'dni' }>
                <FormControl isRequired = { radioValue === 'apellido' } zIndex={0}>
                  <FormLabel>BUSQUEDA POR APELLIDO DEL USUARIO</FormLabel>
                  <InputGroup>
                    <InputRightElement
                      children={
                        <IconButton
                          colorScheme='facebook'
                          onClick={handleSearchApellido}
                          icon={<SearchIcon />}
                          _focus={{ boxShadow: "none" }}
                          disabled = { usuarioApellido === null || usuarioApellido.length < 3 }
                        />
                      }
                    />
                    <Input placeholder="INGRESE EL APELLIDO"  textTransform={'uppercase'} onChange={e => { setUsuarioApellido(e.target.value.toUpperCase()) }} />
                  </InputGroup>
                </FormControl>

                <Modal
                  isOpen={openSearch}
                  onClose={handleCloseModalSearch}
                  size={'2xl'}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>LISTA DE USUARIOS CON EL APELLIDO BUSCADO</ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} onClick={handleCloseModalSearch} />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>LISTA DE USUARIOS</FormLabel>
                        <Select
                          placeholder=" SELECCIONE UN USUARIO "
                          onChange={handleChangeUsuario}
                          options={usuarioListData?.map(usuario => ({
                            value: usuario.idpersona,
                            label: usuario.apellido + ', ' + usuario.nombre
                          }))}
                          isSearchable
                          isClearable
                        />
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={handleCloseModalSearch} disabled={indiceUsuario === null} colorScheme="facebook">ACEPTAR</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                
                <FormControl isRequired>
                  <FormLabel>NOMBRE DEL USUARIO</FormLabel>
                  <Input defaultValue={usuarioDataNombre ? usuarioDataNombre : ''} isDisabled />
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
              <Button 
                disabled={indiceMotivo === null ? true : false || indiceOrigen === null ? true : false || radioValue === 'apellido' ? indiceUsuario === null ? true : false : false } 
                type={'submit'} 
                colorScheme={'facebook'} 
                autoFocus mr={3} 
                _focus={{ boxShadow: "none"}}
                >
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red">CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default IncidenciaAgregar;
