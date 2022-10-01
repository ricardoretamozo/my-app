import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  useColorModeValue,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialog,
  Switch,
  Text,
  HStack,
  Badge,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';

import {
  CheckCircleIcon,
  NotAllowedIcon,
} from '@chakra-ui/icons';
import { FaUserSecret } from 'react-icons/fa';

import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deletePersona } from '../../../actions/persona';

import PersonaAgregar from './PersonaAgregar';

import { fetchPersonaOrgano } from '../../../actions/personaOrgano';
import ModalOrganoAsignacion from './ModalOrganoAsignacion';

import { BsArrowDown } from 'react-icons/bs';

import PersonaEditar from './PersonaEditar';

export default function TablePersona() {
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

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().persona.rows;

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

  const handleClickOpenModal = index => {
    fetchDataPersonaOrgano(index.idpersona);
    setIndice(index);
    setOpenModal(true);
  };

  const [personaOrganos, setPersonaOrganos] = useState([]);

  const fetchDataPersonaOrgano = async idpersona => {
    await fetchPersonaOrgano(idpersona).then(res => {
      setPersonaOrganos(res.data);
    });
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

    },
    {
      name: <b>NOMBRE</b>,
      selector: row => row.nombre,
      sortable: true,

    },
    {
      name: <b>APELLIDOS</b>,
      selector: row => row.apellido,
      sortable: true,

    },
    {
      name: <b>PERFIL PERSONA</b>,
      selector: row => row.perfilPersona.perfil,
      sortable: true,
    },
    {
      name: <b>ESTADO</b>,
      selector: row => row.activo,
      sortable: true,
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
    },
    {
      name: <b>PERMISOS</b>,
      sortable: true,
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
          ) : null}
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
          <PersonaEditar row = {row} />

          <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="2xl">
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
            sortIcon={<BsArrowDown />}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            responsive={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 15, 20, 30]}
            fixedHeader
            fixedHeaderScrollHeight="550px"
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}