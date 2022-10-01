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
  Avatar,
  Image
} from '@chakra-ui/react';

import { ImUserPlus } from "react-icons/im";
import registerImg from '../../assets/img/register.png';

import { InputControl } from "formik-chakra-ui";

import { notification } from '../../helpers/alert';

// Assets
import BgSignUp from '../../assets/img/fondo.jpg';
import { createPersonaRegister } from '../../actions/persona';
import { store } from '../../store/store';

import { Formik } from 'formik';
import * as Yup from 'yup';

export const RegisterValidateScreen = () => {
  const titleColor = useColorModeValue('#c53030', 'red.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.800');
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
      idPerfilPersona: 4,
    },
  };

  const [dataUsuario, setUsuario] = useState(initialUsuario);

  const onSubmit = () => {
    if (
      dataUsuario.password1 != dataUsuario.password2 &&
      dataUsuario.password1 != '' &&
      dataUsuario.password2 != ''
    ) {
      notification('Error', 'Las contraseñas no coinciden', 'error');
    } else {
      console.log(data);
      var usuario = {
        nombre: data.nombre,
        apellido: data.apellidos,
        dni: data.dni,
        usuario: data.dni,
        password: dataUsuario.password1,
        fecha: data.fechaNacimiento.split('/').reverse().join('-'),
        sexo: data.sexo === 'MASCULINO' ? 'M' : 'F',
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
          <Text fontSize={{ base: 'xl', sm: '2xl', md: '2xl', lg: '3xl' }} textTransform="uppercase" color="#9a1413" fontWeight="bold">
            Sistema de incidencias Corte Superior de Justicia de Arequipa
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="10px" mt="10px">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            backgroundColor={bgColor}
            boxShadow={'md'}
            px={'3rem'}
            py={'2rem'}
            borderRadius="lg"
            rounded="lg"
            borderTop="6px solid"
            borderColor={titleColor}
          >
            <Box p={2} boxShadow="md" borderRadius="md">
              <Image boxSize='50px' objectFit='cover' src={registerImg} />
            </Box>
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
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
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
                              readOnly
                              name="documentoIdentificacion"
                              defaultValue={data ? data.dni : ''}
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
                              readOnly
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
                              readOnly
                              defaultValue={data ? data.apellidos : ''}
                            />
                          </FormControl>
                        </HStack>

                        <HStack>
                          <InputControl
                            name={'password1'}
                            inputProps={{ type: "password" }}
                            label="Password"
                            onChange={e => { setUsuario({ ...dataUsuario, password1: e.target.value }) }}
                          />
                          <InputControl
                            name={'password2'}
                            inputProps={{
                              type:
                                "password"
                            }}
                            label="Password confirmación"
                            onChange={e => { setUsuario({ ...dataUsuario, password2: e.target.value }) }}
                          />
                        </HStack>
                        <HStack>
                          <FormControl mt={2}>
                            <Button
                              type="submit"
                              bg="red.500"
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
                          <Button
                            type="submit"
                            w="100%"
                            colorScheme="gray"
                            fontWeight="bold"
                            _focus={{ boxShadow: "none" }}
                          >
                            <LinkA to={'/auth/register'}>REGRESAR</LinkA>
                          </Button>
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
