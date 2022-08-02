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
} from "@chakra-ui/react";

import { AddIcon } from '@chakra-ui/icons';

import { useDispatch } from 'react-redux'
import React, { useState } from "react"
import { createOrigen } from "../../../actions/origenIncidencia"

const OrigenAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    }

    const handleCloseModal = () => {
        setOpenCreate(false);
    };

    const initialOrigen = {
        idOrigen: null,
        origen: "",
    }

    const [dataOrigen, setOrigen] = useState(initialOrigen);

    const { origen } = dataOrigen;

    const saveOrigen = () => {
        dispatch(createOrigen({ origen }))
            .then(() => {
                handleCloseModal(true);
            }).catch(err => {
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
                    <ModalHeader>AGREGAR NUEVO ORIGEN PARA LA INCIDENCIA</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Origen</FormLabel>
                            <Input
                                textTransform={'uppercase'}
                                onChange={(e) => { setOrigen({ ...dataOrigen, origen: e.target.value.toUpperCase() }) }}
                                placeholder='ORIGEN DE INCIDENCIA'
                                isRequired={true}
                                type={'text'} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => saveOrigen()} colorScheme={'blue'} autoFocus mr={3}>
                            GUARDAR
                        </Button>
                        <Button onClick={handleCloseModal}>CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OrigenAgregar;