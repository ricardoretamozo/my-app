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
  IconButton,  
  useDisclosure,
  Select as SelectForm,
} from '@chakra-ui/react';

import { CheckIcon } from '@chakra-ui/icons';

import { store } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidenciaId } from './incidencia';

import {
    createIncidencia, fetchIncidenciasPersonas, buscarUsuarioDni
  } from '../../../../actions/incidencia';

const IncidenciaAtender = (props) => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const motivoData = store.getState().motivo.rows;
  const { identificador } = useSelector(state => state.auth);

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const handleClickOpenModal = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const saveDetallesIncidenciaAtendida = e => {
    e.preventDefault();
    console.log('guardando los detalles de la incidencia atendida');
  };

  return (
    <>
      <IconButton
        icon={<CheckIcon />}
        variant={'solid'}
        colorScheme={'green'}
        onClick={() => handleClickOpenModal(props.Id)}
        fontSize={'22px'}
        size={'sm'}
        ml={1}
        _focus={{ boxShadow: "none" }}
      />

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'4xl'}
      >
        <ModalOverlay />
        <form onSubmit={saveDetallesIncidenciaAtendida}>
          <ModalContent>
            <ModalHeader>DETALLES DE LA ATENCIÓN A LA INCIDENCIA</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />

            <ModalBody pb={6}>              
              <FormControl mt={4} isRequired>
              <FormLabel>DESCRIPCIÓN DE LA ATENCIÓN</FormLabel>
              <Textarea
                // onChange={e => {
                //   setIndiceIncidencia({
                //     ...indiceIncidencia,
                //     descripcion: e.target.value.toUpperCase(),
                //   });
                // }}
                placeholder='DESCRIBE TODO LOS DETALLES DE LA ATENCIÓN BRINDADA A ESTA INCIDENCIA'
                style={{'text-transform':'uppercase'}}
                rows={4}
            />
            </FormControl>
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

export default IncidenciaAtender;
