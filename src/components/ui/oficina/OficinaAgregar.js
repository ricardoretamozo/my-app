import {
  Button,
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
  Select as SelectForm,
} from '@chakra-ui/react';

import { store } from '../../../store/store';

import Select from 'react-select';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { createOficina, fetchOficinas } from '../../../actions/oficina';

import { AddIcon } from '@chakra-ui/icons';

import { types } from '../../../types/types';

const OficinaAgregar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();

  // const oficinaData = store.getState().oficina.rows;
  const sedeData = store.getState().sede.rows;
  // console.log(sedeData);
  const organoData = store.getState().organo.rows;

  var organoInfo = organoData;

  const [indice, setIndice] = useState({
    idOrgano: null,
    organo: '',
    sede: '',
    activo: '',
  });

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const initialOficina = {
    idOficina: null,
    oficina: '',
    organo: {
      idOrgano: null,
    },
    activo: null,
  };

  const [dataOficina, setOficina] = useState(initialOficina);
  const [sedeNombre, setsedeNombre] = useState(null);
  const [organoSelect, setorganoSelect] = useState([
    { idOrgano: 0, organo: 'Seleccione una Sede' },
  ]);
  const [organoNombre, setorganoNombre] = useState(null);

  // console.log(sedeNombre);

  const { oficina, organo, activo } = dataOficina;

  const handleChange = value => {
    if (value == null) {
      setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    } else {
      setorganoSelect(
        organoInfo.filter(indice => indice.sede.idSede == value.value)
      );
    }
  };

  //
  const handleChangeOrgano = value => {
    setorganoNombre(value.value);
  };

  const saveOficina = () => {
    var organo = organoNombre;
    dispatch(createOficina({ oficina, organo, activo }))
      .then(() => {
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Button leftIcon={<AddIcon/>} size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'}>
        AGREGAR
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AGREGAR NUEVA OFICINA</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired={true}>
              <FormLabel>SEDE</FormLabel>
              <Select
                required
                onChange={handleChange}
                isRequired
                isSearchable
                isClearable
                options={sedeData.map(sede => ({
                  value: sede.idSede,
                  label: sede.sede,
                }))}
              />
            </FormControl>
            <FormControl mt={4} isRequired={true}>
              <FormLabel>ORGANO</FormLabel>
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
            <FormControl mt={4}>
              <FormLabel>OFICINA</FormLabel>
              <Input
                onChange={e => {
                  setOficina({
                    ...dataOficina,
                    oficina: e.target.value.toUpperCase(),
                  });
                }}
                placeholder="Oficina"
                textTransform='uppercase'
                type={'text'}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>ESTADO</FormLabel>
              <SelectForm
                defaultValue={(dataOficina.activo = 'S')}
                onChange={e => {
                  setOficina({ ...dataOficina, activo: e.target.value });
                }}
                // options={ estados }
                autoFocus={true}
              >
                <option value="S">ACTIVO</option>
                <option value="N">INACTIVO</option>
              </SelectForm>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type={'submit'}
              onClick={() => saveOficina()}
              colorScheme={'blue'}
              autoFocus
              mr={3}
            >
              GUARDAR
            </Button>
            <Button onClick={handleCloseModal}>CANCELAR</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const organoID = organo => ({
  type: types.eventOrganoId,
  payload: organo,
});

export default OficinaAgregar;
