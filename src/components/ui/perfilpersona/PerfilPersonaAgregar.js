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

  import { AddIcon } from '@chakra-ui/icons';

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
        })
}
return (
    <>
        <Button leftIcon={<AddIcon/>} size='sm' onClick={handleClickOpenCreate} colorScheme={'blue'}>AGREGAR</Button>
        
        <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        size={'xl'}
        >
        <ModalOverlay />
        <form>
        <ModalContent>
            <ModalHeader>AGREGAR NUEVO PERFIL</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>PERFIL</FormLabel>
                <Input 
                onChange={(e)=> {setPerfil({ ...userperfil, perfil: (e.target.value).toUpperCase() })}}
                placeholder='Perfil'
                type={'text'}
                textTransform='uppercase'
                />
            </FormControl>
            <FormControl mt={4} isRequired={true}>
                <FormLabel>DESCRIPCI??N</FormLabel>
                <Textarea
                onChange={(e)=> {setPerfil({ ...userperfil, descripcion: (e.target.value) })}} 
                placeholder='Descripcion'
                textTransform='uppercase'
                />
            </FormControl>
            <FormControl mt={4} isRequired>
                <FormLabel>ESTADO</FormLabel>
                <Select
                defaultValue={userperfil.activo = 'S'}
                onChange={(e)=> {setPerfil({...userperfil,activo:(e.target.value) })}}
                >
                <option value='S'>ACTIVO</option>
                <option value='N'>INACTIVO</option>
                </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button type={'submit'} onClick={()=>savePerfil()} colorScheme={'blue'} mr={3}>
                GUARDAR
            </Button>
            <Button onClick={handleCloseModal}>CANCELAR</Button>
            </ModalFooter>
        </ModalContent>
        </form>
        </Modal>
    </>
    )
}

export default PerfilPersonaAgregar;