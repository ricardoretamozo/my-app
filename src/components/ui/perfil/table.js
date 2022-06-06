import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Textarea,
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
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import {
  deletePerfilPersona,
  perfilPersona,
  updatePerfilPersona,
} from '../../../actions/perfilPersona';

import PerfilPersonasAgregar from './PerfilPersonasAgregar';

export default function Tables() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();
  // const perfil_persona = useSelector(state => state.perfilPersona);
  const data = store.getState().perfilPersona.rows;

  const [indice, setIndice] = useState({
    idPerfilPersona: null,
    perfil: '',
    descripcion: '',
    activo: '',
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeletePerfilPersona = () => {
    dispatch(deletePerfilPersona(indice))
      .then(() => {
        handleCloseDelete(true);
        console.log('perfilPersona eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const actualizarPerfilPersona = e => {
    e.preventDefault();
    dispatch(updatePerfilPersona(indice))
      .then(() => {
        handleCloseEdit(true);
        console.log('perfilPersona actualizado');
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
      name: 'Perfil',
      selector: 'perfil',
      sortable: true,
    },
    {
      name: 'Descripcion',
      selector: 'descripcion',
      sortable: true,
    },
    {
      name: 'Activo?',
      selector: 'activo',
      sortable: true,
    },
    {
      name: 'Acciones',
      selector: 'action',
      sortable: false,
      cell: row => (
        <div>
          <Switch
            colorScheme={'red'}
            mr={2}
            isChecked={row.activo === 'S'}
            onChange={() => handleClickOpenDelete(row.idPerfilPersona)}
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
                  Anular Perfil
                </AlertDialogHeader>

                <AlertDialogBody>Está seguro de anular?</AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={handleCloseDelete}>Cancelar</Button>
                  <Button
                    onClick={() =>
                      handleDeletePerfilPersona(row.idPerfilPersona)
                    }
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
                Editar Perfil
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    value={indice ? indice.idPerfilPersona : ''}
                    disabled={true}
                    type="text"
                    hidden={true}
                    //defaultValue={indice ? (indice.nombre):("")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Perfil</FormLabel>
                  <Input
                    autoFocus
                    defaultValue={indice ? indice.perfil : ''}
                    type="text"
                    //defaultValue={item ? (item.perfil):("")}
                    //defaultValue={indice ? (indice.nombre):("")}
                    onChange={e =>
                      setIndice({ ...indice, perfil: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Descripcion</FormLabel>
                  <Textarea
                    autoFocus
                    defaultValue={indice ? indice.descripcion : ''}
                    // defaultValue={item ? (item.descripcion):("")}
                    onChange={e =>
                      setIndice({ ...indice, descripcion: e.target.value })
                    }
                    placeholder="Descripcion"
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
                  onClick={e => actualizarPerfilPersona(e)}
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
      default: '#FFF opacity 92%' ,
    },
  });


  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.900')}
    >
    <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'} p={4}>
          <Box>
            <Text fontSize='lg' fontWeight='600'>
              Perfiles Table
            </Text>
          </Box>
          <Box>
            <PerfilPersonasAgregar/>
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
        />
      </DataTableExtensions>
    </Box>
  );
}
