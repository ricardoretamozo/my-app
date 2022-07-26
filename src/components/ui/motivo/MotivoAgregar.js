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
    Icon,
  } from "@chakra-ui/react";

import { AddIcon } from '@chakra-ui/icons';

import {useDispatch} from 'react-redux'
import React, { useState } from "react"
import { createMotivo } from "../../../actions/motivo"

const MotivoAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
      }
    
    const handleCloseModal = () => {
    setOpenCreate(false);
    };

    const initialSede = {
        idMotivo: null,
        motivo: "",
    }

    const [dataMotivo, setMotivo] = useState(initialSede);

    const { motivo } = dataMotivo;

    const saveMotivo = () => {
        dispatch(createMotivo({ motivo }))
        .then(() =>{
            handleCloseModal(true);
        }).catch(err =>{
            console.log(err);
            handleCloseModal(true);
        })
    }

return (
    <>
        <Button leftIcon={<AddIcon />} size='sm' onClick={handleClickOpenCreate} colorScheme={'blue'}>NUEVO</Button>

        <Modal
            isOpen={openCreate}
            onClose={handleCloseModal}
            closeOnOverlayClick={true}
            size={'2xl'}
            >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>AGREGAR NUEVO MOTIVO PARA LA INCIDENCIA</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Motivo</FormLabel>
                <Input 
                style={{'text-transform':'uppercase'}}
                onChange={(e)=> {setMotivo({ ...dataMotivo, motivo: (e.target.value).toUpperCase() })}}
                placeholder='Motivo de incidencias'
                isRequired={true}
                type={'text'} />
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button onClick={()=>saveMotivo()} colorScheme={'blue'} autoFocus mr={3}>
                GUARDAR
            </Button>
            <Button onClick={handleCloseModal}>CANCELAR</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default MotivoAgregar;