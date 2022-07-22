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
      selector: row => row.persona.nombre,
      sortable: true,
    },
    {
        name: 'FECHA',
        selector: row => row.fecha,
        sortable: true,
    },
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
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
            identificador = { identificador }
          />
          {/* <IconButton
            icon={<RiDeleteBackLine />}
            variant={'solid'}
            colorScheme={'red'}
            onClick={() => handleClickOpenDelete(row.idIncidencia)}
            fontSize={'22px'}
            size={'sm'}
            ml={2}
          /> */}
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
              Incidencias Asignadas
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
