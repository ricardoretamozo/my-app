// Chakra imports
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
  Grid,
  GridItem,
  Select,
  HStack,
} from '@chakra-ui/react';

// import actions
import { createPersona } from '../../../actions/persona';

import { FaFingerprint } from 'react-icons/fa';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import { store } from '../../../store/store';

const PersonaAgregar = props => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const dataPerfil = store.getState().perfilPersona.rows;
  // const dataPersona = store.getState().persona.rows;

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  // const initialPerfil = {
  //   idPerfilPersona: null,
  // }

  // const [perfiles, setPerfiles] = useState(initialPerfil);

  const initialPersona = {
    nombre: '',
    apellido: '',
    usuario: '',
    dni: '',
    password: '',
    fecha: null,
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: null,
    },
  };

  const [persona, setPersona] = useState(initialPersona);

  const savePersona = () => {
    const {
      nombre,
      apellido,
      usuario,
      dni,
      password,
      fecha,
      sexo,
      activo,
      perfilPersona,
    } = persona;
    // const {idPerfilPersona} = perfiles

    dispatch(
      createPersona({
        nombre,
        apellido,
        usuario,
        dni,
        password,
        fecha,
        sexo,
        activo,
        perfilPersona,
      })
    )
      .then(() => {
        console.log(persona);
        handleCloseModal(true);
      })
      .catch(error => {
        console.log('No se pudo crear la Persona!', { variant: 'error' });
        console.log(error);
      });
  };

//Validaciones de formularios

  //Form values
  // const [values, setValues] = useState({});
  // //Errors
  // const [errors, setErrors] = useState({});

  //  //A method to handle form inputs
  // const handleChange = (event) => {
  //     //To stop default events    
  //     event.persist();

  //     let name = event.target.name;
  //     let val = event.target.value;

  //     validate(event,name,val);
  //     //Let's set these values in state

  //     setValues({
  //         ...values,   //spread operator to store old values
  //         [name]:val,
  //     })

  // }

  return (
    <>
      <Button size="sm" colorScheme={'blue'} onClick={handleClickOpenCreate}>
        Agregar
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <form>
        <ModalContent>
          <ModalHeader>Agregar Nueva Persona</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem h="10" colSpan={4}>
                <Input
                  onChange={(e) =>
                    setPersona({ ...persona, dni: e.target.value })
                  }
                  placeholder="DNI"
                  type={'text'}
                  isRequired
                />
              </GridItem>
              <GridItem h="10" colSpan={1}>
                <Button colorScheme="teal" variant="solid">
                  {' '}
                  <FaFingerprint />{' '}
                </Button>
              </GridItem>
            </Grid>
            <HStack spacing={'10px'} mt={5}>
              <FormControl>
                <FormLabel>Nombres</FormLabel>
                <Input
                  onChange={(e) =>
                    setPersona({ ...persona, nombre: e.target.value })
                  }
                  placeholder="Nombres"
                  type={'text'}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <FormLabel>Apellidos</FormLabel>
                <Input
                  onChange={(e) =>
                    setPersona({ ...persona, apellido: e.target.value })
                  }
                  placeholder="Apellidos"
                  type={'text'}
                  isRequired
                />
              </FormControl>
            </HStack>
            <HStack spacing={'10px'} mt={'20px'}>
              <FormControl>
                <FormLabel>Usuario</FormLabel>
                <Input
                  defaultValue={persona.usuario = persona.dni}
                  onValueChange={persona.usuario}
                  onChange={(e) =>{
                    setPersona({ ...persona, usuario: e.target.value.usuario })
                  }}
                  type={'text'}
                  placeholder="usuario"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) =>
                    setPersona({ ...persona, password: e.target.value })
                  }
                  type={'password'}
                  placeholder="minimo 8 caracteres"
                  isRequired
                />
              </FormControl>
            </HStack>

            <FormControl mt={4}>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input
                type={'date'}
                onChange={(e) =>
                  setPersona({ ...persona, fecha: e.target.value })
                }
              />
              {/* onChange={(e)=> {setPersona({ ...persona, fecha: (e.target.value) }); setValidation(false)}}  /> */}
            </FormControl>

            <HStack spacing={'10px'} mt={'20px'}>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select
                  defaultValue={(persona.activo = 'S')}
                  onChange={(e) => {
                    setPersona({ ...persona, activo: e.target.value });
                  }}
                >
                  <option value="S">Activo</option>
                  <option value="N">Inactivo</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Sexo</FormLabel>
                <Select
                  defaultValue={(persona.sexo = 'M')}
                  onChange={(e) =>{
                    setPersona({ ...persona, sexo: e.target.value })
                  }}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl mt={4}>
              <FormLabel>Perfil Persona</FormLabel>
              <Select
                // defaultValue={
                //   (persona.perfilPersona = dataPerfil[0].idPerfilPersona)
                // }
                isRequired
                onChange={(e) =>
                  setPersona({ ...persona, perfilPersona: e.target.value })
                }
              >
                {dataPerfil.map((item, idx) => (
                  <option value={item.idPerfilPersona} key={idx}>
                    {item.perfil}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type={'submit'} onClick={() => savePersona()} colorScheme={'blue'} mr={3}>
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

export default PersonaAgregar;
