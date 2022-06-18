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
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FaFingerprint } from 'react-icons/fa';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deletePersona, updatePersona } from '../../../actions/persona';

import PersonaAgregar from './PersonaAgregar';

export default function TablePersona() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().persona.rows;
  const dataPerfil = store.getState().perfilPersona.rows;

  console.log(data);

  const [indice, setIndice] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    usuario: '',
    password: '',
    fecha: null,
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: null,
    },
  });

  const [personaid, setPersonaid] = useState({
    idPersona: null,
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeletePersona = x => {
    dispatch(deletePersona(x))
      .then(() => {
        handleCloseDelete(true);
        console.log('Persona eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleUpdatePersona = e => {
    e.preventDefault();
    dispatch(updatePersona(indice))
      .then(() => {
        handleCloseEdit(true);
        console.log('Persona actualizado');
        console.log(indice);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClickOpenDelete = index => {
    setPersonaid(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const columns = [
    {
      name: <b>#</b>,
      selector: row => row.idpersona,
      sortable: true,
      wrap: true,
    },
    {
      name: <b>NOMBRE</b>,
      selector: row => row.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: <b>APELLIDOS</b>,
      selector: row => row.apellido,
      sortable: true,
      wrap: true,
    },
    {
      name: <b>PERFIL PERSONA</b> ,
      selector: row => row.perfilPersona.perfil,
      sortable: true,
    },
    {
      name: <b>ESTADO</b>,
      selector: row => row.activo,
      sortable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.activo === 'S' ? 'green.400' : bgStatus}
            color={row.activo === 'S' ? 'white' : colorStatus}
            p="3px 10px"
            w={20}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'10px'}
          >
            {row.activo === 'S' ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: <b>ACCIONES</b>,
      sortable: false,
      cell: row => (
        <div>
          <Switch
            colorScheme={'red'}
            mr={2}
            isChecked={row.activo === 'S'}
            onChange={() => handleClickOpenDelete(row.idpersona)}
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
                    onClick={() => handleDeletePersona(personaid)}
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
            <form>
              <ModalContent>
                <ModalHeader>Editar Persona</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={2}>
                  <FormControl>
                    <Input
                      value={indice ? indice.idpersona : ''}
                      disabled={true}
                      type="text"
                      hidden={true}
                      //defaultValue={indice ? (indice.nombre):("")}
                    />
                  </FormControl>
                  <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={3}>
                    <GridItem h="10" colSpan={4}>
                      <Input
                        defaultValue={indice ? indice.dni : ''}
                        onChange={e =>
                          setIndice({ ...indice, dni: e.target.value })
                        }
                        placeholder="ingrese su DNI"
                        type={'text'}
                      />
                    </GridItem>
                    <GridItem h="10" colSpan={1}>
                      <Button colorScheme="teal" variant="solid">
                        {' '}
                        <FaFingerprint />{' '}
                      </Button>
                    </GridItem>
                  </Grid>
                  <HStack spacing={'10px'} mt={3}>
                    <FormControl>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        defaultValue={indice ? indice.nombre : ''}
                        onChange={e =>
                          setIndice({ ...indice, nombre: e.target.value })
                        }
                        placeholder="Nombres"
                        type={'text'}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Apellidos</FormLabel>
                      <Input
                        defaultValue={indice ? indice.apellido : ''}
                        onChange={e =>
                          setIndice({ ...indice, apellido: e.target.value })
                        }
                        placeholder="Apellidos"
                        type={'text'}
                      />
                    </FormControl>
                  </HStack>
                  <HStack spacing={'10px'} mt={'20px'}>
                    <FormControl>
                      <FormLabel>Usuario</FormLabel>
                      <Input
                        defaultValue={indice ? indice.usuario : ''}
                        onChange={e =>
                          setIndice({ ...indice, usuario: e.target.value })
                        }
                        placeholder="USUARIO"
                        type={'text'}
                      />
                    </FormControl>
                    <FormControl isRequired={true}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        defaultValue={''}
                        onChange={e =>
                          setIndice({ ...indice, password: e.target.value })
                        }
                        type={'password'}
                        placeholder="minimo 8 caracteres"
                      />
                    </FormControl>
                  </HStack>

                  <FormControl mt={4}>
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <Input
                      defaultValue={indice ? indice.fecha : ''}
                      onChange={e =>
                        setIndice({ ...indice, fecha: e.target.value })
                      }
                      type={'date'}
                    />
                    {/* onChange={(e)=> {setIndice({ ...persona, fecha: (e.target.value) }); setValidation(false)}}  /> */}
                  </FormControl>

                  <HStack spacing={'10px'} mt={'20px'}>
                    <FormControl>
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
                    <FormControl>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        defaultValue={indice ? indice.sexo : ''}
                        onChange={e =>
                          setIndice({ ...indice, sexo: e.target.value })
                        }
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </Select>
                    </FormControl>
                  </HStack>

                  <FormControl mt={4}>
                    <FormLabel>Perfil</FormLabel>
                    <Select
                      defaultValue={
                        indice ? indice.perfilPersona.idPerfilPersona : ''
                      }
                      onChange={e =>
                        setIndice({ ...indice, perfilPersona: e.target.value })
                      }
                    >
                      {dataPerfil.map((item, idx) => (
                        <option value={item.idPerfilPersona} key={idx}>
                          {item.perfil}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type={'submit'}
                    onClick={e => handleUpdatePersona(e)}
                    colorScheme={'green'}
                    mr={3}
                  >
                    Actualizar
                  </Button>
                  <Button onClick={handleCloseEdit}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </form>
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
            Personas Table
          </Text>
        </Box>
        <Box>
          <PersonaAgregar />
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
