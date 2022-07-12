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
  Textarea,
  Select as SelectForm,
} from '@chakra-ui/react';

import { store } from '../../../store/store';

import Select from 'react-select';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { createOficina, fetchOficinas } from '../../../actions/oficina';
import {
  fetchHistorialPersona,
  createHistorialPersona,
} from '../../../actions/historialpersona';

import {
    createIncidencia,
  } from '../../../actions/incidencia';

import { types } from '../../../types/types';
import { useSelector } from 'react-redux';

const IncidenciaAgregar = props => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const sedeData = store.getState().sede.rows;
  const organoData = store.getState().organo.rows;
  const oficinaData = store.getState().oficina.rows;
  const cargoData = store.getState().cargo.rows;
  const data = store.getState().incidencia.rows;
  const { identificador } = useSelector(state => state.auth);

  console.log(data)

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

  const [indiceIncidencia, setIndiceIncidencia] = useState({
    idIncidencia: null,
    persona: {
      idpersona: null,
    },
    persona_registro: {
        idpersona: null,
    },
    persona_asignado: {
        idpersona: null,
    },
    oficina: {
      idOficina: null,
    },
    motivo: {
        idMotivo: null,
      },
    descripcion: '',
    estado: 'P',
    fecha: hoy.toISOString().split('T')[0],
    ip: '12234533',
  });

  const [organoSelect, setOrganoSelect] = useState([
    { idOrgano: 0, organo: 'Seleccione una Sede' },
  ]);
  const [oficinaSelect, setOficinaSelect] = useState([
    { idOficina: 0, oficina: 'Seleccione un Organo' },
  ]);

  const [organoNombre, setOrganoNombre] = useState(null);
  const [oficinaNombre, setOficinaNombre] = useState(null);

  const [optionsSede, setoptionsSede] = useState(
    sedeInfo.map(sede => ({
      value: sede.idSede,
      label: sede.sede,
    }))
  );

  const [optionsOrgano, setoptionsOrgano] = useState(
    organoInfo.map(organo => ({
      value: organo.idOrgano,
      label: organo.organo,
    }))
  );

  const [optionsOficina, setoptionsOficina] = useState(
    oficinaInfo.map(oficina => ({
      value: oficina.idOficina,
      label: oficina.oficina,
    }))
  );

  const [optionsCargoIndex, setOptionsCargoIndex] = useState(0);
  const [optionsOficinaIndex, setOficinaIndex] = useState(0);

  const [optionsMotivo, setoptionsMotivo] = useState(
    cargoInfo.map(cargo => ({
      value: cargo.idCargo,
      label: cargo.cargo,
    }))
  );

  const [optionsOrganoindex, setoptionsOrganoindex] = useState(0);
  const [optionsSedeindex, setoptionsSedeindex] = useState(0);

  // const { oficina, organo } = dataOficina;

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  // Select
  const handleChangeSede = value => {
    // setsedeNombre(e.target.value);
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
    console.log(value);
    console.log(
      oficinaData.filter(indice => indice.organo.idOrgano == value.value)
    );
    setOrganoNombre(value.value);
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
    setOficinaNombre(value.value);
  };

  const saveHistorialPersona = e => {
    e.preventDefault();
    var incidencia = {
      persona: {
        idpersona: Number(identificador),
      },
      persona_registro: {
        idpersona: Number(identificador),
      },
      persona_asignado: {
        idpersona: Number(identificador),
      },
      oficina: {
        idOficina: Number(optionsOficina[optionsOficinaIndex].value),
      },
      motivo: {
        idMotivo: Number(95),
      },
      descripcion: indiceIncidencia.descripcion,
      estado: indiceIncidencia.estado,
      fecha: indiceIncidencia.fecha,
      ip: indiceIncidencia.ip,
    };
    dispatch(createIncidencia(incidencia))
      .then(() => {
        handleCloseModal(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Button size="sm" onClick={handleClickOpenCreate} colorScheme={'blue'}>
        Crear Nueva Incidencia
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'xl'}
      >
        <ModalOverlay />

        <form onSubmit={saveHistorialPersona}>
          <ModalContent>
            <ModalHeader>Nueva Incidencia</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
            <FormControl>
            <FormLabel>ID</FormLabel>
                <Input
                    value={indiceIncidencia ? indiceIncidencia.idpersona : identificador}
                    disabled={true}
                    type="text"
                    defaultValue={ identificador }
                />
            </FormControl>
              <FormControl>
                <Input
                  value={indice ? indice.idOficina : ''}
                  disabled={true}
                  type="text"
                  hidden={true}
                />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Sede</FormLabel>
                <Select
                  onChange={handleChangeSede}
                  //  defaultValue={optionsSede[optionsSedeindex]}
                  defaultValue={
                    props.oficina
                      ? optionsSede.find(
                          sede => sede.value == props.oficina.organo.sede.idSede
                        )
                      : null
                  }
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
                  // defaultValue= {optionsOrgano[optionsOrganoindex]}
                  defaultValue={
                    props.oficina
                      ? optionsOrgano.find(
                          organo =>
                            organo.value == props.oficina.organo.idOrgano
                        )
                      : null
                  }
                  isClearable
                  options={optionsOrgano}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Oficina</FormLabel>
                <Select
                  onChange={handleChangeOficina}
                  defaultValue={
                    props.oficina
                      ? optionsOficina.find(
                          oficina => oficina.value == props.oficina.idOficina
                        )
                      : null
                  }
                  isClearable={true}
                  options={optionsOficina}
                  isRequired
                />
              </FormControl>
              <FormControl mt={4}>
              <FormLabel>Descripcion</FormLabel>
              <Textarea
                nput
                onChange={e => {
                  setIndiceIncidencia({
                    ...indiceIncidencia,
                    descripcion: e.target.value.toUpperCase(),
                  });
                }}
                placeholder='Aqui describe la incidencia'
                size='sm'
            />
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
              </Button>
              <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

const organoID = organo => ({
  type: types.eventOrganoId,
  payload: organo,
});

export default IncidenciaAgregar;
