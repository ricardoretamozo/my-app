import React from 'react';
import { useSelector } from 'react-redux';
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
} from '@chakra-ui/react';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { format } from "date-fns";

import IncidenciaAgregar from '../IncidenciaAgregar';
import IncidenciaDetalles from '../IncidenciaDetalles';

export default function TableIncidenciaAsignados() {
  const [opendelete, setOpenDelete] = React.useState(false);
  const { identificador } = useSelector(state => state.auth);

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().incidenciasAsignadas.rows;

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const columns = [
    {
      name: 'USUARIO',
      selector: row => row.persona.nombre + ' ' + row.persona.apellido,
      sortable: true,
    },
    {
      name: 'IP',
      selector: row => row.ip,
      sortable: true,
    },
    {
        name: 'FECHA Y HORA',
        selector: row => format(new Date(row.fecha), "dd/MM/yyyy - HH:mm:ss"),
        sortable: true,
    },
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
    },
    {
        name: 'USUARIO ASIGNADO',
        selector: row => row.persona_asignado.nombre + ' ' + row.persona_asignado.apellido,
        sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.estado,
      sortable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.estado === 'P' ? 'red.500' : row.estado === 'T' ? 'yellow.500': 'green.500'}
            color={'white'}
            p="3px 10px"
            w={24}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'10px'}
          >
            {row.estado === 'P' ? 'PENDIENTE' : row.estado === 'T' ? 'EN TRAMITE' : 'ATENTIDO'}
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
            identificador = { identificador }
          />
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
        paddingBottom={8}
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
            TABLA DE INCIDENCIAS ASIGNADAS
            </Text>
          </Box>
          <Box>
            <IncidenciaAgregar />
          </Box>
        </HStack>
        <DataTableExtensions columns={columns} data={data}>
          <DataTable
            defaultSortAsc={false}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            responsive={true}
            paginationPerPage={8}
            noDataComponent="No hay datos para mostrar refresca la página"
            paginationRowsPerPageOptions={[8, 15, 20, 30]}
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
