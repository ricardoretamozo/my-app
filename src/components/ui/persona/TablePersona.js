import React, { useState, useEffect } from 'react';
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
  Grid,
  GridItem,
  Tooltip,
  IconButton,
  Divider,
  Table,
  Thead,
  Th,
  Tr,
  Tfoot,
  Td,
  Tbody,
  TableContainer,
} from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon, EditIcon } from '@chakra-ui/icons';
import { FaFingerprint, FaUserSecret } from 'react-icons/fa';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deletePersona, updatePersona } from '../../../actions/persona';

import PersonaAgregar from './PersonaAgregar';

import Select from 'react-select';
import {
  createPersonaOrgano,
  fetchPersonaOrgano,
} from '../../../actions/personaOrgano';

export default function TablePersona() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().persona.rows;
  const dataPerfil = store.getState().perfilPersona.rows;

  const sedeData = store.getState().sede.rows;
  const organoData = store.getState().organo.rows;

  var organoInfo = organoData;

  console.log(data);

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

  const initialPersonaOrgano = {
    idPersonaOrganica: null,
    persona: {
      idpersona: null,
    },
    organo: {
      idOrgano: null,
    },
  };

  const [organoSelect, setorganoSelect] = useState([
    { idOrgano: 0, organo: 'Seleccione una Sede' },
  ]);
  const [organoNombre, setorganoNombre] = useState(null);

  const [personaid, setPersonaid] = useState({
    idPersona: null,
  });

  const handleChangeSede = value => {
    // setsedeNombre(e.target.value);
    console.log(value);
    if (value == null) {
      setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    } else {
      setorganoSelect(
        organoInfo.filter(indice => indice.sede.idSede == value.value)
      );
    }
    console.log(organoSelect);
  };

  const savePersonaOrgano = e => {
    handleCloseModal(true);
    console.log(indice);
    // console.log(e)
    e.preventDefault();
    var personaOrgano = {
      persona: {
        idpersona: indice.idpersona,
      },
      organo: {
        idOrgano: organoNombre,
      },
    };
    dispatch(createPersonaOrgano(personaOrgano))
      .then(() => {
        console.log('creado correctamente');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeOrgano = value => {
    console.log(value);
    setorganoNombre(value.value);
  };

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const [personaOrganos, setPersonaOrganos] = useState([]);

  const handleClickOpenModal = index => {
    // hacer el fetch
    
    const fetchDataPersonaOrgano = async () => {
      await fetchPersonaOrgano(index).then(res => {
        setPersonaOrganos(res);
      })
      useEffect(() =>{
        fetchDataPersonaOrgano()
      })
    };

    setIndice(index);
    setOpenModal(true);
  };

  console.log(personaOrganos);

  const handleCloseModal = () => {
    setOpenModal(false);
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
            label={row.activo === 'S' ? 'activo' : 'inactivo'}
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
          {row.perfilPersona.perfil === 'ASISTENTE INFORMATICO' ? (
            <IconButton
              onClick={() => handleClickOpenModal(row)}
              variant={'ghost'}
              bgColor={'none'}
              color="blue.500"
              icon={<FaUserSecret size={24} />}
              h={8}
            />
          ) : // <TableModal handleCloseModal={handleCloseModal} open={openModal} handleOpen={handleClickOpenModal(row)}  />
          null}
          <Modal isOpen={openModal} onClose={handleCloseModal} size={'6xl'}>
            <ModalOverlay />
            <form onSubmit={savePersonaOrgano}>
              <ModalContent>
                <ModalHeader>
                  ASIGNACION DE ORGANOS JURIDICCIONALES A ASISTENTES
                  INFORMATICOS
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={2}>
                  <FormControl></FormControl>
                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>Sede</FormLabel>
                      <Select
                        //  defaultValue={indice ? indice.activo : ''}
                        required
                        onChange={handleChangeSede}
                        // onChange={(e)=> { console.log(e.target.value); }}
                        isRequired
                        isSearchable
                        isClearable
                        options={sedeData.map(sede => ({
                          value: sede.idSede,
                          label: sede.sede,
                        }))}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Organo</FormLabel>
                      <Select
                        onChange={handleChangeOrgano}
                        defaultValue={organoSelect.map(organo => ({
                          value: organo.idOrgano,
                          label: organo.organo,
                        }))}
                        isClearable
                        options={organoSelect.map(organo => ({
                          value: organo.idOrgano,
                          label: organo.organo,
                        }))}
                      />
                    </FormControl>
                  </HStack>
                  <FormControl mt={'10px'}>
                    <Button
                      type={'submit'}
                      // onClick={e => handleUpdatePersona(e)}
                      colorScheme={'blue'}
                      mr={3}
                    >
                      Asignar
                    </Button>
                  </FormControl>
                  <Divider
                    orientation="horizontal"
                    borderColor={'blue.500'}
                    border={2}
                    mt={'10px'}
                  />

                  <Text mt={'10px'}>
                    Organos Juridiccionales asignados a{' '}
                    <b> {indice.nombre + ' ' + indice.apellido}</b>
                  </Text>

                  {/* Listado de Organos asignados a ese usuario */}

                  <Table
                    size="sm"
                    alignSelf={'start'}
                    variant="simple"
                    overflowX={'auto'}
                    mt={'10px'}
                  >
                    <Thead>
                      <Tr>
                        <Th>Sede</Th>
                        <Th>Organo</Th>
                        <Th>Acciones</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                      </Tr>
                      <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  {/* <Button
                    type={'submit'}
                    // onClick={e => handleUpdatePersona(e)}
                    colorScheme={'green'}
                    mr={3}
                  >
                    Actualizar
                  </Button> */}
                  <Button onClick={handleCloseModal}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
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
          <Tooltip hasArrow label={'EDITAR'}>
            <Button
              onClick={() => handleClickOpenEdit(row)}
              size={'xs'}
              colorScheme={'blue'}
            >
              <EditIcon />
            </Button>
          </Tooltip>
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

          <Modal isOpen={openedit} onClose={handleCloseEdit} size={'4xl'}>
            <ModalOverlay />
            <form onSubmit={handleUpdatePersona}>
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
                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>Usuario</FormLabel>
                      <Input
                        defaultValue={indice ? indice.usuario : ''}
                        onChange={e =>
                          setIndice({ ...indice, usuario: e.target.value })
                        }
                        placeholder="Usuario"
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
                        isRequired
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>Correo</FormLabel>
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
                      <FormLabel>Nro Celular</FormLabel>
                      <Input
                        defaultValue={indice ? indice.celular : ''}
                        onChange={e =>
                          setIndice({ ...indice, celular: e.target.value })
                        }
                        type={'text'}
                        // placeholder="942035891"
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
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
                    <FormControl>
                      <FormLabel>Sexo</FormLabel>
                      <SelectChakra
                        defaultValue={indice ? indice.sexo : ''}
                        onChange={e =>
                          setIndice({ ...indice, sexo: e.target.value })
                        }
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </SelectChakra>
                    </FormControl>
                  </HStack>
                  <HStack spacing={'10px'} mt={'10px'}>
                    <FormControl>
                      <FormLabel>Estado</FormLabel>
                      <SelectChakra
                        defaultValue={indice ? indice.activo : ''}
                        onChange={e =>
                          setIndice({ ...indice, activo: e.target.value })
                        }
                      >
                        <option value="S">Activo</option>
                        <option value="N">Inactivo</option>
                      </SelectChakra>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Perfil</FormLabel>
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
                    // onClick={e => handleUpdatePersona(e)}
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
