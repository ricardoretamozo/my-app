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
  Select as SelectChakra,
  Text,
  HStack,
  Badge,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';

import {
  CheckCircleIcon,
  NotAllowedIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { FaUserSecret } from 'react-icons/fa';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deletePersona, updatePersona } from '../../../actions/persona';

import PersonaAgregar from './PersonaAgregar';

import {
  fetchPersonaOrgano,
} from '../../../actions/personaOrgano';
import ModalOrganoAsignacion from './ModalOrganoAsignacion';

export default function TablePersona() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  // Close Modal Organo Asignacion
  const handleCloseModalOrganoAsignacion = () => {
    setOpenModal(false);
  };

  const handleOpenModalOrganoAsignacion = () => {
    setOpenModal(true);
  };
  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().persona.rows;
  const dataPerfil = store.getState().perfilPersona.rows;

  const [indice, setIndice] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    usuario: '',
    password: '',
    correo: '',
    celular: '',
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

  const [personaOrganos, setPersonaOrganos] = useState([]);

  const fetchDataPersonaOrgano = async idpersona => {
    await fetchPersonaOrgano(idpersona).then(res => {
      setPersonaOrganos(res.data);
    });
  };

  const handleClickOpenModal = index => {
    fetchDataPersonaOrgano(index.idpersona);
    setIndice(index);
    setOpenModal(true);
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
      name: <b>PERFIL PERSONA</b>,
      selector: row => row.perfilPersona.perfil,
      sortable: true,
    },
    {
      name: <b>ESTADO</b>,
      selector: row => row.activo,
      sortable: false,
      cell: row => (
        <div>
          <Tooltip
            hasArrow
            label={row.activo === 'S' ? 'ACTIVO' : 'INACTIVO'}
            bg="gray.300"
            color="black"
          >
            <Badge
              bg={row.activo === 'S' ? 'green.400' : bgStatus}
              textColor={row.activo === 'S' ? 'white' : colorStatus}
              p={1}
              textAlign={'center'}
              borderRadius={'lg'}
            >
              {row.activo === 'S' ? (
                <CheckCircleIcon boxSize={5} />
              ) : (
                <NotAllowedIcon boxSize={5} />
              )}
            </Badge>
          </Tooltip>
        </div>
      ),
      center: true,
      wrap: true,
    },
    {
      name: <b>PERMISOS</b>,
      sortable: false,
      cell: row => (
        <div>
          {row.perfilPersona.perfil === 'SOPORTE TECNICO' && row.activo === 'S' ? (
            <IconButton
              onClick={() => handleClickOpenModal(row)}
              variant={'ghost'}
              bgColor={'none'}
              colorScheme="facebook"
              icon={<FaUserSecret size={24} />}
              h={8}
              _focus={{ boxShadow: "none" }}
            />
          ) : // <TableModal handleCloseModal={handleCloseModal} open={openModal} handleOpen={handleClickOpenModal(row)}  />
          null}
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
            colorScheme={'facebook'}
            _focus={{ boxShadow: "none" }}
          >
            <EditIcon />
          </Button>
          <AlertDialog isOpen={opendelete} onClose={handleCloseDelete}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {row.activo === 'S' ? (
                    <Text>ESTÁ SEGURO DE ANULAR?</Text>
                  ) : (
                    <Text>ESTÁ SEGURO DE ACTIVAR?</Text>
                  )}
                </AlertDialogHeader>

                <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={handleCloseDelete} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
                  <Button
                    onClick={() => handleDeletePersona(personaid)}
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

          {/* ----------------------MODAL PARA EDITAR LA TABLA----------------------- */}

          <Modal isOpen={openedit} onClose={handleCloseEdit} size={'4xl'}>
            <ModalOverlay />
            <form onSubmit={handleUpdatePersona}>
              <ModalContent>
                <ModalHeader>EDITAR PERSONA</ModalHeader>
                <ModalCloseButton _focus={{ boxShadow: "none" }} />
                <ModalBody pb={2}>
                  <FormControl>
                    <Input
                      value={indice ? indice.idpersona : ''}
                      disabled={true}
                      type="text"
                      hidden={true}
                    />
                  </FormControl>
                  <HStack spacing={'10px'} mt={3}>
                    <FormControl>
                      <FormLabel>DNI</FormLabel>
                      <Input
                        defaultValue={indice ? indice.dni : ''}
                        onChange={e =>
                          setIndice({ ...indice, dni: e.target.value })
                        }
                        placeholder="ingrese su DNI"
                        type={'text'}                        
                      />
                    </FormControl>
                  </HStack>
                  <HStack spacing={'10px'} mt={3}>
                    <FormControl>
                      <FormLabel>NOMBRE</FormLabel>
                      <Input
                        defaultValue={indice ? indice.nombre : ''}
                        onChange={e =>
                          setIndice({ ...indice, nombre: (e.target.value).toUpperCase() })
                        }
                        placeholder="Nombres"
                        type={'text'}
                        textTransform={'uppercase'}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>APELLIDOS</FormLabel>
                      <Input
                        defaultValue={indice ? indice.apellido : ''}
                        onChange={e =>
                          setIndice({ ...indice, apellido: (e.target.value).toUpperCase() })
                        }
                        placeholder="Apellidos"
                        type={'text'}
                        textTransform={'uppercase'}
                      />
                    </FormControl>
                  </HStack>
                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>USUARIO</FormLabel>
                      <Input
                        defaultValue={indice ? indice.usuario : ''}
                        onChange={e =>
                          setIndice({ ...indice, usuario: e.target.value })
                        }
                        placeholder="Usuario"
                        type={'text'}
                        textTransform='uppercase'
                      />
                    </FormControl>
                    <FormControl isRequired={true}>
                      <FormLabel>PASSWORD</FormLabel>
                      <Input
                        defaultValue={''}
                        onChange={e =>
                          setIndice({ ...indice, password: e.target.value })
                        }
                        type={'password'}
                        placeholder="minimo 8 caracteres"
                        isRequired
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>CORREO</FormLabel>
                      <Input
                        defaultValue={indice ? indice.correo : ''}
                        onChange={e =>
                          setIndice({ ...indice, correo: e.target.value })
                        }
                        placeholder="Correo"
                        type={'email'}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>NRO CELULAR</FormLabel>
                      <Input
                        defaultValue={indice ? indice.celular : ''}
                        onChange={e =>
                          setIndice({ ...indice, celular: e.target.value })
                        }
                        type={'text'}
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>FECHA DE NACIMIENTO</FormLabel>
                      <Input
                        defaultValue={indice ? indice.fecha : ''}
                        onChange={e =>
                          setIndice({ ...indice, fecha: e.target.value })
                        }
                        type={'date'}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>SEXO</FormLabel>
                      <SelectChakra
                        defaultValue={indice ? indice.sexo : ''}
                        onChange={e =>
                          setIndice({ ...indice, sexo: e.target.value })
                        }
                      >
                        <option value="M">MASCULINO</option>
                        <option value="F">FEMENINO</option>
                      </SelectChakra>
                    </FormControl>
                  </HStack>
                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>ESTADO</FormLabel>
                      <SelectChakra
                        defaultValue={indice ? indice.activo : ''}
                        onChange={e =>
                          setIndice({ ...indice, activo: e.target.value })
                        }
                      >
                        <option value="S">ACTIVO</option>
                        <option value="N">INACTIVO</option>
                      </SelectChakra>
                    </FormControl>
                    <FormControl>
                      <FormLabel>PERFIL</FormLabel>
                      <SelectChakra
                        defaultValue={
                          indice ? indice.perfilPersona.idPerfilPersona : ''
                        }
                        onChange={e =>
                          setIndice({
                            ...indice,
                            perfilPersona: e.target.value,
                          })
                        }
                      >
                        {dataPerfil.map((item, idx) => (
                          <option value={item.idPerfilPersona} key={idx}>
                            {item.perfil}
                          </option>
                        ))}
                      </SelectChakra>
                    </FormControl>
                  </HStack>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type={'submit'}
                    colorScheme={'green'}
                    mr={3}
                    _focus={{ boxShadow: "none" }}
                  >
                    ACTUALIZAR
                  </Button>
                  <Button onClick={handleCloseEdit} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
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
    <>
      <ModalOrganoAsignacion
        abrir={openModal}
        cerrar={handleCloseModalOrganoAsignacion}
        usuario={indice}
        abrirSeter={setOpenModal}
        abrirModalPersonaOrgano={handleOpenModalOrganoAsignacion}
        personaOrgano={personaOrganos}
        setpersonaOrgano={setPersonaOrganos}
      />
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
              TABLA DE USUARIOS
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
    </>
  );
}
