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
  Input,
  Select as SelectForm,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';

import { AddIcon, SearchIcon } from '@chakra-ui/icons';

import { store } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidenciaId } from './incidencia';
import { buscarUsuarioDni } from '../../../actions/incidencia';

import {
    createIncidencia, fetchIncidenciasPersonas
  } from '../../../actions/incidencia';

const IncidenciaAgregar = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const motivoData = store.getState().motivo.rows;
  const { identificador } = useSelector(state => state.auth);

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

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
    origen: '',
    descripcion: '',
    estado: 'P',
    fecha: hoy.toISOString().split('T')[0],
  });

  const [usuarioDNI, setUsuarioDNI] = useState(null);
  const [usuarioData, setUsuarioData] = useState([]);

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
        idpersona: usuarioData.idpersona,
      },
      persona_registro: {
        idpersona: Number(identificador),
      },
      motivo: {
        idMotivo: Number(indiceIncidencia.motivo),
      },
      origen: indiceIncidencia.origen,
      descripcion: indiceIncidencia.descripcion,
      estado: indiceIncidencia.estado,
      fecha: indiceIncidencia.fecha,
    }
    dispatch(createIncidencia(incidencia))
      .then(() => {
        handleCloseModal(true);
        fetchDataId();
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

  const ORIGENES = ['SISTEMA','LLAMADA', 'SMS', 'WHATSAPP', 'CORREO', 'OTRO'];

  return (
    <>
      <Button leftIcon={<AddIcon/>} size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'}>
        NUEVA INCIDENCIA
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'3xl'}
      >
        <ModalOverlay />

        <form onSubmit={saveHistorialPersona}>
          <ModalContent>
            <ModalHeader>CREAR NUEVA INCIDENCIA</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>MOTIVO</FormLabel>
                  <SelectForm placeholder='--------- SELECCIONE UN MOTIVO -----------'
                    onChange ={e => setIndiceIncidencia({...indiceIncidencia, motivo:  e.target.value })}
                  >{motivoData.map((item, idx) => (
                    <option value={item.idMotivo} key={idx}>
                      {item.motivo}
                    </option>
                  ))}
                  </SelectForm>
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
            <FormControl mt={4} isRequired>
                <FormLabel>ORIGEN</FormLabel>
                  <SelectForm placeholder='--------- SELECCIONE EL ORIGEN -----------'
                    onChange ={e => setIndiceIncidencia({...indiceIncidencia, origen:  e.target.value })}
                  >
                     {ORIGENES.map((item, idx) => (
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    ))}
                  </SelectForm>
            </FormControl>
            <HStack spacing={2} mt={4}>
            <FormControl isRequired>
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
                  <Input placeholder="DIGITE EL DNI" required
                    onChange={e => {
                      setUsuarioDNI(e.target.value)
                    }}
                  />
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>NOMBRE DEL USUARIO</FormLabel>
                <Input 
                  value={usuarioData.nombre}
                  onChange={e => {
                    setIndiceIncidencia({
                      ...indiceIncidencia,
                      persona: e.target.value,
                    });
                  }}
                readOnly/>
            </FormControl>
            </HStack>
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} colorScheme={'blue'} autoFocus mr={3}>
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal}>CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default IncidenciaAgregar;
