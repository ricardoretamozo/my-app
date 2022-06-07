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
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import {
  deleteOficina,
  updateOficina,
} from '../../../actions/oficina';

import OficinaAgregar from './OficinaAgregar';

export default function TableOficina() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const data = store.getState().oficina.rows;
  const dataOrgano = store.getState().organo.rows;

  const [indice, setIndice] = useState({
    idOficina: null,
    oficina: "",
    organo: {
      idOrgano: null,
    },
    activo: "",
  });

  const [oficinaid, setOficinaid] = useState({
    idOficina: null
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteOficina = (x) => {
    dispatch(deleteOficina(x))
      .then(() => {
        handleCloseDelete(true);
        console.log('Oficina eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleUpdateOrgano = e => {
    e.preventDefault();
    dispatch(updateOficina(indice))
      .then(() => {
        handleCloseEdit(true);
        console.log('Sede actualizado');
        console.log(indice);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClickOpenDelete = index => {
    setOficinaid(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const columns = [
    {
      name: 'OFICINA',
      selector: row => row.oficina,
      sortable: true,
    },
    {
        name: 'SEDE',
        selector: row => row.organo.sede.sede,
        sortable: true,
      },
    {
      name: 'ORGANO',
      selector: row => row.organo.organo,
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
          <Switch
            colorScheme={'red'}
            mr={2}
            isChecked={row.activo === 'S'}
            onChange={() => handleClickOpenDelete(row.idOficina)}
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
                  Anular Organo
                </AlertDialogHeader>

                <AlertDialogBody>Está seguro de anular?</AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={handleCloseDelete}>Cancelar</Button>
                  <Button
                    onClick={() =>
                      handleDeleteOficina(oficinaid)
                    }
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
            <ModalContent>
              <ModalHeader display={'flex'} justifyContent={'center'}>
                Editar Oficina
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    value={indice ? indice.idOficina : ''}
                    disabled={true}
                    type="text"
                    hidden={true}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Organo</FormLabel>
                  <Select
                    defaultValue={indice ? indice.organo.idOrgano : ''}
                    onChange={e =>
                      setIndice({ ...indice, organo: e.target.value })
                    }
                  >
                      {dataOrgano.map((item, idx) => (
                        <option value={item.idOrgano} key={idx}>{item.organo}</option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Oficina</FormLabel>
                  <Input
                    defaultValue={indice ? indice.oficina : ''}
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, oficina: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
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
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={e => handleUpdateOrgano(e)}
                  colorScheme="green"
                  mr={3}
                >
                  Actualizar
                </Button>
                <Button onClick={handleCloseEdit}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
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
      default: '#FFF opacity 92%' ,
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
              Oficinas Table
            </Text>
          </Box>
          <Box>
            <OficinaAgregar/>
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
        />
      </DataTableExtensions>
    </Box>
  );
}
