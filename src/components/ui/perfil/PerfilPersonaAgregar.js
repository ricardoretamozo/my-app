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
    Select,
  } from "@chakra-ui/react";

import {useDispatch} from 'react-redux'
import React, { useState } from "react"
import { createPerfilPersona } from "../../../actions/perfilPersona"

const PerfilPersonaAgregar = () => {
    const [openCreate, setOpenCreate] = React.useState(false);
    const dispatch = useDispatch()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
      }
    
    const handleCloseModal = () => {
    setOpenCreate(false);
    };

    const initialPerfil = {
        idPerfilPersona: null,
        perfil: "",
        descripcion: "",
        activo: "",
    }

    const [userperfil, setPerfil] = useState(initialPerfil);

    const { perfil, descripcion, activo } = userperfil;

    const savePerfil = () => {
        dispatch(createPerfilPersona({ perfil, descripcion, activo }))
        .then(() =>{
            handleCloseModal(true);
        }).catch(err =>{
            console.log(err);
            handleCloseModal(true);
        })
}
return (
    <>
        <Button size='sm' onClick={handleClickOpenCreate} colorScheme={'gray'}>Agregar</Button>

        <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Agregar Nuevo Perfil</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Perfil</FormLabel>
                <Input 
                onChange={(e)=> {setPerfil({ ...userperfil, perfil: (e.target.value).toUpperCase() })}}
                placeholder='Perfil'
                isRequired={true}
                type={'text'} />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel>Descripcion</FormLabel>
                <Textarea
                onChange={(e)=> {setPerfil({ ...userperfil, descripcion: (e.target.value) })}} 
                placeholder='Descripcion'
                isRequired
                />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel>Estado</FormLabel>
                <Select
                defaultValue={userperfil.activo = 'S'}
                onChange={(e)=> {setPerfil({...userperfil,activo:(e.target.value) })}}
                >
                <option value='S'>Activo</option>
                <option value='N'>Inactivo</option>
                </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button onClick={()=>savePerfil()} colorScheme={'blue'} autoFocus mr={3}>
                Guardar
            </Button>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default PerfilPersonaAgregar;