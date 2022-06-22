import React, { useState } from 'react';
import { Link as LinkA } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import signInImage from '../../assets/img/poderjudicial.jpg';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';

import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Link as LinkB,
  Heading,
  Input,
  //Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export const LoginScreen = () => {
  // Chakra color mode
  const titleColor = useColorModeValue('#9a1413', 'white');
  const textColor = useColorModeValue('black.400', 'white');

  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    username: '',
    password: '',
  });

  const handleClickOpenModal = () =>{
    setOpenModal(true)
  }

  const { username, password } = formValues;

  const handleLogin = e => {
    e.preventDefault();
    dispatch(startLogin(username, password))
    .then(() =>{
      console.log('Login exitoso');
    })
    .catch((err) =>{
      console.log(err);
      console.log('Login fallido');
    })
  };

  return (
    <>
      <Flex position="relative" mb="40px">
        <Flex
          h={{ sm: 'initial', md: '100vh', lg: '100vh' }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="space-between"
          mb="30px"
          pt={{ sm: '100px', md: '0px' }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            verticalAlign={'middle'}
            w="100%"
            style={{ userSelect: 'none' }}
          >
            <Flex
              direction="column"
              background="transparent"
              p="48px"
            >
              <Heading color={titleColor} fontSize="5xl" mb="15px" textAlign={'center'}>
                Bienvenido
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
                textAlign={'center'}
              >
                Ingresa tu DNI y tu contraseña.
              </Text>
              <form onSubmit={handleLogin}>
                <FormControl>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    DNI
                  </FormLabel>
                  <Input
                  isRequired
                    borderRadius="md"
                    mb="24px"
                    fontSize="sm"
                    type="text"
                    placeholder="DNI"
                    size="lg"
                    focusBorderColor="#9a1413"
                    id="field-1"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                  />
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Contraseña
                  </FormLabel>
                  <Input
                  isRequired
                    borderRadius="md"
                    mb="36px"
                    fontSize="sm"
                    type="password"
                    placeholder="Contraseña"
                    size="lg"
                    focusBorderColor="#9a1413"
                    id="field-2"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <Button
                    fontSize="15px"
                    type="submit"
                    bg="#9a1413"
                    w="100%"
                    h="45"
                    mb="20px"
                    color="white"
                    mt="20px"
                    _hover={{
                      bg: 'black',
                    }}
                    _active={{
                      bg: 'teal.400',
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </FormControl>
              </form>

              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColor} fontWeight="medium">
                  Usted no esta registrado?
                  <LinkB color={titleColor} as="span" ms="5px" fontWeight="bold">
                    <LinkA to="/auth/register">Registrate</LinkA>
                  </LinkB>
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {/* <Box
            display={{ base: 'none', md: 'block' }}
            overflowX="hidden"
            h="100%"
            w="40vw"
            position="absolute"
            right="0px"
          >
            <Box
              bgImage={signInImage}
              w="100%"
              h="100%"
              bgSize="cover"
              bgPosition="50%"
              position="absolute"
              borderBottomLeftRadius="20px"
            ></Box>
          </Box> */}
        </Flex>
      </Flex>
    </>
  );
};
