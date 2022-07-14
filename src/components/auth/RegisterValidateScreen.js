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
  Avatar
} from '@chakra-ui/react';

import { ImUserPlus } from "react-icons/im";

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
  const titleColor = useColorModeValue('#c53030', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const dispatch = useDispatch();

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
    }
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
        >
          <Text fontSize={{ base: '1xl', sm: '2xl', md: '3xl', lg: '3xl' }} color="#9a1413" fontWeight="bold">
          Sistema de incidencias Corte Superior de Justicia de Arequipa
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="10px" mt="10px">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            backgroundColor="white"
            boxShadow={'md'}
            px={'3rem'}
            py={'2rem'}
            borderRadius="lg"
            rounded="lg"
            borderTop="6px solid"
            borderColor={titleColor}
          >
            <Avatar bg="red.500" icon={<ImUserPlus fontSize='1.8rem' color='white' />} />
            <Text
              fontSize="xl"
              color={titleColor}
              fontWeight="bold"
              textAlign="center"
              mb="20px"
            >
              Registro de usuario
            </Text>
            <Box minW={{ base: "90%", md: "340px" }}>
              <Formik
                initialValues={initialUsuario}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({handleSubmit}) => (
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
                            defaultValue={data ? data.nombre : ''}
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
                        />
                        <InputControl 
                        name={'password2'} 
                        inputProps={{ type: 
                        "password" }} 
                        label="Password confirmación"
                        onChange={e => { setUsuario({...dataUsuario, password2: e.target.value })}}
                        />
                      </HStack>
                      <HStack>
                        <FormControl mt={2}>
                          <Button
                            type="submit"
                            bg="red.500"
                            fontSize="10px"
                            color="white"
                            fontWeight="bold"
                            w="100%"
                            mb={2}
                            _hover={{
                              bg: 'red.600',
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
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
