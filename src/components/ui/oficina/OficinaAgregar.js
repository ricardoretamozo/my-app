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
  Select,
} from '@chakra-ui/react';

import { store } from '../../../store/store';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { createOficina } from '../../../actions/oficina';

const OficinaAgregar = () => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const oficinaData = store.getState().oficina.rows;
  const sedeData = store.getState().sede.rows;
  // console.log(sedeData);
  var organoData = store.getState().organo.rows;
  // console.log(organoData.filter(organo => organo.sede.sede === "SELVA ALEGRE"));

  const [indice, setIndice] = useState({
    idOrgano: null,
    organo: '',
    sede: '',
    activo: '',
  });

  var DataOrgano;

  const handleClickSelectSede = e => {
    // organoData = organoData.filter(organo => organo.sede.idSede == Number(e));
    // console.log(organoData);
    setIndice(organoData.filter(organo => organo.sede.idSede == Number(e)));
  };

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
    activo: '',
  };

  const [dataOficina, setOficina] = useState(initialOficina);

  const { oficina, organo, activo } = dataOficina;

  const saveOficina = () => {
    dispatch(createOficina({ oficina, organo, activo }))
      .then(() => {
        // console.log(dataOrgano);
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
        handleCloseModal(true);
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
            <FormControl isRequired>
              <FormLabel>Sede</FormLabel>
              <Select
                // defaultValue={indice ? indice.sede.idSede : ''}
                // onChange={handleClickSelectSede(sedeData.idSede)}
                // onClick={handleClickSelectSede("SELVA ALEGRE")}
                // onChangeCapture={handleClickSelectSede(sedeData.idSede)}
                // value={DataOrgano ? DataOrgano.sede : ''}
                onChange={e => handleClickSelectSede(e.target.value)}
              >
                {sedeData.map((item, idx) => (
                  <option value={item.idSede} key={idx}>
                    {item.sede}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Organo</FormLabel>
              <Select
              //   value={organoData ? organoData.idOrgano : ''}
              // defaultValue={indice ? indice.sede.idSede : ''}
              onChange={(e)=> {setOficina({...dataOficina,organo:(e.target.value) })}}
              // onClick={(e)=> {organoData}}
              >
                {organoData.map((item, idx) => {
                   
                    return (
                    <option value={item.idOrgano} key={idx}>
                    {item.organo}
                  </option>
                  );
                })}
              </Select>
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
                isRequired={true}
                type={'text'}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Estado</FormLabel>
              <Select
                defaultValue={(dataOficina.activo = 'S')}
                onChange={e => {
                  setOficina({ ...dataOficina, activo: e.target.value });
                }}
              >
                <option value="S">Activo</option>
                <option value="N">Inactivo</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
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

export default OficinaAgregar;
