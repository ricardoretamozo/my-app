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
    Select as ChakraSelect,
  } from "@chakra-ui/react";

import { AddIcon } from '@chakra-ui/icons';
  
import Select from 'react-select';

import { store } from '../../../store/store';

import {useDispatch} from 'react-redux'
import React, { useState } from "react"
import { createOrgano } from "../../../actions/organo"
const OrganoAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch();

    const sedeData = store.getState().sede.rows;

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
      }
    
    const handleCloseModal = () => {
    setOpenCreate(false);
    };

    const initialOrgano = {
        idOrgano: null,
        organo: "",
        sede: {
            idSede: null,
        },
        activo: "",
    }

    const [dataOrgano, setOrgano] = useState(initialOrgano);

    const { organo, sede, activo } = dataOrgano;

    const saveOrgano = () => {
        dispatch(createOrgano({ organo, sede, activo }))
        .then(() =>{
            console.log(dataOrgano);
            handleCloseModal(true);
        }).catch(err =>{
            console.log(err);
        })
    }

    const handleChangeSede= (value) => {
        setOrgano({
          ...dataOrgano, sede: { idSede: value.value, sede: value.label }
        })
      }

return (
    <>
        <Button leftIcon={<AddIcon/>} size='sm' onClick={handleClickOpenCreate} colorScheme={'blue'}>Agregar</Button>

        <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Agregar Nuevo Organo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Sede</FormLabel>
                  <Select
                    // defaultValue={indice ? indice.sede.idSede : ''}
                    onChange={handleChangeSede}
                    options={sedeData.map(sede => ({
                        value: sede.idSede,
                        label: sede.sede
                      }))}
                      isClearable
                      isSearchable
                  />
            </FormControl>
            <FormControl  mt={4} isRequired>
                <FormLabel>Organo</FormLabel>
                <Input 
                onChange={(e)=> {setOrgano({ ...dataOrgano, organo: (e.target.value).toUpperCase() })}}
                type={'text'}
                 />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Estado</FormLabel>
                <ChakraSelect
                defaultValue={dataOrgano.activo = 'S'}
                onChange={(e)=> {setOrgano({...dataOrgano,activo:(e.target.value) })}}
                >
                <option value='S'>Activo</option>
                <option value='N'>Inactivo</option>
                </ChakraSelect>
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button type={'submit'} onClick={()=>saveOrgano()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
            </Button>
            <Button  onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default OrganoAgregar;