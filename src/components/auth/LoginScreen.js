import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';

import {
  Box,
  Flex,
  Button,
  FormControl,
  Heading,
  Stack,
  chakra,
  Avatar,
  Link as LinkChackra,
  Input,
  InputGroup,
  InputLeftElement,
  FormHelperText,
  InputRightElement,
  useColorModeValue,
  Text,
  Icon,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import BgLight from '../../assets/img/bg_1.png';
import BgBlack from '../../assets/img/bg_black.png';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const LoginScreen = () => {
  // Chakra color mode
  const primaryColor = useColorModeValue('#c53030', 'red.800');
  const textColor = useColorModeValue('black.400', 'white');
  const bg = useColorModeValue(BgLight, BgBlack);
  const bgCard = useColorModeValue("white", "gray.800");
  const buttonColor = useColorModeValue("red", "red");

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [formValues, handleInputChange] = useForm({
    username: '',
    password: '',
  });

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
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundImage={bg}
      backgroundSize={'cover'}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        backgroundColor="whiteAlpha.900"
        boxShadow={'md'}
        px={'3rem'}
        py={'5rem'}
        borderRadius="lg"
        rounded="lg"
        borderTop="6px solid"
        borderColor={primaryColor}
        bg={bgCard}
      >
        <Avatar bg="red.500" />
        <Heading color={primaryColor}>Bienvenido</Heading>
        <Text ms="4px" color={textColor} fontWeight="bold" fontSize="14px" textAlign={'center'}
          >Ingresa tu DNI y tu contraseña.
        </Text>
        <Box minW={{ base: "90%", md: "340px" }}>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <FormControl mt={2} isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input 
                    type="text" 
                    placeholder="Usuario (DNI)" 
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right" textColor={primaryColor}>
                  <Link to="/auth/password/reset">¿Olvidó la Contraseña?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={'md'}
                type="submit"
                variant="solid"
                colorScheme={buttonColor}
                width="full"
                _hover={{
                  bg: 'red.600',
                }}
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          ¿No tienes una cuenta?{" "}
          <LinkChackra color={primaryColor} ms="5px" fontWeight="bold">            
            <Link to="/auth/register">Crear una cuenta</Link>
          </LinkChackra>
        </Box>
      </Stack>
    </Flex>
  );
};
