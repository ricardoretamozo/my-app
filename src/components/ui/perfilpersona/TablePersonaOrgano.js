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
  Badge,
  HStack,
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import {
  deletePerfilPersona,
  updatePerfilPersona,
} from '../../../actions/perfilPersona';

import PerfilPersonaAgregar from './PerfilPersonaAgregar';

export default function Tables() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();
  // const perfil_persona = useSelector(state => state.perfilPersona);
  const data = store.getState().perfilPersona.rows;

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

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
      name: 'PERFIL',
      selector: row => row.perfil,
      sortable: true,
    },
    {
      name: 'DESCRIPCIÓN',
      selector: row => row.descripcion,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.activo,
      sortable: true,
      cell: row => (
        <div>
          <Badge
          bg={row.activo === "S" ? "green.400" : bgStatus}
          color={row.activo === "S" ? "white" : colorStatus}
          p="3px 10px"
          w={20}
          textAlign={'center'}
          borderRadius={'md'}
          fontSize={'10px'}
        >
          {row.activo === "S" ? "Activo" : "Inactivo"}
        </Badge>
        </div>
      ),
      center: true,
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
            onChange={() => handleClickOpenDelete(row.idPerfilPersona)}
          />
          <Button
            onClick={() => handleClickOpenEdit(row)}
            size={'xs'}
            colorScheme={'blue'}
          >
            EDITAR
          </Button>
          <AlertDialog isOpen={opendelete} onClose={handleCloseDelete}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">

                  {row.activo == 'S' ?  '¿ESTÁ SEGURO DE ACTIVAR?' : 'ESTÁ SEGURO DE ANULAR?'}

                </AlertDialogHeader>

                <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={handleCloseDelete}>CANCELAR</Button>
                  <Button
                    onClick={() =>
                      handleDeletePerfilPersona(row.idPerfilPersona)
                    }
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

          <Modal isOpen={openedit} onClose={handleCloseEdit} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader display={'flex'} justifyContent={'center'}>
                EDITAR PERFIL
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    value={indice ? indice.idPerfilPersona : ''}
                    disabled={true}
                    hidden={true}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>PERFIL</FormLabel>
                  <Input
                    autoFocus
                    defaultValue={indice ? indice.perfil : ''}
                    type="text"
                    textTransform={'uppercase'}
                    onChange={e =>
                      setIndice({ ...indice, perfil: (e.target.value).toUpperCase() })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>DESCRIPCIÓN</FormLabel>
                  <Textarea
                    autoFocus
                    defaultValue={indice ? indice.descripcion : ''}
                    onChange={e =>
                      setIndice({ ...indice, descripcion: (e.target.value).toUpperCase() })
                    }
                    placeholder="Descripcion"
                    textTransform={'uppercase'}
                    type="text"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>ESTADO</FormLabel>
                  <Select
                    defaultValue={indice ? indice.activo : ''}
                    onChange={e =>
                      setIndice({ ...indice, activo: e.target.value })
                    }
                  >
                    <option value="S">ACTIVO</option>
                    <option value="N">INACTIVO</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={e => actualizarPerfilPersona(e)}
                  colorScheme="green"
                  mr={3}
                >
                  ACTUALIZAR
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
      boxShadow={'md'}
      bg={useColorModeValue('white', 'gray.900')}
    >
    <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'} p={4}>
          <Box>
            <Text fontSize='lg' fontWeight='600'>
              TABLA DE PERFILES DEL USUARIO
            </Text>
          </Box>
          <Box>
            <PerfilPersonaAgregar/>
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
