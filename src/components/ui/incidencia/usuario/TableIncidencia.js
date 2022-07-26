import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  chakra,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { store } from '../../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { format } from "date-fns";

// import { deleteIncidencia, fetchIncidencia } from '../../../../actions/incidencia';

import IncidenciaAgregar from './IncidenciaAgregar';

export default function TableIncidencia() {
  // const [opendelete, setOpenDelete] = React.useState(false);
  // const dispatch = useDispatch();
  // const { identificador } = useSelector(state => state.auth);

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  var data = store.getState().incidenciaId.rows;

  // var data.usuario_asignado

  const incidenciasPendientes = data.filter(row => row.estado === 'P');
  const incidenciasAsignadas = data.filter(row => row.estado === 'A');
  const incidenciasSolucionadas = data.filter(row => row.estado === 'S');

  const columns = [
    {
      name: 'MOTIVO',
      selector: row => row.motivo.motivo,
      sortable: true,
      reorder: true,
    },
    {
      name: 'IP',
      selector: row => row.ip,
      sortable: true,
    },
    {
      name: 'DESCRIPCION',
      selector: row => row.descripcion,
      sortable: true,
      reorder: true,
      hide: 'md',
      maxWidth: '20rem',
    },
    {
        name: 'FECHA Y HORA',
        selector: row => format(new Date(row.fecha), "dd/MM/yyyy - HH:mm:ss"),
        sortable: true,
        reorder: true,
    },
    {
        name: 'USUARIO ASIGNADO',
        selector: row => row.persona_asignado == null ? "NO ASIGNADO" : row.persona_asignado.nombre,
        sortable: true,
        reorder: true,
        wrap: true,
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
      reorder: true,
    },
    // {
    //   name: 'ACCIONES',
    //   sortable: false,
    //   cell: row => {
    //     return (
    //       <div>
    //       <IncidenciaDetalles 
    //         rowId = {row.idIncidencia} 
    //         listarIncidenciaDetalle = {obtenerIncideciadetalle}
    //         identificador = { identificador }
    //       />
    //       <IconButton
    //         icon={<RiDeleteBackLine />}
    //         variant={'solid'}
    //         colorScheme={'red'}
    //         onClick={() => handleClickOpenDelete(row.idIncidencia)}
    //         fontSize={'22px'}
    //         size={'sm'}
    //         ml={2}
    //       />
    //         {/* <Switch
    //           colorScheme={'red'}
    //           mr={2}
    //           isChecked={row.activo === 'S'}
    //           onChange={() => handleClickOpenDelete(row.idOrgano)}
    //         /> */}
    //         <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'xl'}>
    //           <AlertDialogOverlay>
    //             <AlertDialogContent>
    //               <AlertDialogHeader fontSize="lg" fontWeight="bold">
    //                 {row.activo === 'S' ? (
    //                   <Text>Está seguro de anular?</Text>
    //                 ) : (
    //                   <Text>Esta seguro de activar?</Text>
    //                 )}
    //               </AlertDialogHeader>

    //               <AlertDialogBody>Confirmo la acción</AlertDialogBody>

    //               <AlertDialogFooter>
    //                 <Button onClick={handleCloseDelete}>Cancelar</Button>
    //                 <Button
    //                   onClick={() => handleDeleteOrgano(organoid)}
    //                   colorScheme="red"
    //                   ml={3}
    //                 >
    //                   Si
    //                 </Button>
    //               </AlertDialogFooter>
    //             </AlertDialogContent>
    //           </AlertDialogOverlay>
    //         </AlertDialog>
    //       </div>
    //     );
    //   },
    //   center: true,
    // },
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
      <Box borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'md'}
        mb={4}
        p={2}
        fontSize={'xs'}
        bg={useColorModeValue('gray.100', 'gray.900')} >
        <SimpleGrid columns={3} spacing={5} textColor={'white'}>
          <Box
            w={'100%'}
            bg="white"
            _dark={{ bg: "gray.800" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign={'center'}
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.800"
              _dark={{ color: "white" }}
            >
              TOTAL DE INCIDENCIAS
            </chakra.h3>
            <Flex
              alignItems="center"
              justify={'center'}
              py={2}
              px={3}
              bg="red.600"
              _dark={{ bg: "gray.700" }}
            >
              <chakra.span
                fontWeight="bold"
                color="white"
                _dark={{ color: "gray.200" }}
              >
                {data.length}
              </chakra.span>
            </Flex>
          </Box>
          <Box
            w={'100%'}
            bg="white"
            _dark={{ bg: "gray.800" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign={'center'}
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.800"
              _dark={{ color: "white" }}
            >
              INCIDENCIAS PENDIENTES
            </chakra.h3>
            <Flex
              alignItems="center"
              justify={'center'}
              py={2}
              px={3}
              bg="gray.400"
              _dark={{ bg: "gray.700" }}
            >
              <chakra.span
                fontWeight="bold"
                color="white"
                _dark={{ color: "gray.200" }}
              >
                {incidenciasPendientes.length}
              </chakra.span>
            </Flex>
          </Box>
          <Box
            w={'100%'}
            bg="white"
            _dark={{ bg: "gray.800" }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            textAlign={'center'}
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              color="gray.800"
              _dark={{ color: "white" }}
            >
              INCIDENCIAS ATENDIDAS
            </chakra.h3>
            <Flex
              alignItems="center"
              justify={'center'}
              py={2}
              px={3}
              bg="blue.400"
              _dark={{ bg: "gray.700" }}
            >
              <chakra.span
                fontWeight="bold"
                color="white"
                _dark={{ color: "gray.200" }}
              >
                {incidenciasSolucionadas.length}
              </chakra.span>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
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
              MIS INCIDENCIAS REPORTADAS
            </Text>
          </Box>
          <Box>
            <IncidenciaAgregar />
          </Box>
        </HStack>
        <DataTableExtensions {...tableData}>
          <DataTable
            defaultSortAsc={false}
            theme={useColorModeValue('default', 'solarized')}
            pagination
            ignoreRowClick={true}
            paginationPerPage={6}
            noDataComponent="No hay datos para mostrar refresca la página"
            paginationRowsPerPageOptions={[6, 15, 20, 30]}
          />
        </DataTableExtensions>
      </Box>
    </>
  );
}
