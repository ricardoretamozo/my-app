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
  
  import { store } from '../../store/store';
  
  import Select from 'react-select';
  
  import { useDispatch } from 'react-redux';
  import React, { useState } from 'react';
  import { createOficina, fetchOficinas } from '../../actions/oficina';
  import { fetchHistorialPersona } from '../../actions/historialpersona';
  
  import { types } from '../../types/types';
  
  const ModalHistorialUsuario = props => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch();
  
    // const oficinaData = store.getState().oficina.rows;
    const sedeData = store.getState().sede.rows;
    // console.log(sedeData);
    const organoData = store.getState().organo.rows;
  
    const oficinaData = store.getState().oficina.rows;
    const cargoData = store.getState().cargo.rows;
  
    var organoInfo = organoData;
    console.log(organoData);
    console.log(cargoData);
    console.log(props);
  
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
      activo: '',
    };
  
    const [dataOficina, setOficina] = useState(initialOficina);
  
    const [organoSelect, setOrganoSelect] = useState([
      { idOrgano: 0, organo: 'Seleccione una Sede' },
    ]);
    const [oficinaSelect, setOficinaSelect] = useState([
      { idOficina: 0, oficina: 'Seleccione un Organo' },
    ]);
  
    const [organoNombre, setOrganoNombre] = useState(null);
    const [oficinaNombre, setOficinaNombre] = useState(null);
  
    // console.log(sedeNombre);
    // console.log(oficina);
  
    const { oficina, organo, activo } = dataOficina;
  
    const handleChangeSede = value => {
      // setsedeNombre(e.target.value);
      console.log(value);
      if (value == null) {
        setOrganoSelect([{ idOrgano: 0, organo: 'Seleccione una Sede' }]);
      } else {
        setOrganoSelect(
          organoInfo.filter(indice => indice.sede.idSede == value.value)
        );
      }
      console.log(organoSelect);
    };
  
    //
    const handleChangeOrgano = value => {
      console.log(value);
      setOrganoNombre(value.value);
      if (value == null) {
        setOficinaSelect([{ idOficina: 0, oficina: 'Seleccione un Organo' }]);
      } else {
        setOficinaSelect(
          oficinaData.filter(indice => indice.organo.idOrgano == value.value)
        );
      }
    };
  
    const handleChangeOficina = value => {
      setOficinaNombre(value.value);
    };
  
    const saveOficina = () => {
      //   console.log(organoNombre);
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
          isOpen={props.abrir}
          onClose={props.cerrar}
          closeOnOverlayClick={true}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Agregar Nueva Oficina</ModalHeader>
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
              <FormControl isRequired={true}>
                <FormLabel>Sede</FormLabel>
                <Select
                  // defaultValue={indice ? indice.sede.idSede : ''}
                  // onChange={handleClickSelectSede(sedeData.idSede)}
                  // onClick={handleClickSelectSede("SELVA ALEGRE")}
                  // onChangeCapture={handleClickSelectSede(sedeData.idSede)}
                  // value={DataOrgano ? DataOrgano.sede : ''}
                  // value={sedeNombre}
                  onChange={handleChangeSede}
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
                  //   defaultValue={organoSelect.map(organo => ({
                  //     value: organo.idOrgano,
                  //     label: organo.organo,
                  //   }))}
                  isClearable={true}
                  options={organoSelect.map(organo => ({
                    value: organo.idOrgano,
                    label: organo.organo,
                  }))}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Oficina</FormLabel>
                <Select
                  onChange={handleChangeOficina}
                  //   defaultValue={oficinaSelect.map(oficina => ({
                  //     value: oficina.idOficina,
                  //     label: oficina.oficina,
                  //   }))}
                  isClearable={true}
                  options={oficinaSelect.map(oficina => ({
                    value: oficina.idOficina,
                    label: oficina.oficina,
                  }))}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Cargo</FormLabel>
                <Select
                  //   onChange={handleChangeOficina}
                  //   defaultValue={oficinaSelect.map(oficina => ({
                  //     value: oficina.idOficina,
                  //     label: oficina.oficina,
                  //   }))}
                  isClearable={true}
                  options={cargoData.map(cargo => ({
                    value: cargo.idCargo,
                    label: cargo.cargo,
                  }))}
                />
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
              <Button onClick={props.cerrar}>Cancelar</Button>
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
  