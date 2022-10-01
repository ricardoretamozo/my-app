import {
  Box,
  useColorModeValue,
  SimpleGrid,
  chakra,
  Flex,
  Icon,
  Button,
  VStack,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import { ArrowForwardIcon } from '@chakra-ui/icons'

import { BsPerson } from 'react-icons/bs';
import { HiOutlineDocumentReport } from "react-icons/hi"

export default function Inicio() {
  return (
    <>
      <Box 
        borderWidth="1px"
        borderRadius="lg"
        boxShadow={'base'}
        mb={4}
        p={4}
        fontSize={['6px', '12px', '14px', '16px']}
        bg={useColorModeValue('white', 'gray.900')} >
        <SimpleGrid columns={[1, 1, 1]} spacing={5}>
          <Flex
            w="full"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            rounded="lg"
            overflow="hidden"
            justify={'space-between'}
            boxShadow={'base'}
            bgGradient={'linear(to-l, #4b749f, #243748)'}
          >
            <Box py={4} ml={4}>
                <VStack alignItems={'left'} spacing={2}>
                  <chakra.span
                    color="white"
                    _dark={{ color: "white" }}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                   REPORTES POR TÉCNICOS
                  </chakra.span>
                  <Link to='/dashboard/reportes/incidencias-one'>
                    <Button 
                      _focus={{ boxShadow: "none" }} 
                      rightIcon={<ArrowForwardIcon />} 
                      size="sm"
                      _dark={{ color: "gray.200" }}
                      colorScheme='whiteAlpha'
                      variant='solid'
                      >
                      INGRESAR
                    </Button>
                  </Link>
                </VStack>
            </Box>
            <Flex justifyContent="center" alignItems="center" w={20}>
              <Icon as={BsPerson} color="white" boxSize={12} />
            </Flex>
          </Flex>

          <Flex
            w="full"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            rounded="lg"
            overflow="hidden"
            justify={'space-between'}
            boxShadow={'base'}
            bgGradient={'linear(to-l, #456fe8, #3e3b92)'}
          >
            <Box py={4} ml={4}>
                <VStack spacing={2} alignItems={'left'}>
                  <chakra.span
                    color="white"
                    _dark={{ color: "white" }}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    REPORTES POR USUARIOS
                  </chakra.span>
                  <Link to='/dashboard/reportes/incidencias-two'>
                    <Button
                      _focus={{ boxShadow: "none" }}
                      rightIcon={<ArrowForwardIcon />}
                      size={'sm'}
                      _dark={{ color: "gray.200" }}
                      colorScheme='whiteAlpha'
                      variant='solid'>
                      INGRESAR
                    </Button>
                  </Link>
                </VStack>
            </Box>

            <Flex justifyContent="center" alignItems="center" w={20}>
              <Icon as={BsPerson} color="white" boxSize={12} />
            </Flex>
          </Flex>
          <Flex
            w="full"
            bg="white"
            _dark={{ bg: "gray.800", borderWidth: "1px" }}
            rounded="lg"
            overflow="hidden"
            justify={'space-between'}
            boxShadow={'base'}
            bgGradient={'linear(to-l, #43b692, #099773)'}
          >
            <Box py={4} ml={4}>
                <VStack spacing={2} alignItems={'left'}>
                  <chakra.span
                    color="white"
                    _dark={{ color: "white" }}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    REPORTES POR TIEMPO
                  </chakra.span>
                  <Link to='/dashboard/reportes/incidencias-three'>
                    <Button 
                      _focus={{ boxShadow: "none" }}
                      rightIcon={<ArrowForwardIcon />} 
                      size={'sm'}
                      _dark={{ color: "gray.200" }}
                      colorScheme='whiteAlpha' 
                      variant='solid'>
                      INGRESAR
                    </Button>
                  </Link>
                </VStack>
            </Box>

            <Flex justifyContent="center" alignItems="center" w={20}>
              <Icon as={HiOutlineDocumentReport} color="white" boxSize={12} />
            </Flex>
          </Flex>
        </SimpleGrid>
      </Box>
    </>
  );
}