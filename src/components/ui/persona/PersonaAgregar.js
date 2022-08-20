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
  InputGroup,
  Select,
  HStack,
  InputRightElement,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

// import actions
import { createPersona } from '../../../actions/persona';

import { FaFingerprint } from 'react-icons/fa';

import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import { store } from '../../../store/store';
import { notification } from '../../../helpers/alert';

const PersonaAgregar = props => {
  const [openCreate, setOpenCreate] = React.useState(false);
  const dispatch = useDispatch();

  const dataPerfil = store.getState().perfilPersona.rows;

  const PerfilUsuarioDefault = dataPerfil.filter(perfil =>
    perfil.perfil === 'USUARIO COMUN'
  )

  const initialPersona = {
    nombre: '',
    apellido: '',
    usuario: '',
    dni: '',
    password: '',
    correo: '',
    celular: '',
    fecha: '',
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: null,
    },
  };

  const [persona, setPersona] = useState(initialPersona);

  const [estadoInput, setEstadoInput] = useState(false);

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
        handleCloseModal(true);
      })
      .catch(error => {
        console.log('No se pudo crear la Persona!', { variant: 'error' });
        console.log(error);
      });
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
    setPersona(initialPersona);
    setEstadoInput(false);
  };

  /** MÉTODO PARA REALIZAR LA CONSULTA A LA API DE LA RENIEC */
  
  const consultaReniecDNI = async() => {
    try {
      const respuesta = await fetch("http://172.28.206.57:8080/SIJ/Reniec/" + persona.dni, { method: 'POST' });
      if (respuesta.status === 200 || respuesta.status === 201) {
        const body = await respuesta.json();
        setPersona({
          ...persona,
          nombre: body[5],
          apellido: body[2] + ' ' + body[3],
          fecha: body[28].split('/').reverse().join('-'),
          sexo: body[17] === 'MASCULINO' ? 'M' : 'F',
        });
      } else if (respuesta.status === 404) {
        notification('Persona no encontrada', 'Persona con ese DNI no existe', 'error');
      }
       else {
        notification('Error', 'Error al consultar DNI', 'error');
      }
    } catch (error) {
      console.log(error);
      notification('Error al consultar el DNI', 'No se logró realizar la consulta', 'error', 'modalOrganoAsignacion');
    }
  }

  return (
    <>
      <Button leftIcon={<AddIcon />} size="sm" colorScheme={'facebook'} onClick={handleClickOpenCreate} _focus={{ boxShadow: "none" }}>
        AGREGAR
      </Button>

      <Modal
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'4xl'}
        id="modalOrganoAsignacion"
      >
        <ModalOverlay />
        <form onSubmit={savePersona}>
          <ModalContent>
            <ModalHeader>AGREGAR NUEVO USUARIO</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />
            <ModalBody pb={2}>
              <InputGroup size='md'>
                 <Input
                    onChange={e =>
                      setPersona({ ...persona, dni: e.target.value })
                    }
                    placeholder="DNI"
                    type={'text'}
                    isRequired
                  />
                <InputRightElement width='8.5rem'>
                  <Button 
                    rightIcon={<FaFingerprint />} 
                    colorScheme="facebook" 
                    variant="solid" 
                    h='1.85rem' 
                    size='sm' 
                    onClick={consultaReniecDNI} 
                    disabled={persona.dni === '' || persona.dni.length !== 8 }
                    _focus={{ boxShadow: "none" }}
                    >
                    CONSULTAR
                  </Button>
                </InputRightElement>
              </InputGroup>
              <HStack spacing={'10px'} mt={5}>
                <FormControl isRequired>
                  <FormLabel>NOMBRES</FormLabel>
                  <Input
                    defaultValue={persona.nombre}
                    onChange={e =>
                      setPersona({ ...persona, nombre: (e.target.value).toUpperCase() })
                    }
                    placeholder="Nombres"
                    textTransform={'uppercase'}
                    type={'text'}
                    disabled = {estadoInput}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>APELLIDOS</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, apellido: (e.target.value).toUpperCase() })
                    }
                    defaultValue={persona.apellido}
                    placeholder="Apellidos"
                    textTransform={'uppercase'}
                    type={'text'}
                    disabled = {estadoInput}
                  />
                </FormControl>
              </HStack>
              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl>
                  <FormLabel>USUARIO</FormLabel>
                  <Input
                    defaultValue={(persona.usuario = persona.dni)}
                    onChange={e => {
                      setPersona({
                        ...persona,
                        usuario: e.target.value.usuario,
                      });
                    }}
                    type={'text'}
                    placeholder="Usuario"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>PASSWORD</FormLabel>
                  <Input
                    onChange={e =>
                      setPersona({ ...persona, password: e.target.value })
                    }
                    type={'password'}
                    placeholder="Contraseña(min 6 caracteres)"
                    autoComplete='off'                    
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
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>NRO CELULAR</FormLabel>
                  <Input
                    type={'text'}
                    placeholder="INGRESE SU # DE CELULAR"
                    onChange={e =>
                      setPersona({ ...persona, celular: e.target.value })
                    }
                  />
                </FormControl>
              </HStack>

              <HStack spacing={'10px'} mt={'10px'}>
                <FormControl isRequired>
                  <FormLabel>FECHA DE NACIMIENTO</FormLabel>
                  <Input
                    defaultValue={persona ? persona.fecha : ''}
                    onChange={e =>
                      setPersona({ ...persona, fecha: e.target.value })
                    }
                    disabled = {estadoInput}
                    type={'date'}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>SEXO</FormLabel>
                  <Select
                    value={persona ? persona.sexo : ''}
                    onChange={e => {
                      setPersona({ ...persona, sexo: e.target.value });
                    }}
                    // disabled = {estadoInput}
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
                    defaultValue={persona.perfilPersona = PerfilUsuarioDefault[0].idPerfilPersona}
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
              <Button type={'submit'} colorScheme={'facebook'} mr={3} _focus={{ boxShadow: "none" }}>
                GUARDAR
              </Button>
              <Button onClick={handleCloseModal} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default PersonaAgregar;
