import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
// Assets
import BgSignUp from '../../assets/img/fondo.jpg';
import { startDni , validadorUsuario} from '../../actions/auth';
import { store } from '../../store/store';

export const RegisterScreen = () => {
  const titleColor = useColorModeValue('#9a1413', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');

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

  const dispatch = useDispatch();

  const handleCreateUser = () => {

    console.log(dataUsuario);
  };

  const HandleValidatorUser = () => {
    console.log(validadorDni);
    dispatch(startDni(validadorDni.dni, validadorDni.codigoVerificacion, validadorDni.fechaNacimiento));
    /*setUsuario({
      nombre: data.nombres,
      apellido: data.apellidos,
      dni: data.numeroDocumento,
      usuario: data.numeroDocumento,
      fecha: data.fechaNacimiento,
      sexo: data.sexo,
      activo: 'S',
      perfilPersona: {
        idPerfilPersona: 66,
      },
    })*/
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
          minH={{ base: '70vh', md: '50vh' }}
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
          mt="6.5rem"
          mb="30px"
        >
          <Text fontSize="4xl" color="#9a1413" fontWeight="bold">
            Sistema de incidencias Poder Judicial-Arequipa
          </Text>
          <Text
            fontSize="md"
            color="white"
            fontWeight="normal"
            mt="10px"
            mb="26px"
            w={{ base: '90%', sm: '60%', lg: '40%', xl: '30%' }}
          >
            Registro de usuario, para el sistema de incidencias del Poder
            Judicial Arequipa.
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="50px" mt="20px">
          <Flex
            direction="column"
            w="30%"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: '50px' }}
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Validar DNI
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
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
                id="form-dni"
                name="dni"
                defaultValue={validadorDni ? validadorDni.dni : ''}
                // onChange={() => handleInputChange()}
                onChange={e => {
                  setDni({ ...validadorDni, dni: e.target.value });
                }}
                // value={dni}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                codigo Verificacion
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                placeholder="codigoVerificacion"
                mb="24px"
                size="lg"
                id="form-codigoVerificacion"
                name="codigoVerificacion"
                defaultValue={
                  validadorDni ? validadorDni.codigoVerificacion : ''
                }
                // onChange={handleInputChange}
                onChange={e => {
                  setDni({
                    ...validadorDni,
                    codigoVerificacion: e.target.value,
                  });
                }}
                // value={codigoVerificacion}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Fecha de Nacimiento
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="date"
                placeholder="fechaNacimiento"
                mb="24px"
                size="lg"
                id="form-fechaNacimiento"
                name="fechaNacimiento"
                defaultValue={validadorDni ? validadorDni.dni : ''}
                // onChange={handleInputChange}
                // value={fechaNacimiento}
                onChange={e => {
                  setDni({ ...validadorDni, fechaNacimiento: e.target.value });
                }}
              />
              <Button
                bg="GREEN"
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
                onClick={() => HandleValidatorUser  ()}
              >
                VALIDAR
              </Button>
            </FormControl>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
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
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
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
            <FormControl>
              <Flex>
                <Flex w="50%" direction="column" p="20px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
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
                    name="documentoIdentificacion"
                    // value={data.numeroDocumento}
                    defaultValue={data ? data.numeroDocumento : ''}
                    onChange={e => {
                      setUsuario({ ...dataUsuario, dni: e.target.value });
                    }}
                  />
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Nombres
                  </FormLabel>
                  <Input
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    type="text"
                    placeholder="Nombres"
                    mb="24px"
                    size="lg"
                    isDisabled
                    name="nombres"
                    // value={usuario.values.nombres}
                    //defaultValue={usuario.values.nombres}
                    onChange={e => {
                      setUsuario({ ...dataUsuario, nombre: e.target.value });
                    }}
                  />
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Apellidos
                  </FormLabel>
                  <Input
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    type="text"
                    placeholder="Apellidos"
                    mb="24px"
                    size="lg"
                    isDisabled
                    name="apellidos"
                    //value={usuario.values.apellidos}
                    onChange={e => {
                      setUsuario({ ...dataUsuario, apellido: e.target.value });
                    }}
                  />
                  <Button
                    type="submit"
                    onClick={() => handleCreateUser()}
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
                </Flex>
                <Flex w="50%" direction="column" p="20px">
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Fecha nacimiento
                  </FormLabel>
                  <Input
                    fontSize="sm"
                    ms="4px"
                    borderRadius="15px"
                    type="date"
                    placeholder="Fecha nacimiento"
                    mb="24px"
                    size="lg"
                    isDisabled
                    name="fechaNacimiento"
                    // value={usuario.values.fechaNacimiento}
                    //defaultValue={dataUsuario ? dataUsuario.fecha: usuario.values.fechaNacimiento}
                    onChange={e => {
                      setUsuario({ ...dataUsuario, fecha: e.target.value });
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
                      setUsuario({ ...dataUsuario, password1: e.target.value });
                    }}
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
                      setUsuario({ ...dataUsuario, password2: e.target.value });
                    }}
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
                </Flex>
              </Flex>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
