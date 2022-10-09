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
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deleteCargo } from '../../../actions/cargo';

import CargoAgregar from './CargoAgregar';
import { BsArrowDown } from 'react-icons/bs';
import { CargoEditar } from './CargoEditar';

export default function TableCargo() {

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const data = store.getState().cargo.rows;

  const columns = [
    {
      name: 'CARGO',
      selector: row => row.cargo,
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
          <ModalEliminarCargo row={row} />
          <CargoEditar row={row} />
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
      <HStack spacing='24px' width={'100%'} justifyContent={'space-between'} verticalAlign={'center'} p={4}>
        <Box>
          <Text fontSize='lg' fontWeight='600'>
            TABLA DE CARGOS
          </Text>
        </Box>
        <Box>
          <CargoAgregar />
        </Box>
      </HStack>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          sortIcon={<BsArrowDown />}
          theme={useColorModeValue('default', 'solarized')}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 30]}
          ignoreRowClick={true}
          responsive={true}
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </DataTableExtensions>
    </Box>
  );
}

// MODAL DE ELIMINAR CARGO

const ModalEliminarCargo = ({ row }) => {
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const [indice, setIndice] = useState({
    idCargo: null,
    cargo: "",
    activo: "",
  });

  const handleDeleteCargo = () => {
    dispatch(deleteCargo(indice))
      .then(() => {
        handleCloseDelete(true);
      })
      .catch(e => {
        // console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleClickOpenDelete = index => {
    setIndice(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Switch
        colorScheme={'red'}
        mr={2}
        isChecked={row.activo === 'S'}
        onChange={() => handleClickOpenDelete(row.idCargo)}
      />
      <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size="2xl">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {row.activo === 'S' ? <Text>ESTA SEGURO DE ANULAR?</Text> : <Text>ESTÁ SEGURO DE ACTIVAR?</Text>}
            </AlertDialogHeader>

            <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCloseDelete} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
              <Button
                onClick={() => handleDeleteCargo(row.idCargo)}
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
    </>
  )
}