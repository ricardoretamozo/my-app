import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Text,
  HStack,
  Badge,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deleteIncidencia, fetchIncidencia } from '../../../../actions/incidencia';

import IncidenciaAgregar from '../IncidenciaAgregar';
import IncidenciaDetalles from '../IncidenciaDetalles';

export default function TableIncidenciaSoporte() {
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().incidenciasAsignadasSoporte.rows;

  console.log(data);

  // const dataA = data.filter(incidencia => incidencia.persona_asignado === identificador);

  const [organoid, setOrganoid] = useState({
    idOrgano: null,
  });

  const [detalleIncidencia, setDetalleIncidencia] = useState([]);
  
  const handleDeleteOrgano = x => {
    dispatch(deleteIncidencia(x))
      .then(() => {
        handleCloseDelete(true);
        console.log('Sede eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  // const [userorgano, setOrgano] = useState(initialOrgano);

  const handleClickOpenDelete = index => {
    setOrganoid(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const obtenerIncideciadetalle = async () => {
    await fetchIncidencia(identificador).then((res)=>{
      dispatch(setDetalleIncidencia(res));
    });
    console.log(detalleIncidencia);
  }

  const columns = [
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
    },
    {
      name: 'DESCRIPCION',
      selector: row => row.descripcion,
      sortable: true,
    },
    {
        name: 'FECHA',
        selector: row => row.fecha,
        sortable: true,
    },
    {
        name: 'USUARIO ASIGNADO',
        selector: row => row.persona_asignado == null ? "NO ASIGNADO" : row.persona_asignado.nombre,
        sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.estado,
      sortable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.estado === 'A' ? 'green.400' : bgStatus}
            color={row.estado === 'A' ? 'white' : colorStatus}
            p="3px 10px"
            w={24}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'10px'}
          >
            {row.estado === 'P' ? 'PENDIENTE' : 'SOLUCIONADO'}
          </Badge>
        </div>
      ),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => {
        return (
          <div>
          <IncidenciaDetalles 
            rowId = {row.idIncidencia} 
            listarIncidenciaDetalle = {obtenerIncideciadetalle}
            identificador = { identificador }
          />
          <IconButton
            icon={<CheckIcon />}
            variant={'solid'}
            colorScheme={'green'}
            onClick={() => handleClickOpenDelete(row.idIncidencia)}
            fontSize={'22px'}
            size={'sm'}
            ml={2}
          />
            {/* <Switch
              colorScheme={'red'}
              mr={2}
              isChecked={row.activo === 'S'}
              onChange={() => handleClickOpenDelete(row.idOrgano)}
            /> */}
            <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'xl'}>
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
                      onClick={() => handleDeleteOrgano(organoid)}
                      colorScheme="red"
                      ml={3}
                    >
                      Si
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </div>
        );
      },
      center: true,
    },
  ];

  const tableData = {
    columns,
    data,
    print: false,
    export: false,
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
              INCIDENCIAS ASIGNADAS A MI PERSONA
            </Text>
          </Box>
          <Box>
            <IncidenciaAgregar />
          </Box>
        </HStack>
        <DataTableExtensions columns={columns} data={data}>
          <DataTable
            columns={columns}
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
