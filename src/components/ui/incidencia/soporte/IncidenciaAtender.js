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
  IconButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogCloseButton,
} from '@chakra-ui/react';

import { CheckIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { createSolucionIncidencia, fetchIncidenciaSoporte } from '../../../../actions/incidencia';
import { getIncidenciasAsignadasSoporte } from './incidencia';

const IncidenciaAtender = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { identificador } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    descripcion: '',
    incidencia: {
      idIncidencia: props.rowId
    }
  })

  const handleClickOpenModal = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const handleClickCloseAlert = () => {
    setOpenAlert(false);
  }

  const handleClickOpenAlert = (e) => {
    e.preventDefault();
    setOpenAlert(true);
  }

  const fetchDataIncidencias = async () => {
    await fetchIncidenciaSoporte(identificador).then((res)=>{
      dispatch(getIncidenciasAsignadasSoporte(res));
    });
  }

  const saveDetallesIncidenciaAtendida = () => {
    var detallesSolucion = {
      descripcion: indice.descripcion,
      incidencia: indice.incidencia.idIncidencia,
    }
    dispatch(createSolucionIncidencia(detallesSolucion)).then(() => {
      fetchDataIncidencias();
      handleCloseModal(true);
      handleClickCloseAlert(true);
    }).catch(() => {
      handleCloseModal(true);
      handleClickCloseAlert(true);
    });
  };

  return (
    <>
      <IconButton
        icon={<CheckIcon />}
        variant={'solid'}
        colorScheme={'green'}
        onClick={() => handleClickOpenModal(props.rowId)}
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
        <form onSubmit={handleClickOpenAlert}>
          <ModalContent>
            <ModalHeader>DETALLES DE LA ATENCIÓN A LA INCIDENCIA</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />

            <ModalBody pb={6}>              
              <FormControl mt={4} isRequired>
              <FormLabel>DESCRIPCIÓN DE LA ATENCIÓN</FormLabel>
              <Textarea
                onChange={e => {
                  setIndice({
                    ...indice,
                    descripcion: e.target.value.toUpperCase(),
                  });
                }}
                placeholder='DESCRIBE TODO LOS DETALLES DE LA ATENCIÓN BRINDADA A ESTA INCIDENCIA'
                textTransform={'uppercase'}
                rows={4}
                required
            />
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} colorScheme={'green'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red">CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      {/* CONFIRMAR SI REALMENTE QUIERE GUARDAR LOS DETALLES */}
      
      <AlertDialog isOpen={openAlert} onClose={handleClickCloseAlert} size={'2xl'} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="xl" fontWeight="bold">
              ¿ESTÁ SEGURO DE GUARDAR DETALLES DE LA ATENCIÓN?
            </AlertDialogHeader>
            <AlertDialogCloseButton _focus={{ boxShadow: "none" }}/>
            <AlertDialogBody>
                ¿CONFIRMAR LA ACCIÓN?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleClickCloseAlert} _focus={{ boxShadow: "none" }} colorScheme="red">CANCELAR</Button>
              <Button
                colorScheme="green"
                ml={3}
                _focus={{ boxShadow: "none" }}
                onClick={() => saveDetallesIncidenciaAtendida()}
              >
                CONFIRMAR
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default IncidenciaAtender;
