import React, { useState } from 'react';
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
import { startDni } from '../../actions/auth';

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};

const useUsuario = () => {
  const [values, setValues] = useState({documentoIdentidad: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: ''});

  const guardar = (d , n , a , f) => setValues({documentoIdentidad: d,
  nombres: n,
  apellidos: a,
  fechaNacimiento: f});

  const reset = () => {
    setValues( {documentoIdentidad: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: ''} );
}

  return{
    values,
    guardar,
    reset
  };

}

export const RegisterScreen = () => {
  const titleColor = useColorModeValue('#9a1413', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');

  const [formValues, handleInputChange , reset] = useForm({
    dni: '',
    ubigeo: '',
    apellidoMaterno: '',
  });

  const { dni, ubigeo, apellidoMaterno } = formValues;

  const usuario = useUsuario();

  const handleCreate = e => {
    e.preventDefault();
    console.log(dni);
    const dato = startDni( dni, ubigeo, apellidoMaterno );
    dato.then( body => {
      if(!!body[0]){
        usuario.guardar(body[0].numeroDocumento, body[0].nombres , body[0].apellidos , body[0].fechaNacimiento);
        console.log(usuario.values)
        console.log(body[0].numeroDocumento)
      }else{
        usuario.reset();
        reset();
      }
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
            <form  onSubmit={handleCreate}>
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
                  onChange={handleInputChange}
                  value={dni}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Ubigeo
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Ubigeo"
                  mb="24px"
                  size="lg"
                  id="form-Ubigeo"
                  name="ubigeo"
                  onChange={handleInputChange}
                  value={ubigeo}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Apellido Materno
                </FormLabel>
                <Input
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="text"
                  placeholder="Apellido Materno"
                  mb="24px"
                  size="lg"
                  id="form-Apellido-Materno"
                  name="apellidoMaterno"
                  onChange={handleInputChange}
                  value={apellidoMaterno}
                />
                <Button
                  type="submit"
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
                >
                  VALIDAR
                </Button>
              </FormControl>
            </form>

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
                    isDisabled
                    name='documentoIdentificacion'
                    value={usuario.values.documentoIdentidad}
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
                    name='nombres'
                    value={usuario.values.nombres}
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
                    name='apellidos'
                    value={usuario.values.apellidos}
                  />
                  <Button
                    type="submit"
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
                    SIGN UP
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
                    name='fechaNacimiento'
                    value={usuario.values.fechaNacimiento}
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
                    name='password'
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
                    mb="24px"
                    size="lg"
                    id="form-password"
                  />
                  <Text color={textColor} fontWeight="medium">
                    Already have an account?
                    <LinkB
                      color={titleColor}
                      as="span"
                      ms="5px"
                      href="#"
                      fontWeight="bold"
                    >
                      <LinkA to={'/auth/login'}>Sign In</LinkA>
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
