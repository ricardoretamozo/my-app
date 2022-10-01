import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as LinkA } from 'react-router-dom';
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
  Image,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';

import {
  InputControl,
} from "formik-chakra-ui";

import { validadorUsuario, validadorUsuarioCreado } from '../../actions/auth';

import DNI from '../../assets/img/dni.png';
import BgSignUp from '../../assets/img/fondo.jpg';
import { useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';
import { notification, timerNotification } from '../../helpers/alert';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { QuestionIcon } from '@chakra-ui/icons';

export const RegisterScreen = () => {
  const titleColor = useColorModeValue('#c53030', 'red.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgCard = useColorModeValue("white", "gray.800");

  const dispatch = useDispatch();
  const history = useHistory();

  const [validadorDni, setDni] = useState({
    dni: '',
    codigoVerificacion: '',
    fechaNacimiento: '',
  });

  /**
   * Funcion para modificar el formato de la fecha
   */

  const stringToDate = (_date, _format, _delimiter) => {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  const StartDni = async (numeroDocumento, codigoVerificacion, fechaNacimiento) => {
    await fetch(`http://172.28.206.57:8080/SIJ/Reniec/${numeroDocumento}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        var fechax = Moment(new Date(stringToDate(data[28], "dd/MM/yyyy", "/"))).format('yyyy-MM-DD')
        if ((data[0] === numeroDocumento) && (data[1] === codigoVerificacion) && (fechax === fechaNacimiento)) {
          timerNotification('Validacion correcta');
          dispatch(validadorUsuario({
            dni: data[0],
            numeroVerificacion: data[1],
            nombre: data[5],
            apellidos: data[2] + ' ' + data[3],
            fechaNacimiento: data[28],
            sexo: data[17]
          }))
          history.push('/auth/register/validate');
        } else {
          history.push('/auth/register');
          notification('Los datos no coinciden, error de validacion', '', 'error');
        }
      }
      ).catch((error) => {
        console.log(error)
      })
  }

  const HandleValidatorUser = () => {
    validadorUsuarioCreado(validadorDni.dni)
      .then((value) => {
        if (value === true) {
          dispatch(StartDni(
            validadorDni.dni,
            validadorDni.codigoVerificacion,
            validadorDni.fechaNacimiento
          ))
        } else {
          history.push('/auth/register');
          console.log('ingreso 2')
        }
      }).catch(err => {
        console.log(err);
        history.push('/auth/register');
      })
    // StartDni(
    //   validadorDni.dni,
    //   validadorDni.codigoVerificacion,
    //   validadorDni.fechaNacimiento
    // ).then(() => {
    //   // history('/auth/register/validate');
    //   validadorUsuarioCreado(validadorDni.dni)
    //     .then((res) => {
    //       console.log(res)
    //       history('/auth/register');
    //       // history('/auth/register/validate');
    //       console.log('ingreso 1')
    //     })
    //     .catch((e) => {
    //       console.log(e)
    //       history('/auth/register/validate');
    //       console.log('ingreso 2')
    //       // history('/auth/register');
    //     })
    //   }).catch(() => {
    //     history('/auth/register');
    //     console.log('ingreso 3')
    //     // history('/auth/register');
    //   })
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
          mt="2rem"
          mb="30px"
        >
          <Text mx={5} fontSize={{ base: 'xl', sm: '1xl', md: '2xl', lg: '3xl' }} color="#9a1413" fontWeight="bold">
            Sistema de incidencias Corte Superior de Justicia de Arequipa
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="5px">
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            backgroundColor={bgCard}
            boxShadow={'md'}
            px={'3rem'}
            py={'2.5rem'}
            borderRadius="lg"
            rounded="lg"
            borderTop="6px solid"
            borderColor={titleColor}
          >
            <Box p={2} boxShadow="md" borderRadius="md">
              <Image boxSize='50px' objectFit='cover' src={DNI} />
            </Box>
            <Text
              fontSize="xl"
              color={titleColor}
              fontWeight="bold"
              textAlign="center"
              mb={'20px'}
            >
              VALIDAR DNI
            </Text>
            <Box minW={{ base: "90%", md: "350px" }}>
              <Formik
                initialValues={validadorDni}
                validationSchema={validationSchema}
                onSubmit={HandleValidatorUser}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={1} align="flex-start" mt={2}>
                      <InputControl
                        name={'dni'}
                        label={'DNI'}
                        inputProps={{ type: "text", placeholder: "INGRESE SU DNI" }}
                        onChange={e => {
                          setDni({ ...validadorDni, dni: e.target.value });
                        }}
                      />
                      <InputControl
                        name={'codigoVerificacion'}
                        label={<Flex justify="space-between">
                          <Text>CODIGO DE VERIFICACIÓN</Text>
                          <PopoverForm />
                        </Flex>}
                        inputProps={{ type: "text", placeholder: "CÓDIGO DE VERIFICACIÓN" }}
                        onChange={e => {
                          setDni({
                            ...validadorDni,
                            codigoVerificacion: e.target.value,
                          });
                        }}
                      />
                      <InputControl
                        name={'fechaNacimiento'}
                        inputProps={{ type: "date" }}
                        label={'FECHA DE NACIMIENTO'}
                        onChange={e => {
                          setDni({
                            ...validadorDni,
                            fechaNacimiento: e.target.value.toString(),
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
                          _focus={{ boxShadow: "none" }}
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

const PopoverForm = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        _focus={{ boxShadow: "none" }}
      >
        <PopoverTrigger>
          <IconButton size='xs' icon={<QuestionIcon />} _focus={{ boxShadow: "none" }} />
        </PopoverTrigger>
        <PopoverContent p={5} _focus={{ boxShadow: "none" }} color='white' bg='gray.700' borderColor='blue.600'>
          <PopoverArrow bg='gray.700'/>
          <PopoverCloseButton _focus={{ boxShadow: "none" }} />
          <PopoverHeader fontWeight="bold" fontSize={'sm'} textAlign="center">¿Donde está el código verificador de mi DNI?</PopoverHeader>
          <PopoverBody>
            <Text fontSize="xs" color="gray.500">
              Este número se encuentra en la parte superior derecha de tu DNI, justo después del número de tu documento. Este dígito es antecedido por un guión (-).
            </Text>
            <Image src='https://www.consultadniperu.com/wp-content/uploads/2021/01/dni.png' mt={2} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}
