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
  Link as LinkB,
  Text,
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  Field,
} from '@chakra-ui/react';

import {
  InputControl,
} from "formik-chakra-ui";

import { notification } from '../../helpers/alert';

// Assets
import BgSignUp from '../../assets/img/fondo.jpg';
import { StartDni, startLogin } from '../../actions/auth';
import { createPersonaRegister } from '../../actions/persona';
import { store } from '../../store/store';

import { Formik } from 'formik';
import * as Yup from 'yup';

export const RegisterValidateScreen = () => {
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

  const onSubmit = (values) => {
    // values.preventDefault();
    console.log(values);
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

  const HandleValidatorUser = e => {
    e.preventDefault();
    console.log(validadorDni);
    dispatch(
      StartDni(
        validadorDni.dni,
        validadorDni.codigoVerificacion,
        validadorDni.fechaNacimiento
      )
    )
      .then(() => {
        //  setOpenModal(true);
      })
      .catch(err => {
        //  setOpenModal(true);
      });
  };

  const validationSchema = Yup.object({
    password1: Yup.string().required('El campo es requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password2: Yup.string().required("Por favor confirma tu contraseña")
    .when("password1", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password1")], "Las contraseñas no coinciden")
    })
  });

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
          top="0"
          bgImage={BgSignUp}
          bgSize="cover"
          mx={{ md: 'auto' }}
          mt={{ md: '14px' }}
        >
          
        </Box>
        <Flex
          textAlign="center"
          justifyContent="center"
          align="center"
          mt="3rem"
          mb="30px"
          mx={{ base: '30px', sm: '40px', md: '50px' }}
        >
          <Text fontSize={{ base: '1xl', sm: '2xl', md: '3xl', lg: '3xl' }} color="#9a1413" fontWeight="bold">
          Sistema de incidencias Corte Superior de Justicia de Arequipa
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="10px" mt="10px">
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            borderRadius="lg"
            p="50px"
            maxW={{ base: '95%', sm: '85%', md: '500px', lg: '500px' }}
            bg={bgColor}
            boxShadow="md"
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="20px"
            >
              Registro de usuario
            </Text>
            <Formik
              initialValues={initialUsuario}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({handleSubmit, values, errors }) => (
              <form onSubmit={ handleSubmit }>
                <Stack>
                  <VStack spacing={2} align="stretch">
                    <HStack>
                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="normal">
                        Documento de identificación
                      </FormLabel>
                      <Input
                        fontSize="sm"
                        type="text"
                        size="lg"
                        isDisabled
                        name="documentoIdentificacion"
                        // value={data.numeroDocumento}
                        defaultValue={data ? data.numeroDocumento : ''}
                        onChange={e => {
                          setUsuario({ ...dataUsuario, dni: e.target.value });
                        }}
                      />
                    </FormControl>
                    </HStack>

                    <HStack>
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="normal">
                          Nombres
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          type="text"
                          size="lg"
                          isDisabled
                          // value={data.numeroDocumento}
                          defaultValue={data ? data.nombre : ''}
                          // onChange={e => {
                          //   setUsuario({ ...dataUsuario, dni: e.target.value });
                          // }}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="sm" fontWeight="normal">
                          Apellidos
                        </FormLabel>
                        <Input
                          fontSize="sm"
                          type="text"
                          size="lg"
                          isDisabled
                          // value={data.numeroDocumento}
                          defaultValue={data ? data.apellidos : ''}
                        />
                      </FormControl>                  
                    </HStack>

                    <HStack>
                      <InputControl 
                      name={'password1'} 
                      inputProps={{ type: "password" }} 
                      label="Password"
                      onChange={e => { setUsuario({...dataUsuario, password1: e.target.value })}}
                      // onChange={e => { e.target.value = e.target.value; setUsuario({ ...dataUsuario, password1: e.target.value }); }}
                       />
                      <InputControl 
                      name={'password2'} 
                      inputProps={{ type: 
                      "password" }} 
                      label="Password confirmación"
                      // onChange={e => { e.target.value = e.target.value; setUsuario({ ...dataUsuario, password2: e.target.value }); }}
                      onChange={e => { setUsuario({...dataUsuario, password2: e.target.value })}}
                       />
                    </HStack>
                    <HStack>
                      <FormControl mt={2}>
                        <Button
                          type="submit"
                          // onClick={() => handleCreateUser()}
                          bg="#9a1413"
                          fontSize="10px"
                          color="white"
                          fontWeight="bold"
                          w="100%"
                          h="45"
                          mb={2}
                          _hover={{
                            bg: 'black',
                          }}
                          _active={{
                            bg: 'teal.400',
                          }}
                        >
                          REGISTRARSE
                        </Button>
                      </FormControl>
                    </HStack>
                    <Flex justifyContent={'center'}>
                      <Text color={textColor} fontWeight="medium">
                        Desea validar de nuevo?
                        <LinkB
                          color={titleColor}
                          as="span"
                          ms="5px"
                          href="#"
                          fontWeight="bold"
                        >
                          <LinkA to={'/auth/register'}>REGRESAR</LinkA>
                        </LinkB>
                      </Text>
                    </Flex>
                  </VStack>
                </Stack>
              </form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
