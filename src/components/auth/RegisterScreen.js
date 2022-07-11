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
  Image,
} from '@chakra-ui/react';

import { notification } from '../../helpers/alert';

// Assets
import BgSignUp from '../../assets/img/fondo.jpg';
import { StartDni, startLogin } from '../../actions/auth';
import { createPersonaRegister } from '../../actions/persona';
import { store } from '../../store/store';
import { useHistory } from 'react-router-dom';

export const RegisterScreen = () => {
  const titleColor = useColorModeValue('#9a1413', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const history = useHistory();

  const [openModal, setOpenModal] = React.useState(false);

  const [validadorDni, setDni] = useState({
    dni: '',
    codigoVerificacion: '',
    fechaNacimiento: '',
  });

  const data = store.getState().usuarioDni;

  console.log(data);

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
    dispatch(StartDni(
        validadorDni.dni,
        validadorDni.codigoVerificacion,
        validadorDni.fechaNacimiento
      )
    )
    .then(() => {
      history.push('/auth/register/validate');
    }).catch(e => {
      history.push('/auth/register');
      notification('Error', 'El DNI no es valido', e);
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
          borderRadius={{ md: 'md' }}
          left="0"
          right="0"
          bgRepeat="no-repeat"
          overflow="hidden"
          zIndex="-1"
          bgImg={BgSignUp}
          top="0"
          bgSize="cover"
          mx={{ md: 'auto' }}
          mt={{ md: '14px' }}
        >
        </Box>
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          align="center"
          mt="3.5rem"
          mb="30px"
        >
          <Text mx={5} fontSize={{ base: '1xl', sm: '2xl', md: '3xl', lg: '3xl' }} color="#9a1413" fontWeight="bold">
            Sistema de incidencias Corte Superior de Justicia de Arequipa
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="10px" mt="10px">
          <Flex
            direction="column"
            background="transparent"
            borderRadius="lg"
            w={'100%'}
            maxW={{ base: '90%', sm: '450px', md: '450px', lg: '450px' }}
            p="50px"
            bg={bgColor}
            boxShadow={'md'}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb={'20px'}
            >
              Validar DNI
            </Text>
            <form onSubmit={HandleValidatorUser}>
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="normal"
                  mt={'10px'}
                >
                  Documento de identificación
                </FormLabel>
                <Input
                  fontSize="sm"
                  type="text"
                  placeholder="DNI"
                  size="lg"
                  defaultValue={validadorDni ? validadorDni.dni : ''}
                  onChange={e => {
                    setDni({ ...validadorDni, dni: e.target.value });
                  }}
                  id="dni"
                  isRequired
                />
                <FormLabel fontSize="sm" fontWeight="normal" mt="10px">
                  codigo Verificacion
                </FormLabel>
                <Input
                  fontSize="sm"
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
                <FormLabel fontSize="sm" fontWeight="normal" mt="10px">
                  Fecha de Nacimiento
                </FormLabel>
                <Input
                  fontSize="sm"
                  id="fechaNacimiento"
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
                <Flex justifyContent={'center'}>
                  <Text color={textColor} fontWeight="medium" mt={4}>
                    Ya tienes una cuenta creada?
                    <LinkB
                      color={titleColor}
                      as="span"
                      ms="5px"
                      href="#"
                      fontWeight="bold"
                    >
                      <LinkA to={'/auth/login'}>Login</LinkA>
                    </LinkB>
                  </Text>
                </Flex>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
