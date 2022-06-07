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
  } from "@chakra-ui/react";

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
            handleCloseModal(true);
        })
    }

return (
    <>
        <Button size='sm' onClick={handleClickOpenCreate} colorScheme={'blue'}>Agregar</Button>

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
            <FormControl isRequired>
                <FormLabel>Sede</FormLabel>
                  <Select
                    // defaultValue={indice ? indice.sede.idSede : ''}
                    onChange={(e)=> {setOrgano({...dataOrgano,sede:(e.target.value) })}}
                  >
                      {sedeData.map((item, idx) => (
                        <option value={item.idSede} key={idx}>{item.sede}</option>
                      ))}
                  </Select>
            </FormControl>
            <FormControl  mt={4}>
                <FormLabel>Organo</FormLabel>
                <Input 
                onChange={(e)=> {setOrgano({ ...dataOrgano, organo: (e.target.value).toUpperCase() })}}
                placeholder='Nombre de la sede'
                isRequired={true}
                type={'text'} />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel>Estado</FormLabel>
                <Select
                defaultValue={dataOrgano.activo = 'S'}
                onChange={(e)=> {setOrgano({...dataOrgano,activo:(e.target.value) })}}
                >
                <option value='S'>Activo</option>
                <option value='N'>Inactivo</option>
                </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button onClick={()=>saveOrgano()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default OrganoAgregar;