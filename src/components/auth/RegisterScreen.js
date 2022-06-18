import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as LinkA } from 'react-router-dom';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Link as LinkB,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

import { notification } from '../../helpers/alert';

// Assets
import BgSignUp from '../../assets/img/fondo.jpg';
import { startDni, startLogin } from '../../actions/auth';
import { createPersonaRegister } from '../../actions/persona';
import { store } from '../../store/store';

export const RegisterScreen = () => {
  const titleColor = useColorModeValue('#9a1413', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = React.useState(false);

  const [validadorDni, setDni] = useState({
    dni: '',
    codigoVerificacion: '',
    fechaNacimiento: '',
  });

  const data = store.getState().usuarioDni;

  const initialUsuario = {
    nombre: '',
    apellido: '',
    dni: '',
    usuario: '',
    password1: '',
    password2: '',
    fecha: '',
    sexo: '',
    activo: '',
    perfilPersona: {
      idPerfilPersona: 66,
    },
  };

  const [dataUsuario, setUsuario] = useState(initialUsuario);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateUser = e => {
    e.preventDefault();
    console.log(dataUsuario);
    if (
      dataUsuario.password1 != dataUsuario.password2 &&
      dataUsuario.password1 != '' &&
      dataUsuario.password2 != ''
    ) {
      notification('Error', 'Las contraseñas no coinciden', 'error');
    } else {
      console.log(data);
      var usuario = {
        nombre: data.nombres,
        apellido: data.apellidos,
        dni: data.numeroDocumento,
        usuario: data.numeroDocumentod,
        password: dataUsuario.password1,
        fecha: data.fechaNacimiento,
        sexo: data.sexo,
        activo: 'S',
      };
      dispatch(createPersonaRegister(usuario));
      // dispatch(startLogin(usuario.dni, usuario.password));
    }
  };

  const HandleValidatorUser = (e)=> {
    e.preventDefault();
   console.log(validadorDni);
    dispatch(startDni(
        validadorDni.dni,
        validadorDni.codigoVerificacion,
        validadorDni.fechaNacimiento
      )
    ).then(() => {
    //  setOpenModal(true);
    }).catch((err) => {
      //  setOpenModal(true);
    });
  };

  return (
    <>
      <Flex
        direction="column"
        alignSelf="center"
        justifySelf="center"
        overflow="hidden"
      >
        <Box
          position="absolute"
          minH={{ base: '70vh', md: '60vh' }}
          w={{ md: 'calc(100vw - 50px)' }}
          borderRadius={{ md: '15px' }}
          left="0"
          right="0"
          bgRepeat="no-repeat"
          overflow="hidden"
          zIndex="-1"
          top="0"
          bgImage={BgSignUp}
          bgSize="cover"
          mx={{ md: 'auto' }}
          mt={{ md: '14px' }}
        ></Box>
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          align="center"
          mt="3.5rem"
          mb="30px"
        >
          <Text fontSize="4xl" color="#9a1413" fontWeight="bold">
            Sistema de incidencias Poder Judicial-Arequipa
          </Text>
          {/* <Text
            fontSize="md"
            color="white"
            fontWeight="normal"
            mt="10px"
            w={{ base: '90%', sm: '80%', lg: '40%', xl: '30%' }}
          >
            Registro de usuario, para el sistema de incidencias del Poder
            Judicial Arequipa.
          </Text> */}
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="10px" mt="10px" ml={10}>
          <Flex
            direction="column"
            background="transparent"
            borderRadius="15px"
            w={'100%'}
            maxW={{ base: '500px', sm: '80%', md: '500px', lg: '500px' }}
            p="30px"
            bg={bgColor}
            boxShadow={'md'}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb={'10px'}
            >
              Validar DNI
            </Text>
            <form onSubmit={HandleValidatorUser}>
              <FormControl>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="normal"
                  mt={'10px'}
                >
                  Documento de identificación
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="DNI"
                  size="lg"
                  defaultValue={validadorDni ? validadorDni.dni : ''}
                  // onChange={() => handleInputChange()}
                  onChange={e => {
                    setDni({ ...validadorDni, dni: e.target.value });
                  }}
                  id="dni"
                  isRequired
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" mt="10px">
                  codigo Verificacion
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="8"
                  id="codigoVerificacion"
                  size="lg"
                  name="5"
                  defaultValue={
                    validadorDni ? validadorDni.codigoVerificacion : ''
                  }
                  onChange={e => {
                    setDni({
                      ...validadorDni,
                      codigoVerificacion: e.target.value,
                    });
                  }}
                  isRequired
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal" mt="10px">
                  Fecha de Nacimiento
                </FormLabel>
                <Input
                  fontSize="sm"
                  id="fechaNacimiento"
                  ms="4px"
                  type="date"
                  size="lg"
                  defaultValue={
                    validadorDni ? validadorDni.fechaNacimiento : ''
                  }
                  onChange={e => {
                    setDni({
                      ...validadorDni,
                      fechaNacimiento: e.target.value,
                    });
                  }}
                  isRequired
                />
                <Button
                  bg="red.600"
                  fontSize="10px"
                  color="white"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  mt="24px"
                  _hover={{
                    bg: 'red.800',
                  }}
                  type="submit"
                  // onClick={onOpen}
                  //onClick={() => HandleValidatorUser()}
                >
                  VALIDAR
                </Button>
              </FormControl>
            </form>

            {/* MODAL EDITAR */}

            <Modal
              isOpen={openModal}
              onClose={handleCloseModal}
              size={'xl'}
            >
              <ModalOverlay />
              <form onSubmit={handleCreateUser}>
                <ModalContent>
                  <ModalHeader>Confirmar la creacion de la cuenta</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <Flex>
                        <Flex direction="column" w={'100%'}>
                          <FormLabel fontSize="sm" fontWeight="normal">
                            Documento de identificación
                          </FormLabel>
                          <Input
                            fontSize="sm"
                            type="text"
                            placeholder="DNI"
                            mb="24px"
                            size="lg"
                            isDisabled
                            defaultValue={data ? data.numeroDocumento : ''}
                            onChange={e => {
                              setUsuario({
                                ...dataUsuario,
                                dni: e.target.value,
                              });
                            }}
                          />
                          <FormLabel fontSize="sm" fontWeight="normal">
                            Password
                          </FormLabel>
                          <Input
                            fontSize="sm"
                            type="password"
                            placeholder="Password"
                            mb="24px"
                            size="lg"
                            id="form-dni"
                            name="password1"
                            onChange={e => {
                              setUsuario({
                                ...dataUsuario,
                                password1: e.target.value,
                              });
                            }}
                            isRequired
                          />
                          <FormLabel fontSize="sm" fontWeight="normal">
                            Repetir Password
                          </FormLabel>
                          <Input
                            fontSize="sm"
                            type="password"
                            placeholder="Repetir password"
                            name="password2"
                            mb="24px"
                            size="lg"
                            id="form-password"
                            onChange={e => {
                              setUsuario({
                                ...dataUsuario,
                                password2: e.target.value,
                              });
                            }}
                            isRequired
                          />
                          <Text color={textColor} fontWeight="medium">
                            Ya tienes una cuenta creada?
                            <LinkB
                              color={titleColor}
                              as="span"
                              ms="5px"
                              href="#"
                              fontWeight="bold"
                            >
                              <LinkA to={'/auth/login'}>LOGIN</LinkA>
                            </LinkB>
                          </Text>
                          {/* <Button
                      type="submit"
                      // onClick={() => handleCreateUser()}
                      bg="#9a1413"
                      fontSize="10px"
                      color="white"
                      fontWeight="bold"
                      w="100%"
                      h="45"
                      mb="24px"
                      _hover={{
                        bg: 'black',
                      }}
                      _active={{
                        bg: 'teal.400',
                      }}
                    >
                      REGISTRARSE
                    </Button> */}
                        </Flex>
                      </Flex>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="red"
                      mr={3}
                      type="submit"
                      // onClick={() => handleCreateUser()}
                      bg="#9a1413"
                      fontSize="10px"
                      color="white"
                      fontWeight="bold"
                      _hover={{
                        bg: 'black',
                      }}
                      _active={{
                        bg: 'teal.400',
                      }}
                    >
                      REGISTRARSE
                    </Button>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </form>
            </Modal>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mt="0px"
            ></Flex>
          </Flex>

        <Flex
            direction="column"
            w="70%"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: '40px' }}
            bg={bgColor}
            boxShadow="md"
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Registro de usuario
            </Text>
            <form onSubmit={handleCreateUser}>
              <FormControl>
                <Flex>
                  <Flex w="50%" direction="column" p="20px">
                    <FormLabel fontSize="sm" fontWeight="normal">
                      Documento de identificación
                    </FormLabel>
                    <Input
                      fontSize="sm"
                      ms="4px"
                      borderRadius="15px"
                      type="text"
                      placeholder="DNI"
                      mb="24px"
                      size="lg"
                      isDisabled
                      name="documentoIdentificacion"
                      // value={data.numeroDocumento}
                      defaultValue={data ? data.numeroDocumento : ''}
                      onChange={e => {
                        setUsuario({ ...dataUsuario, dni: e.target.value });
                      }}
                    />
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Password
                    </FormLabel>
                    <Input
                      fontSize="sm"
                      ms="4px"
                      borderRadius="15px"
                      type="password"
                      placeholder="Password"
                      mb="24px"
                      size="lg"
                      id="form-dni"
                      name="password1"
                      onChange={e => {
                        setUsuario({
                          ...dataUsuario,
                          password1: e.target.value,
                        });
                      }}
                      isRequired
                    />
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                      Repetir Password
                    </FormLabel>
                    <Input
                      fontSize="sm"
                      ms="4px"
                      borderRadius="15px"
                      type="password"
                      placeholder="Repetir password"
                      name="password2"
                      mb="24px"
                      size="lg"
                      id="form-password"
                      onChange={e => {
                        setUsuario({
                          ...dataUsuario,
                          password2: e.target.value,
                        });
                      }}
                      isRequired
                    />
                  </Flex>
                  <Flex w="50%" direction="column" p="20px">
                    <Button
                      type="submit"
                      // onClick={() => handleCreateUser()}
                      bg="#9a1413"
                      fontSize="10px"
                      color="white"
                      fontWeight="bold"
                      w="100%"
                      h="45"
                      mb="24px"
                      _hover={{
                        bg: 'black',
                      }}
                      _active={{
                        bg: 'teal.400',
                      }}
                    >
                      REGISTRARSE
                    </Button>
                    <Text color={textColor} fontWeight="medium">
                      Ya tienes una cuenta creada?
                      <LinkB
                        color={titleColor}
                        as="span"
                        ms="5px"
                        href="#"
                        fontWeight="bold"
                      >
                        <LinkA to={'/auth/login'}>LOGIN</LinkA>
                      </LinkB>
                    </Text>
                  </Flex>
                </Flex>
              </FormControl>
            </form> 
            {/* <LinkB
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                <LinkA to={'/auth/login'}>LOGIN</LinkA>
              </LinkB> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
