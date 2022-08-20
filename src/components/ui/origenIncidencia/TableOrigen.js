import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  useColorModeValue,
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
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';
import { RiDeleteBackLine } from 'react-icons/ri';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

import { deleteOrigen, updateOrigen } from '../../../actions/origenIncidencia';

import OrigenAgregar from './OrigenAgregar';

export default function TableOrigen() {

  const data = store.getState().origenIncidencia.rows;

  const columns = [
    {
      name: 'ORIGEN',
      selector: row => row.origen,
      sortable: true,
      wrap: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>

          <ModalOrigenEditar row={row} />

          <ModalOrigenEliminar row={row} />

        </div>
      ),
      center: true,
      wrap: true,
    },
  ];

  const tableData = {
    columns,
    data,
  };

  // TEMA PARA LA TABLA

  createTheme('solarized', {
    text: {
      primary: '#FFF',
      secondary: '#FFF',
    },
    background: {
      default: '#171923',
    },
    context: {
      background: '#171923',
      text: '#FFF',
    },
    divider: {
      default: '#FFF opacity 92%',
    },
  });

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={'md'}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <HStack
        spacing="24px"
        width={'100%'}
        justifyContent={'space-between'}
        verticalAlign={'center'}
        p={4}
      >
        <Box>
          <Text fontSize="lg" fontWeight="600">
            TABLA DE ORIGEN DE INCIDENCIA
          </Text>
        </Box>
        <Box>
          <OrigenAgregar />
        </Box>
      </HStack>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          defaultSortAsc={false}
          theme={useColorModeValue('default', 'solarized')}
          pagination
          ignoreRowClick={true}
          responsive={true}
          paginationPerPage={8}
          paginationRowsPerPageOptions={[8, 15, 20, 30]}
        />
      </DataTableExtensions>
    </Box>
  );
}


const ModalOrigenEditar = ({ row }) => {

  const [openedit, setOpenEdit] = React.useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idOrigen: null,
    origen: '',
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickUpdate = e => {
    e.preventDefault();
    dispatch(updateOrigen(indice))
      .then(() => {
        handleCloseEdit(true);
        console.log('Origen actualizado');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <IconButton
        icon={<AiTwotoneEdit />}
        variant={'outline'}
        colorScheme={'facebook'}
        onClick={() => handleClickOpenEdit(row)}
        fontSize={'22px'}
        size={'sm'}
        _focus={{ boxShadow: "none" }}
      />
      <Modal isOpen={openedit} onClose={handleCloseEdit} size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            EDITAR EL ORIGEN DE LA INCIDENCIA
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                value={indice ? indice.idOrigen : ''}
                disabled={true}
                type="text"
                hidden={true}
              />
            </FormControl>
            <FormControl>
              <FormLabel>ORIGEN</FormLabel>
              <Input
                defaultValue={indice ? indice.origen : ''}
                textTransform={'uppercase'}
                type="text"
                onChange={e =>
                  setIndice({ ...indice, origen: e.target.value.toUpperCase() })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={e => handleClickUpdate(e)}
              colorScheme="green"
              mr={3}
              _focus={{ boxShadow: "none" }}
            >
              ACTUALIZAR
            </Button>
            <Button onClick={handleCloseEdit} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ModalOrigenEliminar = ({ row }) => {

  const [opendelete, setOpenDelete] = React.useState(false);

  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idOrigen: null,
    origen: '',
  });

  const handleClickDelete = () => {
    dispatch(deleteOrigen(indice))
      .then(() => {
        handleCloseDelete(true);
        console.log('Origen eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = index => {
    setIndice(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


  return (
    <>
      <IconButton
        icon={<RiDeleteBackLine />}
        variant={'solid'}
        colorScheme={'red'}
        onClick={() => handleClickOpenDelete(row.idOrigen)}
        fontSize={'22px'}
        size={'sm'}
        ml={2}
        _focus={{ boxShadow: "none" }}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'xl'}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text>¿ESTÁ SEGURO DE ELIMINAR ESTE ORIGEN?</Text>
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
              <Button
                onClick={() => handleClickDelete(row.idOrigen)}
                colorScheme="red"
                ml={3}
                _focus={{ boxShadow: "none" }}
              >
                SI
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}