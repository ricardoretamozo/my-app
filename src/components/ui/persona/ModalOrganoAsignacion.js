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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import { store } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { fetchPersonaOrgano } from '../../../actions/personaOrgano';
import AlertaDialogo from '../../../helpers/AlertaDialogo';
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
    setorganoNombre(null);
    setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    props.cerrar();
  };

  const closeModalDelete = () => {
    setOpenModalDelete(false);
  };
  const [idDeleteOrgano , setIdDeleteOrgano] = useState(null);
  const handleClickOpenDeleteOrganoP = (id) => {
    setIdDeleteOrgano(id);
    setOpenModalDelete(true);
  };

  const createPersonaOrgano = () => {
    
  }
  console.log(organoNombre);
  console.log(props.personaOrgano);
  return (
    <>
      <Modal
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
                  defaultValue={organoSelect.map(organo => ({
                    value: organo.idOrgano,
                    label: organo.organo,
                  }))}
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
                type={'submit'}
                //onClick={e => handleUpdatePersona(e)}
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
                        onClick={() => handleClickOpenDeleteOrganoP(x.idPersonaOrgano)}
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
      <AlertaDialogo isOpen={openModalDelete} onClose={closeModalDelete} id = {idDeleteOrgano} />
    </>
  );
}
