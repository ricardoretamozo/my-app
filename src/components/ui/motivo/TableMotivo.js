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

import { deleteMotivo, updateMotivo } from '../../../actions/motivo';

import MotivoAgregar from './MotivoAgregar';

export default function TableMotivo() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const data = store.getState().motivo.rows;

  const [indice, setIndice] = useState({
    idMotivo: null,
    motivo: '',
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteMotivo = () => {
    dispatch(deleteMotivo(indice))
      .then(() => {
        handleCloseDelete(true);
        console.log('Motivo eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleUpdateMotivo = e => {
    e.preventDefault();
    dispatch(updateMotivo(indice))
      .then(() => {
        handleCloseEdit(true);
        console.log('Motivo actualizado');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClickOpenDelete = index => {
    setIndice(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const columns = [
    {
      name: 'MOTIVO',
      selector: row => row.motivo,
      sortable: true,
      wrap: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => (
        <div>
          <IconButton
            icon={<AiTwotoneEdit />}
            variant={'outline'}
            colorScheme={'blue'}
            onClick={() => handleClickOpenEdit(row)}
            fontSize={'22px'}
            size={'sm'}
          />
          <IconButton
            icon={<RiDeleteBackLine />}
            variant={'solid'}
            colorScheme={'red'}
            onClick={() => handleClickOpenDelete(row.idMotivo)}
            fontSize={'22px'}
            size={'sm'}
            ml={2}
          />

          <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'xl'}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    <Text>¿ESTÁ SEGURO DE ELIMINAR EL MOTIVO?</Text>
                </AlertDialogHeader>

                <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={handleCloseDelete}>CANCELAR</Button>
                  <Button
                    onClick={() => handleDeleteMotivo(row.idMotivo)}
                    colorScheme="red"
                    ml={3}
                  >
                    SI
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          {/* ----------------------MODAL PARA EDITAR LA TABLA----------------------- */}

          <Modal isOpen={openedit} onClose={handleCloseEdit} size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                EDITAR EL MOTIVO DE LA INCIDENCIA
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    value={indice ? indice.idMotivo : ''}
                    disabled={true}
                    type="text"
                    hidden={true}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>MOTIVO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.motivo : ''}
                    textTransform={'uppercase'}
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, motivo: e.target.value.toUpperCase() })
                    }
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={e => handleUpdateMotivo(e)}
                  colorScheme="green"
                  mr={3}
                >
                  ACTUALIZAR
                </Button>
                <Button onClick={handleCloseEdit}>CANCELAR</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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

  // CREANDO UN TEMA PARA LA TABLA

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
            TABLA DE MOTIVOS DE INCIDENCIA
          </Text>
        </Box>
        <Box>
          <MotivoAgregar />
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
