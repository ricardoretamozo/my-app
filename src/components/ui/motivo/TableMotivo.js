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
  Switch,
  Select,
  Text,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deleteSede, updateSede } from '../../../actions/sede';

import MotivoAgregar from './MotivoAgregar';

export default function TableMotivo() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().motivo.rows;

  const [indice, setIndice] = useState({
    idSede: null,
    sede: '',
    direccion: '',
    activo: '',
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteSede = () => {
    dispatch(deleteSede(indice))
      .then(() => {
        handleCloseDelete(true);
        console.log('Sede eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const actualizarSede = e => {
    e.preventDefault();
    dispatch(updateSede(indice))
      .then(() => {
        handleCloseEdit(true);
        console.log('Sede actualizado');
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
          <Switch
            colorScheme={'red'}
            mr={2}
            isChecked={row.activo === 'S'}
            onChange={() => handleClickOpenDelete(row.idSede)}
          />
          <Button
            onClick={() => handleClickOpenEdit(row)}
            size={'xs'}
            colorScheme={'blue'}
          >
            Editar
          </Button>
          <AlertDialog isOpen={opendelete} onClose={handleCloseDelete}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {row.activo === 'S' ? (
                    <Text>Está seguro de anular?</Text>
                  ) : (
                    <Text>Esta seguro de activar?</Text>
                  )}
                </AlertDialogHeader>

                <AlertDialogBody>Confirmo la acción</AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={handleCloseDelete}>Cancelar</Button>
                  <Button
                    onClick={() => handleDeleteSede(row.idSede)}
                    colorScheme="red"
                    ml={3}
                  >
                    Si
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          {/* ----------------------MODAL PARA EDITAR LA TABLA----------------------- */}

          <Modal isOpen={openedit} onClose={handleCloseEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader display={'flex'} justifyContent={'center'}>
                Editar Sede
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    value={indice ? indice.idSede : ''}
                    disabled={true}
                    type="text"
                    hidden={true}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Sede</FormLabel>
                  <Input
                    defaultValue={indice ? indice.sede : ''}
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, sede: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    defaultValue={indice ? indice.direccion : ''}
                    onChange={e =>
                      setIndice({ ...indice, direccion: e.target.value })
                    }
                    placeholder="Dirección"
                    type="text"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    defaultValue={indice ? indice.activo : ''}
                    onChange={e =>
                      setIndice({ ...indice, activo: e.target.value })
                    }
                  >
                    <option value="S">Activo</option>
                    <option value="N">Inactivo</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={e => actualizarSede(e)}
                  colorScheme="green"
                  mr={3}
                >
                  Actualizar
                </Button>
                <Button onClick={handleCloseEdit}>Cancelar</Button>
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
            Sedes Table
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