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

import { types } from '../../../types/types';

const OficinaAgregar = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useDispatch();

  // const oficinaData = store.getState().oficina.rows;
  const sedeData = store.getState().sede.rows;
  // console.log(sedeData);
  const organoData = store.getState().organo.rows;

  var organoInfo = organoData;
  console.log(organoData);

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
    // setsedeNombre(e.target.value);
    console.log(value);
    if (value == null) {
      setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    } else {
      setorganoSelect(
        organoInfo.filter(indice => indice.sede.idSede == value.value)
      );
    }
    console.log(organoSelect);
  };

  //
  const handleChangeOrgano = value => {
    console.log(value);
    setorganoNombre(value.value);
  };

  const saveOficina = () => {
    console.log(organoNombre);
    var organo = organoNombre;
    dispatch(createOficina({ oficina, organo, activo }))
      .then(() => {
        // console.log(dataOrgano);
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Button size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'}>
        Agregar
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nueva Oficina</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* <OficinaFilter props /> */}
            <FormControl isRequired={true}>
              <FormLabel>Sede</FormLabel>
              <Select
                // defaultValue={indice ? indice.sede.idSede : ''}
                // onChange={handleClickSelectSede(sedeData.idSede)}
                // onClick={handleClickSelectSede("SELVA ALEGRE")}
                // onChangeCapture={handleClickSelectSede(sedeData.idSede)}
                // value={DataOrgano ? DataOrgano.sede : ''}
                // value={sedeNombre}
                required
                onChange={handleChange}
                // onChange={(e)=> { console.log(e.target.value); }}
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
            <FormControl mt={4}>
              <FormLabel>Oficina</FormLabel>
              <Input
                onChange={e => {
                  setOficina({
                    ...dataOficina,
                    oficina: e.target.value.toUpperCase(),
                  });
                }}
                placeholder="Oficina"
                type={'text'}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Estado</FormLabel>
              <SelectForm
                defaultValue={(dataOficina.activo = 'S')}
                onChange={e => {
                  setOficina({ ...dataOficina, activo: e.target.value });
                }}
                // options={ estados }
                autoFocus={true}
              >
                <option value="S">Activo</option>
                <option value="N">Inactivo</option>
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
              Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
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
