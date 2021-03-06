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

import { AddIcon } from '@chakra-ui/icons';

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

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  const initialPersona = {
    nombre: '',
    apellido: '',
    usuario: '',
    dni: '',
    password: '',
    correo: '',
    celular: '',
    fecha: null,
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: null,
    },
  };

  const [persona, setPersona] = useState(initialPersona);

  const savePersona = e => {
    e.preventDefault();
    const {
      nombre,
      apellido,
      usuario,
      dni,
      password,
      correo,
      celular,
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
        correo,
        celular,
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

  return (
    <>
      <Button leftIcon={<AddIcon/>} size="sm" colorScheme={'blue'} onClick={handleClickOpenCreate}>
        AGREGAR
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'4xl'}
      >
        <ModalOverlay />
        <form onSubmit={savePersona}>
          <ModalContent>
            <ModalHeader>AGREGAR NUEVA PERSONA</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={2}>
              <Grid
                templateColumns="repeat(5, 1fr)"
                gap={5}
                width="100%"
                alignContent={'space-between'}
              >
                <GridItem h="10" colSpan={4}>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, dni: e.target.value })
                    }
                    placeholder="DNI"
                    type={'text'}
                    isRequired
                  />
                </GridItem>
                <GridItem h="10" colSpan={1} mx={0}>
                  <Button colorScheme="teal" variant="solid">
                    {' '}
                    <FaFingerprint />{' '}
                  </Button>
                </GridItem>
              </Grid>
              <HStack spacing={'10px'} mt={5}>
                <FormControl>
                  <FormLabel>NOMBRES</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, nombre: e.target.value })
                    }
                    placeholder="Nombres"
                    textTransform='uppercase'
                    type={'text'}
                    isRequired
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>APELLIDOS</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, apellido: e.target.value })
                    }
                    placeholder="Apellidos"
                    textTransform='uppercase'
                    type={'text'}
                    isRequired
                  />
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel>USUARIO</FormLabel>
                  <Input
                    defaultValue={(persona.usuario = persona.dni)}
                    // onValueChange={persona.usuario}
                    onChange={e => {
                      setPersona({
                        ...persona,
                        usuario: e.target.value.usuario,
                      });
                    }}
                    type={'text'}
                    placeholder="Usuario"
                    textTransform='uppercase'
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>PASSWORD</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, password: e.target.value })
                    }
                    type={'password'}
                    placeholder="minimo 8 caracteres"
                    isRequired
                  />
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel>CORREO</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, correo: e.target.value })
                    }
                    type={'email'}
                    placeholder="Correo"
                    textTransform='uppercase'
                    isRequired
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>NRO CELULAR</FormLabel>
                  <Input
                    type={'text'}
                    placeholder="942123567"
                    onChange={e =>
                      setPersona({ ...persona, celular: e.target.value })
                    }
                  />
                </FormControl>
              </HStack>

              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel>FECHA DE NACIMIENTO</FormLabel>
                  <Input
                    type={'date'}
                    onChange={e =>
                      setPersona({ ...persona, fecha: e.target.value })
                    }
                    isRequired
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>SEXO</FormLabel>
                  <Select
                    defaultValue={(persona.sexo = 'M')}
                    onChange={e => {
                      setPersona({ ...persona, sexo: e.target.value });
                    }}
                  >
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                  </Select>
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel>ESTADO</FormLabel>
                  <Select
                    defaultValue={(persona.activo = 'S')}
                    onChange={e => {
                      setPersona({ ...persona, activo: e.target.value });
                    }}
                  >
                    <option value="S">ACTIVO</option>
                    <option value="N">INACTIVO</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>PERFIL PERSONA</FormLabel>
                  <Select
                    isRequired
                    onChange={e =>
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
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Button type={'submit'} colorScheme={'blue'} mr={3}>
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal}>CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default PersonaAgregar;
