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
  IconButton,
  Heading,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { CheckIcon, CalendarIcon } from '@chakra-ui/icons';

import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import IncidenciaAgregar from '../IncidenciaAgregar';
import IncidenciaDetalles from '../IncidenciaDetalles';
import IncidenciaAtender from './IncidenciaAtender';
import { format } from "date-fns";

export default function TableIncidenciaSoporte() {
  const [opendelete, setOpenDelete] = React.useState(false);
  const { identificador } = useSelector(state => state.auth);

  const bgStatus = useColorModeValue('blue.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().incidenciasAsignadasSoporte.rows;

  // const [userorgano, setOrgano] = useState(initialOrgano);

  const handleClickOpenDelete = index => {
    setOpenDelete(true);
  };

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
      name: 'IP',
      selector: row => row.ip,
      sortable: true,
    },
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
    },
    {
        name: 'FECHA Y HORA',
        selector: row => format(new Date(row.fecha), "dd/MM/yyyy - HH:mm:ss"),
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
          <IconButton
            icon={<CalendarIcon />}
            variant={'outline'}
            colorScheme={'yellow'}
            onClick={() => handleClickOpenDelete(row.idIncidencia)}
            fontSize='20px'
            size={'sm'}
            ml={1}
            _focus={{ boxShadow: "none" }}
          />
          <IncidenciaAtender 
            rowId = {row.idIncidencia}
          />
            <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'3xl'}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="xl" fontWeight="bold" textAlign={'center'}>
                    ¿DERIVAR, EN TRÁMITE, EL ESTADO DE LA INCIDENCIA?
                  </AlertDialogHeader>
                  <AlertDialogCloseButton _focus={{ boxShadow: "none" }}/>
                  <AlertDialogBody>
                  <Box textAlign="center" px={2}>
                    <CalendarIcon boxSize={'80px'} color={'yellow.500'} />
                    <Heading as="h4" size="md" mt={6}>
                      ¿CONFIRMAR LA ACCIÓN?
                    </Heading>
                  </Box>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button onClick={handleCloseDelete} _focus={{ boxShadow: "none" }}>NO</Button>
                    <Button
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
        );
      },
      center: true,
      width: '140px',
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
              INCIDENCIAS ASIGNADAS A MI PERSONA
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
