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
  Select as SelectForm,
  Text,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { store } from '../../../store/store';

import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Select from 'react-select';

import { deleteOficina, updateOficina } from '../../../actions/oficina';

import OficinaAgregar from './OficinaAgregar';

export default function TableOficina() {
  const [openedit, setOpenEdit] = React.useState(false);
  const [opendelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();
  const [organoSelect, setorganoSelect] = useState([
    { idOrgano: 0, organo: 'Seleccione una Sede' },
  ]);

  const bgStatus = useColorModeValue('gray.400', '#1a202c');
  const colorStatus = useColorModeValue('white', 'gray.400');

  const data = store.getState().oficina.rows;
  const sedeData = store.getState().sede.rows;
  const dataOrgano = store.getState().organo.rows;
  var sedeInfo = sedeData;
  var organoInfo = dataOrgano;

  const [indice, setIndice] = useState({
    idOficina: null,
    oficina: '',
    organo: {
      idOrgano: null,
      organo: '',
    },
    activo: '',
  });

  const [oficinaid, setOficinaid] = useState({
    idOficina: null,
  });

  const [optionsOrgano, setoptionsOrgano] = useState(
    organoInfo.map(organo => ({
      value: organo.idOrgano,
      label: organo.organo,
    }))
  );

  

  const [optionsSede, setoptionsSede] = useState(
    sedeInfo.map(sede => ({
      value: sede.idSede,
      label: sede.sede,
    }))
  );

  const [optionsOrganoindex, setoptionsOrganoindex] = useState(0);
  const [optionsSedeindex, setoptionsSedeindex] = useState(0);

  const handleClickOpenEdit = index => {
    setIndice(index);
    setOpenEdit(true);
    var i = 0;
    var sedeID;
    organoInfo.filter(indice => indice.sede.idSede == sedeID);
    setoptionsOrgano(
      organoInfo.map(organo => {
        if (index.organo.idOrgano == organo.idOrgano) {
          setoptionsOrganoindex(i);
          sedeID = organo.sede.idSede;
        }
        i++;
        return {
          value: organo.idOrgano,
          label: organo.organo,
        };
      })
    );
    i = 0;
    setoptionsSede(
      sedeInfo.map(sede => {
        if (sedeID == sede.idSede) {
          setoptionsSedeindex(i);
        }
        i++;
        return {
          value: sede.idSede,
          label: sede.sede,
        };
      })
    );
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDeleteOficina = x => {
    dispatch(deleteOficina(x))
      .then(() => {
        handleCloseDelete(true);
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
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Select
  const handleChange = (value) => {
    console.log(value);
    if (value == null) {
    } else {
      var organo = organoInfo.filter(indice => indice.sede.idSede == value.value);
      console.log(organo);
      setoptionsOrgano(
        organo.map(organo => ({
          value: organo.idOrgano,
          label: organo.organo,
        }))
        
      );
      setoptionsOrganoindex(0);
    }
    console.log(organoSelect);
  };

  // edit organo
  const handleChangeOrgano = value => {
    console.log(value);
    // setorganoNombre(value.value);
    setIndice({
      ...indice,
      organo: { idOrgano: value.value, organo: value.label },
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
      cell: row => {
        return (
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
        );
      },
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
              onChange={() => handleClickOpenDelete(row.idOficina)}
            />
            <Button
              onClick={() => handleClickOpenEdit(row)}
              size={'xs'}
              colorScheme={'facebook'}
              _focus={{ boxShadow: "none" }}
            >
              EDITAR
            </Button>
            <AlertDialog isOpen={opendelete} onClose={handleCloseDelete} size={'xl'}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {row.activo === 'S' ? (
                      <Text>¿ESTÁ SEGURO DE ANULAR?</Text>
                    ) : (
                      <Text>¿ESTÁ SEGURO DE ACTIVAR?</Text>
                    )}
                  </AlertDialogHeader>

                  <AlertDialogBody>CONFIRMO LA ACCIÓN</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={handleCloseDelete} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
                    <Button
                      onClick={() => handleDeleteOficina(oficinaid)}
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
                  EDITAR LA OFICINA
                </ModalHeader>
                <ModalCloseButton _focus={{ boxShadow: "none" }} />
                <ModalBody pb={6}>
                  <FormControl>
                    <Input
                      value={indice ? indice.idOficina : ''}
                      disabled={true}
                      type="text"
                      hidden={true}
                    />
                  </FormControl>
                  <FormControl isRequired={true}>
                    <FormLabel>SEDE</FormLabel>
                    <Select
                      required
                      onChange={handleChange}
                      defaultValue={optionsSede[optionsSedeindex]}
                      isRequired
                      isSearchable
                      isClearable
                      options={optionsSede}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>ORGANO</FormLabel>
                    <Select
                      onChange={handleChangeOrgano}
                      defaultValue= {optionsOrgano[optionsOrganoindex]}
                      isClearable
                      options={optionsOrgano}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>OFICINA</FormLabel>
                    <Input
                      defaultValue={indice ? indice.oficina : ''}
                      type="text"
                      textTransform={'uppercase'}
                      onChange={e =>
                        setIndice({ ...indice, oficina: e.target.value.toUpperCase() })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>ESTADO</FormLabel>
                    <SelectForm
                      defaultValue={indice ? indice.activo : ''}
                      onChange={e =>
                        setIndice({ ...indice, activo: e.target.value })
                      }
                    >
                      <option value="S">ACTIVO</option>
                      <option value="N">INACTIVO</option>
                    </SelectForm>
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
            TABLA DE OFICINAS
          </Text>
        </Box>
        <Box>
          <OficinaAgregar />
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
