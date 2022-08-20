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
  },[]);

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

  const handleChangeMotivo = value => {
    setIndiceMotivo(value.value);
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} size="sm" onClick={handleClickOpenCreate} colorScheme={'facebook'} _focus={{ boxShadow: "none" }}>
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
            </ModalBody>
            <ModalFooter>
              <Button disabled={indiceMotivo === null ? true : false} type={'submit'} colorScheme={'facebook'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
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
