import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Text,
  Divider,
  Table,
  IconButton,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import { store } from '../../../store/store';
import { useDispatch } from 'react-redux';
import AlertaDialogo from '../../../helpers/AlertaDialogo';
import {
  deletePersonaOrgano,
  createPersonaOrgano,
  fetchPersonaOrgano,
} from '../../../actions/personaOrgano';

export default function ModalOrganoAsignacion(props) {
  console.log(props);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  //Data sede-organo
  const sedeData = store.getState().sede.rows;
  const organoData = store.getState().organo.rows;

  //State select organo
  const [organoSelect, setorganoSelect] = useState([
    { idOrgano: 0, organo: 'Seleccione una Sede' },
  ]);
  const [organoNombre, setorganoNombre] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const fetchDataPersonaOrgano = async idpersona => {
    await fetchPersonaOrgano(idpersona).then(res => {
      props.setpersonaOrgano(res.data);
    });
  };
  //Cambiar opciones select organo
  const handleChangeSede = value => {
    if (value != null) {
      setorganoSelect(
        organoData.filter(indice => indice.sede.idSede == value.value)
      );
    }
  };
  //setear organo
  const handleChangeOrgano = value => {
    setorganoNombre(value.value);
  };

  //defaul input
  const closeModal = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setorganoNombre(null);
    setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    props.cerrar();

  };
  const closeModalDelete = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setOpenModalDelete(false);
  };

  const deletePersonaOrganoId = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    dispatch(deletePersonaOrgano(idDeleteOrgano));
    closeModalDelete();
  };

  const closeModalCreate = () => {
    setorganoNombre(null);
    setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    //resetear persona organo
    fetchDataPersonaOrgano(props.usuario.idpersona);
    console.log('cerrar');
    setOpenModalCreate(false);
  };

  const [idDeleteOrgano, setIdDeleteOrgano] = useState(null);
  const handleClickOpenDeleteOrganoP = id => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setIdDeleteOrgano(id);
    setOpenModalDelete(true);
  };

  const createPersonaOrganoModal = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    setOpenModalCreate(true);
  };

  const createPersonaOrganoDModal = () => {
    fetchDataPersonaOrgano(props.usuario.idpersona);
    dispatch(createPersonaOrgano(props.usuario.idpersona, organoNombre));
    setorganoNombre(null);
    setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    closeModalCreate();
  };

  console.log(organoNombre);
  console.log(organoSelect);
  console.log(props.personaOrgano);
  return (
    <>
      <AlertaDialogo
        isOpen={openModalDelete}
        onClose={closeModalDelete}
        title={'Estas seguro de eliminar el registro?'}
        metodo={deletePersonaOrganoId}
      />
      <Modal
        id="modalOrganoAsignacion"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.abrir}
        onClose={closeModal}
        size={'6xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            ASIGNACION DE ORGANOS JURIDICCIONALES A ASISTENTES INFORMATICOS
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack spacing={'10px'} mt={'10px'}>
              <FormControl>
                <FormLabel>Sede</FormLabel>
                <Select
                  required
                  onChange={handleChangeSede}
                  isRequired
                  isSearchable
                  isClearable
                  options={sedeData.map(sede => ({
                    value: sede.idSede,
                    label: sede.sede,
                  }))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Organo</FormLabel>
                <Select
                  onChange={handleChangeOrgano}
                  isClearable
                  options={organoSelect.map(organo => ({
                    value: organo.idOrgano,
                    label: organo.organo,
                  }))}
                />
              </FormControl>
            </HStack>
            <FormControl mt={'10px'}>
              <Button
                disabled={organoNombre == null ? true : false}
                type={'submit'}
                onClick={createPersonaOrganoModal}
                colorScheme={'blue'}
                mr={3}
              >
                Asignar
              </Button>
            </FormControl>
            <Divider
              orientation="horizontal"
              borderColor={'blue.500'}
              border={2}
              mt={'10px'}
            />

            <Text mt={'10px'}>
              Organos Juridiccionales asignados a{' '}
              <b> {props.usuario.nombre + ' ' + props.usuario.apellido}</b>
            </Text>

            {/* Listado de Organos asignados a ese usuario */}

            <Table
              size="sm"
              alignSelf={'start'}
              variant="simple"
              overflowX={'auto'}
              mt={'10px'}
            >
              <Thead>
                <Tr>
                  <Th>Sede</Th>
                  <Th>Organo</Th>
                  <Th>Accion</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.personaOrgano.map(x => (
                  <Tr key={x.idPersonaOrgano}>
                    <Td>{x.sede}</Td>
                    <Td>{x.organo}</Td>
                    <Td>
                      <IconButton
                        onClick={() =>
                          handleClickOpenDeleteOrganoP(x.idPersonaOrgano)
                        }
                        color={'red.600'}
                        fontSize="20px"
                        icon={<CloseIcon />}
                      ></IconButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button onClick={closeModal} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertaDialogo
        isOpen={openModalCreate}
        onClose={closeModalCreate}
        title={'Estas seguro de agregar el registro'}
        metodo={createPersonaOrganoDModal}
      />
    </>
  );
}
