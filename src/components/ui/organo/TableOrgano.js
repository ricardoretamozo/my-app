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

import { deleteOrgano, updateOrgano } from '../../../actions/organo';

import OrganoAgregar from './OrganoAgregar';

export default function TableOrgano() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();

  // const perfil_persona = useSelector(state => state.perfilPersona);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().organo.rows;
  const dataSede = store.getState().sede.rows;
  var sede1 = dataSede[1].sede;
  var organo1 = data.filter(organo => organo.sede.sede === sede1);

  console.log(sede1, 'sede1');
  console.log(organo1, 'organo1');

  const [indice, setIndice] = useState({
    idOrgano: null,
    organo: '',
    sede: '',
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

  // const [userorgano, setOrgano] = useState(initialOrgano);

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
            {row.activo === 'S' ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      ),
      center: true,
    },
    {
      name: 'ACCIONES',
      sortable: false,
      cell: row => {
        console.log(row);
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
              colorScheme={'blue'}
            >
              Editar
            </Button>
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

            {/* ----------------------MODAL PARA EDITAR LA TABLA----------------------- */}

            <Modal isOpen={openedit} onClose={handleCloseEdit}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader display={'flex'} justifyContent={'center'}>
                  Editar Organo
                </ModalHeader>
                <ModalCloseButton />
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
                    <FormLabel>Sede</FormLabel>
                    <Select
                      defaultValue={indice ? indice.sede.idSede : ''}
                      onChange={e =>
                        setIndice({ ...indice, sede: e.target.value })
                      }
                    >
                      {dataSede.map((item, idx) => (
                        <option value={item.idSede} key={idx}>
                          {item.sede}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Organo</FormLabel>
                    <Input
                      defaultValue={indice ? indice.organo : ''}
                      type="text"
                      onChange={e =>
                        setIndice({ ...indice, organo: e.target.value })
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
            Organo Table
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
