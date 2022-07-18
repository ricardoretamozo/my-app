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

import { notification } from '../../helpers/alert';

import { store } from '../../store/store';

import Select from 'react-select';

import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createOficina, fetchOficinas } from '../../actions/oficina';
import {
  fetchHistorialPersona,
  createHistorialPersona,
} from '../../actions/historialpersona';

import { types } from '../../types/types';
// import { getIP } from 'external-ip';

const ModalHistorialUsuario = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
    { label: 'Seleccione una Sede' },
  ]);
  const [oficinaSelect, setOficinaSelect] = useState([
    { idOficina: 0, label: 'Seleccione un Organo' },
  ]);

  const [organoNombre, setOrganoNombre] = useState(null);
  const [oficinaNombre, setOficinaNombre] = useState(null);

  const [optionsSede, setoptionsSede] = useState(
    sedeInfo.map(sede => ({
      value: sede.idSede,
      label: sede.sede,
    }))
  );
  console.log(props.oficina);
  const [optionsOrgano, setoptionsOrgano] = useState(
    organoInfo.map(organo => ({
      value: organo.idOrgano,
      label: organo.organo,
    }))
  );

  console.log(optionsOrgano);
  const [optionsOficina, setoptionsOficina] = useState(
    oficinaInfo.map(oficina => ({
      value: oficina.idOficina,
      label: oficina.oficina,
    }))
  );

  const [estado, setEstado] = useState(true);

  useEffect(() => {
    if (estado) {
      if (props.oficina != null) {
        setEstado(false);
        setoptionsOrgano(
          organoInfo
            .filter(
              indice => indice.sede.idSede == props.oficina.organo.sede.idSede
            )
            .map(value => ({ value: value.idOrgano, label: value.organo }))
        );
        setoptionsOficina(
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
        console.log(optionsOrgano);
        setOrganoSelect(
          optionsOrgano.find(
            organo => organo.value == props.oficina.organo.idOrgano
          )
        );
      }
    }
  });
  const [optionsCargoIndex, setOptionsCargoIndex] = useState(0);
  const [optionsOficinaIndex, setOficinaIndex] = useState(0);

  const [optionsCargo, setoptionsCargo] = useState(
    cargoInfo.map(cargo => ({
      value: cargo.idCargo,
      label: cargo.cargo,
    }))
  );

  const [optionsOrganoindex, setoptionsOrganoindex] = useState(0);
  const [optionsSedeindex, setoptionsSedeindex] = useState(0);

  // const { oficina, organo } = dataOficina;

  // Select
  const handleChangeSede = value => {
    // setsedeNombre(e.target.value);
    console.log(organoSelect);
    console.log(value);
    if (value == null) {
      //setorganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
    } else {
      var organo = organoInfo.filter(
        indice => indice.sede.idSede == value.value
      );
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

  //
  const handleChangeOrgano = value => {
    if (value == null) {
      setoptionsOficina([{ idOficina: 0, oficina: 'Seleccione un Organo' }]);
    } else {
      setoptionsOficina(
        oficinaData
          .filter(indice => indice.organo.idOrgano == value.value)
          .map(value => ({ value: value.idOficina, label: value.oficina }))
      );
    }
  };

  const handleChangeOficina = value => {
    console.log(indiceHistorial);
    setIndiceHistorial({
      ...indiceHistorial,
      oficina: { idOficina: value.value, oficina: value.label },
    });
  };

  const handleChangeCargo = value => {
    setIndiceHistorial({
      ...indiceHistorial,
      cargo: { idCargo: value.value, cargo: value.label },
    });
  };

  console.log(props.cargo);

  const saveHistorialPersona = e => {
    e.preventDefault();
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
      fecha: indiceHistorial.fecha,
      ip: indiceHistorial.ip,
    };

    dispatch(createHistorialPersona(historialUsuario)).then(() => {
      if (props.editar ){
        if (
          indiceHistorial.oficina.idOficina != null ||
          indiceHistorial.cargo.idCargo != null
        ) {
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
    });

    props.cerrar();
  };

  console.log(indiceHistorial);

  const cerrarModal = () => {
    setIndiceHistorial({
      ...indiceHistorial,
      cargo: { idCargo: null },
      oficina: { idOficina: null },
    });
    console.log("cerrando modal");
    props.cerrar();
  }

  return (
    <>
      <Modal
        isOpen={props.abrir}
        onClose={cerrarModal}
        closeOnOverlayClick={true}
        size={'lg'}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Actualizar sede, organo, oficina, cargo</ModalHeader>
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
            <FormControl isRequired>
              <FormLabel>Sede</FormLabel>
              <Select
                onChange={handleChangeSede}
                //  defaultValue={optionsSede[optionsSedeindex]}
                // defaultValue={
                //   props.oficina
                //     ? optionsSede.find(
                //         sede => sede.value == props.oficina.organo.sede.idSede
                //       )
                //     : null
                // }
                isRequired
                isSearchable
                isClearable
                options={optionsSede}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Organo</FormLabel>
              <Select
                onChange={handleChangeOrgano}
                // defaultValue={organoSelect}
                placeholder={'Seleccione un Organo'}
                isClearable
                options={optionsOrgano}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Oficina</FormLabel>
              <Select
                onChange={handleChangeOficina}
                // defaultValue={
                //   props.oficina
                //     ? optionsOficina.find(
                //         oficina => oficina.value == props.oficina.idOficina
                //       )
                //     : null
                // }
                isClearable={true}
                options={optionsOficina}
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cargo</FormLabel>
              {/* <SelectForm
              defaultValue={props.cargo ? props.cargo.idCargo : ''}
              onChange ={e => setIndiceHistorial({...indiceHistorial, cargo:  e.target.value })
              }
              >
                {cargoData.map((item, idx) => (
                  <option value={item.idCargo} key={idx}>
                    {item.cargo}
                  </option>
                ))}
              </SelectForm> */}
              <Select
                onChange={handleChangeCargo}
                // defaultValue={
                //   props.cargo
                //     ? optionsCargo.find(
                //         cargo => cargo.value == props.cargo.idCargo
                //       )
                //     : ''
                // }
                // defaultInputValue = {indiceHistorial ? indiceHistorial.cargo.cargo : ''}
                // value = {indiceHistorial ? indiceHistorial.cargo.cargo : ''}
                defaultValue={
                  indiceHistorial ? indiceHistorial.cargo.cargo : ''
                }
                isClearable={true}
                options={optionsCargo}
                isRequired
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type={'submit'}
              onClick={saveHistorialPersona}
              colorScheme={'blue'}
              autoFocus
              mr={3}
            >
              Guardar
            </Button>
            <Button onClick={cerrarModal}>Cancelar</Button>
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

export default ModalHistorialUsuario;
