import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  FormLabel,
  HStack,
  Select,
  FormControl,
  Image,
  Box,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { fetchOficina, fetchOficinas } from '../../actions/oficina';
import { fetchHistorialPersona } from '../../actions/historialpersona';
import { getOficina } from '../../components/ui/oficina/oficina';
import { fetchCargo } from '../../actions/cargo';
import { LogOut } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ModalHistorialUsuario from './ModalHistorialUsuario';
import { store } from '../../store/store';
import { useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import imgChange  from '../../assets/img/changeHU.png';

export default function HistorialUsuario() {
  const { name } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);
  const history = useHistory();
  const [oficina, setOficina] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [historialpersona, setHistorialPersona] = useState(null);
  const [openCreate, setOpenCreate] = useState(true);

  const fetchDataOficina = async () => {
    await fetchOficinas().then(res => {
      dispatch(getOficina(res));
    });
  };

  useEffect(() => {
    if (store.getState().oficina.rows.length <= 0) {
      fetchDataOficina();
    }
  });

  const handleLogout = () => {
    dispatch(LogOut());
  };

  const obtenerOficina = async () => {
    if (historialpersona) {
      await fetchOficina(historialpersona.oficina.idOficina).then(res => {
        dispatch(setOficina(res));
      });
    }
  };

  const obtenerCargo = async () => {
    if (historialpersona) {
      await fetchCargo(historialpersona.cargo.idCargo).then(res => {
        dispatch(setCargo(res));
      });
    }
  };

  const [selectCodicional, setSelectCodicional] = useState(null);

  const obtenerHistorialPersona = async () => {
    await fetchHistorialPersona(identificador).then(res => {
      if (res != false) {
        setSelectCodicional(false);
        setOpenCreate(false);
        setCargo(res.cargo);
        setOficina(res.oficina)
        dispatch(setHistorialPersona(res));
      } else{
        setSelectCodicional(true);
      }
    });
  };



  const handleChangeSelect = () => {
    if (selectCodicional === true) {
      setOpenCreate(true);
    } else if (selectCodicional === false) {
      history.push('/dashboard/usuario/incidencias');
    }
  };

  function Next() {
    history.push("/dashboard/usuario/incidencias");
  }

  const handleCloseModal = () => {
    setOpenCreate(false);
    obtenerHistorialPersona();
    obtenerOficina();    
    obtenerCargo();
    // history.push('/dashboard/home');
  };

  useEffect(() => {
    console.log(selectCodicional);  
    if (oficina == null) {
      obtenerOficina();
    }
    if (cargo == null) {
      obtenerCargo();
    }
    if (historialpersona == null) {
      obtenerHistorialPersona();
    } else{
      console.log('no');
    }

  });

  return (
    <Flex
      height={'100vh'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      align={'center'}
      bg={useColorModeValue('gray.200', 'gray.800')}
      px={15}
    >
      <Stack
        boxShadow={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'md'}
        w={'80%'}
        p={14}
        spacing={4}
        align={'center'}
      >

        <Box bg={'gray.100'} p={2} borderRadius="md" boxShadow="md">
          <Image src={imgChange} alt={'imgChange'} w={70} />
        </Box>

        <Stack spacing={2} align={'center'}>
          <Heading
            textTransform={'uppercase'}
            fontSize={'xl'}
            color={useColorModeValue('gray.800', 'gray.200')}
          >
            {name}
          </Heading>
          <Text fontSize={'lg'} color={'gray.800'} textAlign='center'>
            {historialpersona == null
              ? 'PARA CONTINUAR, AGREGAR NUEVO REGISTRO'
              : 'CONTINUAR CON EL REGISTRO O DESEA ACTUALIZAR'}
          </Text>
        </Stack>
        <Stack spacing={4} direction={'column'} w={'full'}>
          <HStack spacing={'10px'} mt={5}>
            <FormControl>
              <FormLabel>SEDE</FormLabel>
              <Input
                type={'text'}
                color={useColorModeValue('gray.800', 'gray.200')}
                bg={useColorModeValue('gray.100', 'gray.600')}
                defaultValue={oficina ? oficina.organo.sede.sede : ''}
                isDisabled
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.800'),
                  outline: 'none',
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>ORGANO</FormLabel>
              <Input
                type={'text'}
                color={useColorModeValue('gray.800', 'gray.200')}
                bg={useColorModeValue('gray.100', 'gray.600')}
                defaultValue={oficina ? oficina.organo.organo : ''}
                isDisabled
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.800'),
                  outline: 'none',
                }}
              />
            </FormControl>
          </HStack>
          <HStack spacing={'10px'} mt={5}>
            <FormControl>
              <FormLabel fontSize={'sm'}>
                OFICINA
              </FormLabel>
              <Input
                type={'text'}
                color={useColorModeValue('gray.800', 'gray.200')}
                bg={useColorModeValue('gray.100', 'gray.600')}
                //value = {oficina ? oficina.oficina : ''}
                defaultValue={oficina ? oficina.oficina : ''}
                isDisabled
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.800'),
                  outline: 'none',
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={'sm'}>
                CARGO
              </FormLabel>
              <Input
                type={'text'}
                color={useColorModeValue('gray.800', 'gray.200')}
                bg={useColorModeValue('gray.100', 'gray.600')}
                //value = {oficina ? oficina.oficina : ''}
                defaultValue={cargo ? cargo.cargo : ''}
                isDisabled
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.800'),
                  outline: 'none',
                }}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>
              {historialpersona === false
                ? 'USUARIO NUEVO, TIENES QUE AGREGAR NUEVO REGISTRO'
                : 'QUIERES CAMBIAR SEDE, ORGANO, OFICINA Ó CARGO?'}
            </FormLabel>
            <Select
              // defaultValue={ true }
              value={selectCodicional}
              isDisabled={historialpersona === null ? true : false}
              onChange={e => {
                setSelectCodicional( e.target.value == 'true' ? true : false );
              }}
            >
              <option value={true}>SI</option>
              <option value={false}>NO</option>
            </Select>
          </FormControl>
          <Button
            bg={'blue.600'}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'blue.700' }}
            _focus={{ bg: 'blue.700', boxShadow: "none" }}
            onClick={() => handleChangeSelect()}
          >
            {historialpersona === false ? 'AGREGAR REGISTRO' : 'CONTINUAR'}
          </Button>

          <ModalHistorialUsuario
            cerrar={handleCloseModal}
            abrir={openCreate}
            oficina={null}
            cargo={null}
            idPersona={identificador}
            listarHistorialPersona={obtenerHistorialPersona}
            handleClick = {Next}
            editar = {oficina ? true : false }
          />

          <Button
            bg={'red.400'}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'red.500' }}
            _focus={{ bg: 'red.500' }}
            onClick={() => handleLogout()}
            rightIcon={<FiLogOut />}
          >
            SALIR
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
