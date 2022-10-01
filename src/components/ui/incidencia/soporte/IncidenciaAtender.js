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
  IconButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogCloseButton,
  Input,
} from '@chakra-ui/react';

import { CheckIcon } from '@chakra-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { createSolucionIncidencia, fetchIncidenciaSoporte } from '../../../../actions/incidencia';
import { getIncidenciasAsignadasSoporte } from './incidencia';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../../../../helpers/quillConfig';

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

  const [incidenciaArchivos, setIncidenciaArchivos] = useState(null);

  const handleClickOpenModal = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    indice.descripcion = '';
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
      archivo: incidenciaArchivos
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

  const handleSubmitFile = (e) => {
    setIncidenciaArchivos(e.target.files[0]);
  }

  return (
    <>
      <IconButton
        icon={<CheckIcon />}
        variant={'solid'}
        colorScheme={'green'}
        onClick={() => handleClickOpenModal(props.rowId)}
        size={'sm'}
        fontSize={'20px'}
        ml={1}
        _focus={{ boxShadow: "none" }}
      />

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'5xl'}
      >
        <ModalOverlay />
        <form onSubmit={handleClickOpenAlert}>
          <ModalContent>
            <ModalHeader>DETALLES DE LA ATENCIÓN A LA INCIDENCIA</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />

            <ModalBody pb={6}>              
              <FormControl mt={4} isRequired>
              <FormLabel>DESCRIPCIÓN DE LA ATENCIÓN</FormLabel>
              <ReactQuill
                theme="snow"
                style={{
                  textTransform: 'uppercase',
                  textAlignLast: 'center'
                }}
                modules={modules}
                formats={formats}
                onChange={(e) => setIndice({ ...indice, descripcion: e.valueOf() })}
              />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>SUBIR ARCHIVO(opcional)</FormLabel>
                <Input 
                  type='file'
                  onChange={e => handleSubmitFile(e)}
                  name='archivo'
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button disabled={indice.descripcion.length < 5 || indice.descripcion === ''} type={'submit'} colorScheme={'green'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
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
