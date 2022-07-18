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
  Input,
  Textarea,
  Select as SelectForm,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { store } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidenciaId } from './incidencia';

import {
    createIncidencia, fetchIncidenciasPersonas
  } from '../../../actions/incidencia';


const IncidenciaAgregar = props => {
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
    descripcion: '',
    estado: 'P',
    fecha: hoy.toISOString().split('T')[0],
  });

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
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
    //fetchData();
  }, []);

  const saveHistorialPersona = e => {
    e.preventDefault();
    var incidencia = {
      persona: {
        idpersona: Number(identificador),
      },
      persona_registro: {
        idpersona: Number(identificador),
      },
      persona_asignado: {
        idpersona: Number(identificador),
      },
      motivo: {
        idMotivo: indiceIncidencia.motivo,
      },
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

  return (
    <>
      <Button leftIcon={<AddIcon/>} size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'}>
        Nueva Incidencia
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
            <ModalHeader>Crear Nueva Incidencia</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl mt={4} isRequired>
                <FormLabel>Motivo</FormLabel>
                  <SelectForm placeholder='-----Selecciona un Motivo-----'
                    onChange ={e => setIndiceIncidencia({...indiceIncidencia, motivo:  e.target.value })}
                  >
                    {motivoData.map((item, idx) => (
                      <option value={item.idMotivo} key={idx}>
                        {item.motivo}
                      </option>
                    ))}
                  </SelectForm>
              </FormControl>
              <FormControl mt={4} isRequired>
              <FormLabel>Descripcion</FormLabel>
              <Textarea
                onChange={e => {
                  setIndiceIncidencia({
                    ...indiceIncidencia,
                    descripcion: e.target.value.toUpperCase(),
                  });
                }}
                placeholder='Aqui describe la incidencia'
                size='sm'
            />
            </FormControl>
              {/* <FormControl mt={4}>
                <FormLabel>Usuario Asignado</FormLabel>
                  <SelectForm
                  onChange ={e => setIndiceIncidencia({...indiceIncidencia, persona_asignado:  e.target.value })
                  }
                  >
                    {personaData.map((item, idx) => (
                      <option value={item.idpersona} key={idx}>
                        {item.nombre}
                      </option>
                    ))}
                  </SelectForm>
              </FormControl> */}
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default IncidenciaAgregar;
