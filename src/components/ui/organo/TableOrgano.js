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

// import Select from 'react-select';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { deleteOrgano, updateOrgano } from '../../../actions/organo';

import OrganoAgregar from './OrganoAgregar';

export default function TableOrgano() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().organo.rows;
  const dataSede = store.getState().sede.rows;
  

  const [indice, setIndice] = useState({
    idOrgano: null,
    organo: '',
    sede: {
      idSede: null,
    },
    activo: '',
  });

  const [organoid, setOrganoid] = useState({
    idOrgano: null,
  });

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteOrgano = x => {
    dispatch(deleteOrgano(x))
      .then(() => {
        handleCloseDelete(true);
        console.log('Sede eliminado');
      })
      .catch(e => {
        console.log(e);
        handleCloseDelete(true);
      });
  };

  const handleUpdateOrgano = e => {
    e.preventDefault();
    dispatch(updateOrgano(indice))
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
    setOrganoid(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // const handleChangeSede = value => {
  //   setIndice({
  //     ...indice,
  //     sede: { idSede: value.value, sede: value.label },
  //   });
  // }

  const columns = [
    {
      name: 'ORGANO',
      selector: row => row.organo,
      sortable: true,
    },
    {
      name: 'SEDE',
      selector: row => row.sede.sede,
      sortable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.activo,
      sortable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.activo === 'S' ? 'green.400' : bgStatus}
            color={row.activo === 'S' ? 'white' : colorStatus}
            p="3px 10px"
            w={20}
            textAlign={'center'}
            borderRadius={'md'}
            fontSize={'10px'}
          >
            {row.activo === 'S' ? 'ACTIVO' : 'INACTIVO'}
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
            <Switch
              colorScheme={'red'}
              mr={2}
              isChecked={row.activo === 'S'}
              onChange={() => handleClickOpenDelete(row.idOrgano)}
            />
            <Button
              onClick={() => handleClickOpenEdit(row)}
              size={'xs'}
              colorScheme={'facebook'}
              _focus={{ boxShadow: "none" }}
            >
              EDITAR
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
                      onClick={() => handleDeleteOrgano(organoid)}
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

            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'xl'}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader display={'flex'} justifyContent={'center'}>
                  EDITAR ORGANO
                </ModalHeader>
                <ModalCloseButton _focus={{ boxShadow: "none" }} />
                <ModalBody pb={6}>
                  <FormControl>
                    <Input
                      value={indice ? indice.idOrgano : ''}
                      disabled={true}
                      type="text"
                      hidden={true}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>SEDE</FormLabel>
                    <Select
                      defaultValue={ indice ? indice.sede : '' }
                      onChange={e =>
                        setIndice({ ...indice, sede: e.target.value })
                      }
                      // onChange={handleChangeSede}
                      // options={
                      //   dataSede.map((item, idx) => ({
                      //     key: idx,
                      //     value: item.idSede,
                      //     label: item.sede,
                      //   }))
                      // }
                    >
                      {dataSede.map((item, idx) => (
                        <option value={item.idSede} key={idx}>
                          {item.sede}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>ORGANO</FormLabel>
                    <Input
                      defaultValue={indice ? indice.organo : ''}
                      type="text"
                      textTransform={'uppercase'}
                      onChange={e =>
                        setIndice({ ...indice, organo: e.target.value.toUpperCase() })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>ESTADO</FormLabel>
                    <Select
                      defaultValue={indice ? indice.activo : ''}
                      onChange={e =>
                        setIndice({ ...indice, activo: e.target.value })
                      }
                    >
                      <option value="S">ACTIVO</option>
                      <option value="N">INACTIVO</option>
                    </Select>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={e => handleUpdateOrgano(e)}
                    colorScheme="green"
                    mr={3}
                    _focus={{ boxShadow: "none" }}
                  >
                    ACTUALIZAR
                  </Button>
                  <Button onClick={handleCloseEdit} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        );
      },
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
            TABLA ORGANOS JURIDICCIONALES
          </Text>
        </Box>
        <Box>
          <OrganoAgregar />
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
