import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as LinkA } from 'react-router-dom';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  VStack,
  Link as LinkB,
  Text,
  useColorModeValue,
  HStack,
  Stack,
  Avatar
} from '@chakra-ui/react';

import {
  InputControl,
} from "formik-chakra-ui";

import { FaRegAddressCard } from "react-icons/fa";

// Assets
import BgSignUp from '../../assets/img/fondo.jpg';
import { StartDni, validadorUsuarioCreado } from '../../actions/auth';
import { useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

export const RegisterScreen = () => {
  const titleColor = useColorModeValue('#c53030', 'red.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const bgCard = useColorModeValue("white", "gray.800");

  const dispatch = useDispatch();
  const history = useHistory();

  const [validadorDni, setDni] = useState({
    dni: '',
    codigoVerificacion: '',
    fechaNacimiento: '',
  });

  const HandleValidatorUser = (e)=> {
    dispatch(StartDni(
        validadorDni.dni,
        validadorDni.codigoVerificacion,
        validadorDni.fechaNacimiento
      )
    )
    .then(() => {
      dispatch(validadorUsuarioCreado(validadorDni.dni).then(() => {
          history.push('/auth/register');
        })
        .catch(() => {
          history.push('/auth/register/validate');
        }))
    }).catch(e => {
      history.push('/auth/register');
    });
  };

  // Validacion con formik

  const validationSchema = Yup.object({
    dni: Yup.string().required('El campo es requerido').length(8, 'El DNI debe tener 8 digitos'),
    codigoVerificacion: Yup.string().required('El campo es requerido').max(1, 'Este campo debe tener solo un 1 caracter'),
    fechaNacimiento: Yup.string().required('El campo es requerido')
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
          mt="3rem"
          mb="30px"
        >
          <Text mx={5} fontSize={{ base: 'xl', sm: '1xl', md: '2xl', lg: '3xl' }} color="#9a1413" fontWeight="bold">
            Sistema de incidencias Corte Superior de Justicia de Arequipa
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="5px" mt="5px">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            backgroundColor={bgCard}
            boxShadow={'md'}
            px={'3rem'}
            py={'3rem'}
            borderRadius="lg"
            rounded="lg"
            borderTop="6px solid"
            borderColor={titleColor}
          >
            <Avatar bg="red.500" icon={<FaRegAddressCard fontSize='1.8rem' color='white' />} />
            <Text
              fontSize="xl"
              color={titleColor}
              fontWeight="bold"
              textAlign="center"
              mb={'20px'}
            >
              Validar DNI
            </Text>
            <Box minW={{ base: "90%", md: "350px" }}>
              <Formik
                initialValues={validadorDni}
                validationSchema={validationSchema}
                onSubmit={HandleValidatorUser}
              >
                {({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={2} align="flex-start" mt={2}>
                    <InputControl 
                      name={'dni'} 
                      inputProps={{ type: "text", placeholder: "DNI" }} 
                      onChange={e => {
                        setDni({ ...validadorDni, dni: e.target.value });
                      }}
                    />
                    <InputControl 
                      name={'codigoVerificacion'} 
                      inputProps={{ type: "text", placeholder: "Código de Verificacion" }} 
                      onChange={e => {
                        setDni({
                          ...validadorDni,
                          codigoVerificacion: e.target.value,
                        });
                      }}
                    />
                    <InputControl
                      mb={'20px'}
                      name={'fechaNacimiento'} 
                      inputProps={{ type: "date" }}
                      label={'Fecha de Nacimiento'}
                      onChange={e => {
                        setDni({
                          ...validadorDni,
                          fechaNacimiento: e.target.value,
                        });
                      }}
                    />
                    <HStack w={'100%'}>
                      <Button
                        bg="red.500"
                        fontSize="10px"
                        color="white"
                        fontWeight="bold"
                        w="100%"
                        mt={'10px'}
                        _hover={{
                          bg: 'red.600',
                        }}
                        type="submit"
                      >
                        VALIDAR
                      </Button>
                    </HStack>
                    <Flex justifyContent={'center'} w={'100%'} textAlign={'center'}>
                      <Text color={textColor} fontWeight="medium">
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
                  </VStack>
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
