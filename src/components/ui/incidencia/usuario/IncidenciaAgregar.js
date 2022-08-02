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
  Text,
  Collapse,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,  
  useDisclosure,
  Spacer,
  Flex,
} from '@chakra-ui/react';

import Select from 'react-select';

import { AddIcon, SearchIcon, TriangleDownIcon } from '@chakra-ui/icons';

import { store } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidenciaId } from './incidencia';

import {
    createIncidencia, fetchIncidenciasPersonas, buscarUsuarioDni
  } from '../../../../actions/incidencia';

const IncidenciaAgregar = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const { isOpen, onToggle } = useDisclosure()
  const dispatch = useDispatch();

  const motivoData = store.getState().motivo.rows;
  const origenData = store.getState().origenIncidencia.rows;

  const { identificador } = useSelector(state => state.auth);

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
    descripcion: '',
    origen: 'SISTEMA',
    estado: 'P'
  });

  const [usuarioDNI, setUsuarioDNI] = useState(null);
  const [usuarioData, setUsuarioData] = useState([]);

  console.log(usuarioData);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
    setUsuarioDNI(null);
    setUsuarioData([]);
  };

  const fetchDataId = async ()=> {
    await fetchIncidenciasPersonas(identificador).then((res)=>{
      dispatch(getIncidenciaId(res));
    });
  }

  useEffect(() => {
    if(store.getState().incidenciaId.checking){
      fetchDataId();
    }
  });

  const saveHistorialPersona = e => {
    e.preventDefault();
    var incidencia = {
      persona: {
        idpersona: usuarioDNI === null ? Number(identificador) : usuarioData.idpersona,
      },
      persona_registro: {
        idpersona: Number(identificador),
      },
      motivo: {
        idMotivo: indiceIncidencia.motivo,
      },
      descripcion: indiceIncidencia.descripcion,
      estado: indiceIncidencia.estado,
      origen: indiceIncidencia.origen,
    }
    dispatch(createIncidencia(incidencia))
      .then(() => {
        fetchDataId();
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchDataUsuario = async () => {
    await buscarUsuarioDni(usuarioDNI).then((res)=>{
      setUsuarioData(res);
    });
  }

  const handleSearchDNI = () => {
    fetchDataUsuario();
  }

  const handleChangeMotivo = value => {
    setIndiceIncidencia({
      ...indiceIncidencia,
      motivo: value.value,
    });
  };

  return (
    <>
      <Button leftIcon={<AddIcon/>} size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'} _focus={{ boxShadow: "none" }}>
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
            <ModalCloseButton _focus={{ boxShadow: "none" }}/>

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
            <Flex mt={4}>
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
              <HStack textAlign={'center'} mt={2}>
                <FormControl>
                    <Text>SEDE</Text>
                    <Input value={usuarioData.oficina} readOnly disabled/>
                </FormControl>
                <FormControl>
                    <Text>ORGANO</Text>
                    <Input value={usuarioData.oficina} readOnly disabled/>
                </FormControl>
                <FormControl>
                    <Text>OFICINA</Text>
                    <Input value={usuarioData.oficina} readOnly disabled/>
                </FormControl>
                <FormControl>
                    <Text>CARGO</Text>
                    <Input value={usuarioData.oficina} readOnly disabled/>
                </FormControl>
              </HStack>
            </Collapse>
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} colorScheme={'blue'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
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
