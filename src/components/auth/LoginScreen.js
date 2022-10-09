import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';

import {
  Box,
  Flex,
  Button,
  FormControl,
  Stack,
  chakra,
  Link as LinkChackra,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  Text,
  Icon,
  Image,
  Center,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import BgSignUp from '../../assets/img/fondo.jpg';
import logoPJA from '../../assets/img/csjar.webp';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export const LoginScreen = () => {
  // Chakra color mode
  const primaryColor = useColorModeValue('#c53030', 'red.700');
  const textColor = useColorModeValue('black.400', 'white');
  const bgCard = useColorModeValue("gray.50", "gray.800");
  const buttonColor = useColorModeValue("red", "red");

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [formValues, handleInputChange] = useForm({
    username: '',
    password: '',
  });

  const { username, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(username, password));
  };

  return (
    <>
      <Box flex={"1"} bg="red.700" borderBottomRadius="3xl" boxShadow={'xl'}>
        <Center py={4}>
          <Text color="#999999" fontSize={["md", "2xl", "3xl", "4xl"]} fontWeight="extrabold" textAlign="center" verticalAlign={'center'}>
            SERVICE DESk
          </Text>
        </Center>
      </Box>
      <Flex
        direction="column"
        alignSelf="center"
        justifySelf="center"
        overflow="hidden"
        h={"100%"}
        w={"100%"}
      >
        <Box
          position="absolute"
          h={"100vh"}
          w={"100%"}
          borderRadius={{ md: 'md' }}
          left="0"
          right="0"
          bgRepeat="no-repeat"
          overflow="hidden"
          zIndex="-1"
          bgImg={BgSignUp}
          top="0"
          bgSize="cover"
        >
        </Box>
        <Flex alignItems="center" justifyContent="center" h={"100%"} w={'100%'} mt={"40px"}>
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            backgroundColor="whiteAlpha.900"
            boxShadow={'md'}
            px={'3.5rem'}
            py={'5rem'}
            rounded="xl"
            borderTop="10px solid"
            borderColor={primaryColor}
            bg={bgCard}
          >
            <Box maxW={{ base: "275px", md: "360px" }} borderRadius="md" boxShadow="base" mb={2}>
              <Image py={2} px={2} src={logoPJA} alt="Service Desk" />
            </Box>
            <Text ms="4px" color={textColor} fontWeight="extrabold" fontSize="14px" textAlign={'center'}
            >INGRESE SU DNI Y SU CONTRASEÑA
            </Text>
            <Box minW={{ base: "90%", md: "360px" }}>
              <form onSubmit={handleLogin}>
                <Stack spacing={4}>
                  <FormControl mt={2} isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.400" />}
                      />
                      <Input
                        type="text"
                        placeholder="DNI"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        _focus={{ boxShadow: "none" }}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.400" />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="CONTRASEÑA"
                        name="password"
                        autoComplete='off'
                        value={password}
                        onChange={handleInputChange}
                        _focus={{ boxShadow: "none" }}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick} _focus={{ boxShadow: "none" }}>
                          {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
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
                    fontWeight="extrabold"
                    _focus={{ boxShadow: "none" }}
                  >
                    INICIAR SESIÓN
                  </Button>
                </Stack>
              </form>
            </Box>
            <Box fontSize={'14px'}>
              ¿NO TIENES UNA CUENTA?{" "}
              <LinkChackra color={primaryColor} as={Link} ms="5px" fontWeight="extrabold" to="/auth/register">
                CREAR CUENTA
              </LinkChackra>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
