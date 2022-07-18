import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  FormLabel,
  HStack,
  Select,
  FormControl,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { fetchOficina, fetchOficinas } from '../../actions/oficina';
import { fetchHistorialPersona } from '../../actions/historialpersona';
import { getOficina } from '../../components/ui/oficina/oficina';
import { fetchCargo } from '../../actions/cargo';
import { LogOut, startLogin } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FcSynchronize } from 'react-icons/fc';
import ModalHistorialUsuario from './ModalHistorialUsuario';
import { store } from '../../store/store';
import { useHistory, Redirect, Route } from 'react-router-dom';

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
    //fetchData();
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
    console.log(identificador);
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
    console.log(selectCodicional);
    if (selectCodicional == true) {
      setOpenCreate(true);
    } else if (selectCodicional == false) {
      // dispatch(startLogin(dni , 'cocacola'));
      // <Route path='/dashboard/incidencias'  />
      history.push('/dashboard');
    }
  };

  // const Next = () => {
  //   const history = useHistory();
  //   // history.push('/dashboard/incidencias');
  //   return history.push('/dashboard/incidencias');
  // }

  function Next() {
    history.push("/dashboard/incidencias");
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
      //setSelectCodicional(true);
      //setOpenCreate(true);
    } else{
      //setSelectCodicional(false);
      //setOpenCreate(false);
    }

  });

  return (
    <Flex
      height={'100vh'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      align={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={6}
        px={20}
        spacing={4}
        align={'center'}
      >
        <Icon as={FcSynchronize} w={16} h={16} />
        <Stack spacing={2} align={'center'}>
          <Heading
            textTransform={'uppercase'}
            fontSize={'xl'}
            color={useColorModeValue('gray.800', 'gray.200')}
          >
            {name}
          </Heading>
          <Text fontSize={'lg'} color={'gray.800'}>
            {historialpersona == null
              ? 'PARA CONTINUAR DEBERÁ AGREGAR NUEVO REGISTRO'
              : 'VALIDAR SI VA A CONTINUAR CON EL REGISTRO O DESEA ACTUALIZARLO'}
          </Text>
        </Stack>
        <Stack spacing={4} direction={'column'} w={'full'}>
          <HStack spacing={'10px'} mt={5}>
            <FormControl>
              <FormLabel>Sede</FormLabel>
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
              <FormLabel>Organo</FormLabel>
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
              <FormLabel fontSize={'sm'} fontWeight={'normal'}>
                Oficina
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
              <FormLabel fontSize={'sm'} fontWeight={'normal'}>
                Cargo
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
                console.log(e.target.value);
                setSelectCodicional( e.target.value == 'true' ? true : false );
              }}
            >
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </Select>
          </FormControl>
          <Button
            bg={'blue.400'}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'blue.500' }}
            _focus={{ bg: 'blue.500' }}
            onClick={() => handleChangeSelect()}
          >
            {historialpersona === false ? 'AGREGAR REGISTRO' : 'CONTINUAR'}
          </Button>

          <ModalHistorialUsuario
            cerrar={handleCloseModal}
            abrir={openCreate}
            //se envia oficina y cargo
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
          >
            SALIR
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
