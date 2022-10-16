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
  IconButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogCloseButton,
  Input,
  HStack,
  Text,
  Stack,
  Box,
  Image,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { CheckIcon } from '@chakra-ui/icons';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { createSolucionIncidencia, fetchIncidenciaSoporte, fetchMisIncidencias } from '../../../../actions/incidencia';
import { getIncidenciasAsignadasSoporte } from './incidencia';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '../../../../helpers/quillConfig';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { getMisIncidencias } from '../asistente/incidencia';

const IncidenciaAtender = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
    setIncidenciaArchivos(null);
  };

  const handleClickCloseAlert = () => {
    setOpenAlert(false);
  }

  const handleClickOpenAlert = (e) => {
    e.preventDefault();
    setOpenAlert(true);
  }

  const fetchDataIncidencias = async () => {
    await fetchIncidenciaSoporte(identificador).then((res) => {
      dispatch(getIncidenciasAsignadasSoporte(res));
    });
  }

  const fetchDataMisIncidencias = async () => {
    const response = await fetchMisIncidencias(identificador);
    dispatch(getMisIncidencias(response));
  }

  const saveDetallesIncidenciaAtendida = () => {
    var detallesSolucion = {
      descripcion: indice.descripcion,
      incidencia: indice.incidencia.idIncidencia,
      archivo: incidenciaArchivos
    }
    dispatch(createSolucionIncidencia(detallesSolucion)).then(() => {
      handleCloseModal(true);
      handleClickCloseAlert(true);
      fetchDataIncidencias();
      fetchDataMisIncidencias();
    }).catch(() => {
      handleCloseModal(true);
      handleClickCloseAlert(true);
    });
  };

  const handleSubmitFile = (e) => {
    setIncidenciaArchivos(e.target.files[0]);
  }

  const handleCloseModalFile = () => {
    setOpenModal(false);
  }

  const handlePreviewFile = () => {
    setOpenModal(true)
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
                  }}
                  placeholder="Ingrese la descripción de la atención"
                  modules={modules}
                  formats={formats}
                  onChange={(e) => setIndice({ ...indice, descripcion: e.valueOf().toUpperCase() })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>SUBIR ARCHIVO(opcional)</FormLabel>
                <InputGroup size='md'>
                  <Input
                    type='file'
                    onChange={e => handleSubmitFile(e)}
                    name='archivo'
                    accept='image/*, application/*'
                  />
                  <InputRightElement>
                    <IconButton colorScheme={'telegram'}
                      size={'sm'}
                      hidden={incidenciaArchivos === null}
                      icon={<AiOutlineFileSearch fontSize="20px" />}
                      onClick={handlePreviewFile}
                      _focus={{ boxShadow: 'none' }} />
                  </InputRightElement>
                  <ModalPreviewFile
                    size={'2xl'}
                    file={incidenciaArchivos}
                    archivo={incidenciaArchivos}
                    open={openModal}
                    onClose={handleCloseModalFile}
                  />
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button disabled={indice.descripcion.length < 5 || indice.descripcion === ''} type={'submit'} colorScheme={'green'} autoFocus mr={3} _focus={{ boxShadow: "none" }}>
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
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
            <AlertDialogCloseButton _focus={{ boxShadow: "none" }} />
            <AlertDialogBody>
              ¿CONFIRMAR LA ACCIÓN?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleClickCloseAlert} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
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

const ModalPreviewFile = ({ open, onClose, file }) => {
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Modal isOpen={open} onClose={onClose} size={'5xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'} fontWeight='extrabold'>PREVISUALIZACIÓN DEL ARCHIVO</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody pb={2} maxH={'80%'}>
          <Stack direction={'row'} justifyContent="space-around" spacing={2} mb={6} textAlign="center" alignItems="center" w={'full'}>
            <HStack spacing={2} align="baseline">
              <Text fontSize={'xs'} fontWeight={'bold'}>NOMBRE DEL ARCHIVO:</Text>
              <Text fontSize={'xs'}>{file?.name}</Text>
            </HStack>
            <HStack spacing={2} align="baseline">
              <Text fontSize={'xs'} fontWeight={'bold'}>TAMAÑO:</Text>
              <Text fontSize={'xs'}>{(file?.size / 1000000).toFixed(2)} MB</Text>
            </HStack>
            <HStack spacing={2} align="baseline">
              <Text fontSize={'xs'} fontWeight={'bold'}>FECHA ACTUAL:</Text>
              <Text fontSize={'xs'}>{ moment(Date(file?.lastModifiedDate)).format('YYYY/MM/DD : HH:mm:ss') }</Text>
            </HStack>
          </Stack>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w="full" borderWidth="1px" borderRadius={'lg'}>
            {file?.type.includes('image') ? (
              <Image src={filePreview} alt={file?.name} maxBlockSize={'60vh'} />
            ) : file?.type.includes('pdf') ? (
              <iframe src={filePreview} title={file?.name} width="100%" height="450px" />
            ) : (
              <Stack direction="column" textAlign="center" alignItems="center">
                <Text fontSize={'sm'} fontWeight={'bold'} textAlign="center" color={'red.500'} mb={4}>No se puede previsualizar el archivo</Text>
                <Image src={"https://pngimg.com/uploads/folder/folder_PNG100476.png"} textAlign="center" w={'150px'} />
              </Stack>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} _focus={{ boxShadow: 'none' }} colorScheme="green">OK</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
