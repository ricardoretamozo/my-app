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
  Input
} from '@chakra-ui/react';

import { store } from '../../store/store';

import Select from 'react-select';

import { useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { createHistorialPersona } from '../../actions/historialpersona';
import { useHistory } from 'react-router-dom';

const ModalHistorialUsuario = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectInputRefSede = useRef();
  const selectInputRef = useRef();
  const selectOficinaRef = useRef();
  

  const sedeData = store.getState().sede.rows;
  const organoData = store.getState().organo.rows;
  const oficinaData = store.getState().oficina.rows;
  const cargoData = store.getState().cargo.rows;

  var sedeInfo = sedeData;
  var organoInfo = organoData;
  var oficinaInfo = oficinaData;
  var cargoInfo = cargoData;

  const [indice, setIndice] = useState({
    idOrgano: null,
    organo: '',
    sede: '',
    activo: '',
  });

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const [indiceHistorial, setIndiceHistorial] = useState({
    idHistorial: null,
    persona: {
      idpersona: props.idPersona,
    },
    cargo: {
      idCargo: null,
    },
    oficina: {
      idOficina: null,
    },
    iniciaCargo: hoy.toISOString().split('T')[0],
    terminaCargo: null,
    activo: 'S',
    fecha: hoy.toISOString().split('T')[0],
    ip: '12234533',
  });

  const [organoSelect, setOrganoSelect] = useState([
    { value: 0, label: 'SELECCIONE UNA SEDE' },
  ]);

  const [oficinaSelect, setOficinaSelect] = useState([
    { value: 0, label: 'SELECCIONE UN ORGANO' },
  ]);

  const [optionsSede, setOptionsSede] = useState(
    sedeInfo.map(sede => ({
      value: sede.idSede,
      label: sede.sede,
    }))
  );

  const [estado, setEstado] = useState(true);

  useEffect(() => {
    if (estado) {
      if (props.oficina != null) {
        setEstado(false);
        setOrganoSelect(
          organoInfo
            .filter(
              indice => indice.sede.idSede == props.oficina.organo.sede.idSede
            )
            .map(value => ({ value: value.idOrgano, label: value.organo }))
        );
        setOficinaSelect(
          oficinaInfo
            .filter(
              indice => indice.organo.idOrgano == props.oficina.organo.idOrgano
            )
            .map(value => ({ value: value.idOficina, label: value.oficina }))
        );
        setIndiceHistorial({
          ...indiceHistorial,
          oficina: {
            idOficina: props.oficina.idOficina,
            oficina: props.oficina.oficina,
          },
        });
        setOrganoSelect(
          organoSelect.find(
            organo => organo.value == props.oficina.organo.idOrgano
          )
        );
      }
    }
  });

  const [optionsCargo, setoptionsCargo] = useState(
    cargoInfo.map(cargo => ({
      value: cargo.idCargo,
      label: cargo.cargo,
    }))
  );

  // Select
  const handleChangeSede = (value) => {
    if (value === null) {
      selectInputRef.current.clearValue();
      selectOficinaRef.current.clearValue();
      setOrganoSelect([{ value: 0, label: 'SELECCIONE UNA SEDE' }]);
    } else {
      var organo = organoInfo.filter(
        indice => indice.sede.idSede == value.value
      );
      setOrganoSelect(
        organo.map(organo => ({
          value: organo.idOrgano,
          label: organo.organo,
        }))
      );
      selectInputRef.current.clearValue();
      selectOficinaRef.current.clearValue();
    }
  };

  //
  const handleChangeOrgano = (value) => {
    if (value === null) {
      selectOficinaRef.current.clearValue();
      setOficinaSelect([{ value: 0, label: 'SELECCIONE UN ORGANO' }]);
    } else {
      setOficinaSelect(
        oficinaData
          .filter(indice => indice.organo.idOrgano == value.value)
          .map(value => ({ value: value.idOficina, label: value.oficina }))
      );
      selectOficinaRef.current.clearValue();
    }
  };

  const handleChangeOficina = (value) => {
    if (value === null) {
      // selectOficinaRef.current.clearValue();
    } else {
      setIndiceHistorial({
        ...indiceHistorial,
        oficina: { idOficina: value.value, oficina: value.label },
      });
    }
  };

  const handleChangeCargo = (value) => {
    setIndiceHistorial({
      ...indiceHistorial,
      cargo: { idCargo: value.value, cargo: value.label },
    });
  };

  const saveHistorialPersona = () => {
    var historialUsuario = {
      persona: {
        idpersona: Number(props.idPersona),
      },
      cargo:
        indiceHistorial.cargo.idCargo == null
          ? props.cargo
          : indiceHistorial.cargo,
      oficina:
        indiceHistorial.oficina.idOficina == null
          ? props.oficina
          : indiceHistorial.oficina,
      iniciaCargo: indiceHistorial.iniciaCargo,
      terminaCargo: indiceHistorial.terminaCargo,
      activo: indiceHistorial.activo,
    };
    dispatch(createHistorialPersona(historialUsuario)).then(() => {
      if ( props.editar ){
        if (
          indiceHistorial.oficina.idOficina != null ||
          indiceHistorial.cargo.idCargo != null
          ) {
          console.log("editado")
          dispatch(props.handleClick());
        }
      } else {
        if (
          indiceHistorial.oficina.idOficina != null &&
          indiceHistorial.cargo.idCargo != null
        ) {
          dispatch(props.handleClick());
        }
      }
      dispatch(props.listarHistorialPersona());
    }).catch((e) => {
      console.error("Error de guardar historial" + e)
      history.push('/dashboard/usuario')
    });
    props.cerrar();
  };

  const cerrarModal = () => {
    setIndiceHistorial({
      ...indiceHistorial,
      cargo: { idCargo: null },
      oficina: { idOficina: null },
    });
    props.cerrar();
  }

  return (
    <>
      <Modal
        isOpen={props.abrir}
        onClose={cerrarModal}
        closeOnOverlayClick={true}
        size={'6xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontWeight={'bold'} mt={2}>ACTUALIZAR INFORMACIÓN</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }}/>
          <ModalBody pb={5} mt={5}>
            <FormControl>
              <Input
                value={indice ? indice.idOficina : ''}
                disabled={true}
                type="text"
                hidden={true}
              />
            </FormControl>
            <FormControl>
              <FormLabel>SEDE</FormLabel>
              <Select
                onChange={handleChangeSede}
                placeholder="SELECCIONE UNA SEDE"
                isSearchable
                isClearable
                options={optionsSede}
                ref={selectInputRefSede}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>ORGANO</FormLabel>
              <Select
                onChange={handleChangeOrgano}
                placeholder="SELECCIONE UN ORGANO"
                isClearable
                options={organoSelect}
                ref = {selectInputRef}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>OFICINA</FormLabel>
              <Select
                onChange={handleChangeOficina}
                placeholder="SELECCIONE UNA OFICINA"
                isClearable={true}
                options={oficinaSelect}
                isRequired
                ref = {selectOficinaRef}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>CARGO</FormLabel>
              <Select
                onChange={handleChangeCargo}
                placeholder="SELECCIONE UN CARGO"
                // defaultValue={
                //   indiceHistorial ? indiceHistorial.cargo.cargo : ''
                // }
                isClearable={true}
                options={optionsCargo}
                isRequired
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={saveHistorialPersona}
              colorScheme={'facebook'}
              autoFocus
              mr={3}
              _focus={{ boxShadow: "none" }}
              disabled = {indiceHistorial.oficina.idOficina === null && indiceHistorial.cargo.idCargo === null}
            >
              GUARDAR
            </Button>
            <Button onClick={cerrarModal} colorScheme="red" _focus={{ boxShadow: "none" }}>CANCELAR</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalHistorialUsuario;
