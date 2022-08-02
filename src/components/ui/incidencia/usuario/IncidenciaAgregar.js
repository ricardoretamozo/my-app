import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';

import Select from 'react-select';

import { AddIcon } from '@chakra-ui/icons';

import { store } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidenciaId } from './incidencia';

import { fetchIncidenciasPersonas, createIncidenciaUsuario
} from '../../../../actions/incidencia';

const IncidenciaAgregar = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const motivoData = store.getState().motivo.rows;
  const origenData = store.getState().origenIncidencia.rows;

  const origenIncidencia = origenData.filter(row => row.origen === 'SISTEMA');

  const { identificador } = useSelector(state => state.auth);

  const [indiceMotivo, setIndiceMotivo] = useState(null);

  const [indiceIncidencia, setIndiceIncidencia] = useState({
    descripcion: '',
  });

  // const [usuarioDNI, setUsuarioDNI] = useState(null);
  // const [usuarioData, setUsuarioData] = useState([]);
  // const [usuarioSede, setUsuarioSede] = useState(null);
  // const [usuarioOrgano, setUsuarioOrgano] = useState(null);
  // const [usuarioOficina, setUsuarioOficina] = useState(null);
  // const [usuarioCargo, setUsuarioCargo] = useState(null);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setIndiceMotivo(null);
    setOpenCreate(false);
  };

  const fetchDataId = async () => {
    await fetchIncidenciasPersonas(identificador).then((res) => {
      dispatch(getIncidenciaId(res));
    });
  }

  useEffect(() => {
    if (store.getState().incidenciaId.checking) {
      fetchDataId();
    }
  });

  const saveHistorialPersona = (e) => {
    e.preventDefault();
    var incidencia = {
      persona: {
        idpersona: Number(identificador),
      },
      motivo: {
        idMotivo: indiceMotivo,
      },
      descripcion: indiceIncidencia.descripcion,
      origen: {
        idOrigen: origenIncidencia[0].idOrigen,
      },
      historialIncidencia: {
        persona_registro: {
          idpersona: Number(identificador),
        },
      }
    }
    dispatch(createIncidenciaUsuario(incidencia))
      .then(() => {
        handleCloseModal(true);
        fetchDataId();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // const fetchDataUsuario = async () => {
  //   await buscarUsuarioDni(usuarioDNI).then((res) => {
  //     fetchHistorialPersona(res.idpersona).then(historial => {
  //       setUsuarioSede(historial.oficina.organo.sede.sede)
  //       setUsuarioOrgano(historial.oficina.organo.organo)
  //       setUsuarioOficina(historial.oficina.oficina)
  //       setUsuarioCargo(historial.cargo.cargo)
  //     }).catch(() => {
  //       notification('Historial no encontrado', 'El usuario no pertenece a ningun sede, organo, sede', 'error');
  //       setUsuarioSede(null);
  //       setUsuarioOrgano(null);
  //       setUsuarioOficina(null);
  //       setUsuarioCargo(null);
  //       setUsuarioData([]);
  //       setUsuarioDNI(null);
  //     });
  //     setUsuarioData(res);
  //   }).catch(() => {
  //     notification('Usuario no encontrado', 'No se pudo encontrar el Usuario', 'error');
  //     setUsuarioSede(null);
  //     setUsuarioOrgano(null);
  //     setUsuarioOficina(null);
  //     setUsuarioCargo(null);
  //     setUsuarioData([]);
  //     setUsuarioDNI(null);
  //   });
  // }

  // const handleSearchDNI = () => {
  //   fetchDataUsuario();
  // }

  const handleChangeMotivo = value => {
    setIndiceMotivo(value.value);
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'} _focus={{ boxShadow: "none" }}>
        NUEVA INCIDENCIA
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'4xl'}
      >
        <ModalOverlay />

        <form onSubmit={saveHistorialPersona}>
          <ModalContent>
            <ModalHeader>CREAR NUEVA INCIDENCIA</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />

            <ModalBody pb={6}>
              <FormControl mt={4} isRequired>
                <FormLabel>MOTIVO</FormLabel>
                <Select
                  placeholder="--------- SELECCIONE UN MOTIVO -----------"
                  onChange={handleChangeMotivo}
                  options={motivoData.map(motivo => ({
                    value: motivo.idMotivo,
                    label: motivo.motivo
                  }))}
                  isSearchable
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
                  textTransform='uppercase'
                  size='sm'
                />
              </FormControl>
              {/* <Flex mt={4}>
              <Text>¿REGISTRAR INCIDENCIA, PARA OTRO USUARIO?</Text>
              <Spacer/>
              <HStack direction='row'>
                <Button
                  colorScheme='purple'
                  size='sm'
                  rightIcon={<TriangleDownIcon />}
                  onClick={onToggle}
                  _focus={{ boxShadow: "none" }}
                >NO</Button>
              </HStack>
            </Flex>
            
            <Collapse in={isOpen} animateOpacity>
              <HStack spacing={2} mt={4}>
                <FormControl>
                    <FormLabel>VALIDACIÓN DE USUARIO POR DNI</FormLabel>
                    <InputGroup>
                      <InputRightElement
                        children={
                          <IconButton
                            colorScheme='blue'
                            onClick={handleSearchDNI}
                            icon={<SearchIcon />}
                          />
                        }
                      />
                      <Input placeholder="DIGITE EL DNI"
                        onChange={e => {
                          setUsuarioDNI(e.target.value)
                        }}
                      />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>NOMBRE DEL USUARIO</FormLabel>
                    <Input value={usuarioData.nombre + ' ' + usuarioData.apellido} readOnly disabled/>
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
            </Collapse> */}
            </ModalBody>
            <ModalFooter>
              <Button disabled={indiceMotivo === null ? true : false} type={'submit'} colorScheme={'blue'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
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
