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

import { AddIcon } from '@chakra-ui/icons';

import {useDispatch} from 'react-redux'
import React, { useState } from "react"
import { createSede } from "../../../actions/sede"

const SedeAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
      }
    
    const handleCloseModal = () => {
    setOpenCreate(false);
    };

    const initialSede = {
        idSede: null,
        sede: "",
        direccion: "",
        activo: "",
    }

    const [dataSede, setSede] = useState(initialSede);

    const { sede, direccion, activo } = dataSede;

    const saveSede = () => {
        dispatch(createSede({ sede, direccion, activo }))
        .then(() =>{
            handleCloseModal(true);
        }).catch(err =>{
            console.log(err);
            handleCloseModal(true);
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
            <ModalHeader>Agregar Nueva Sede</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Sede</FormLabel>
                <Input 
                onChange={(e)=> {setSede({ ...dataSede, sede: (e.target.value).toUpperCase() })}}
                placeholder='Nombre de la sede'
                isRequired={true}
                type={'text'} />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel>Direccion</FormLabel>
                <Input
                onChange={(e)=> {setSede({ ...dataSede, direccion: (e.target.value) })}} 
                placeholder='Av Arequipa 202'
                type={'text'}
                />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel>Estado</FormLabel>
                <Select
                defaultValue={dataSede.activo = 'S'}
                onChange={(e)=> {setSede({...dataSede,activo:(e.target.value) })}}
                >
                <option value='S'>Activo</option>
                <option value='N'>Inactivo</option>
                </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button onClick={()=>saveSede()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default SedeAgregar;