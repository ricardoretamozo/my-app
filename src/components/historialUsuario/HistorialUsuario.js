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
import { useHistory } from 'react-router-dom';

export default function HistorialUsuario() {
  const { name } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { identificador } = useSelector(state => state.auth);
  const history = useHistory();
  const [oficina, setOficina] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [historialpersona, setHistorialPersona] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  // setTimeout(() => {
  //   setOpenCreate(true);
  // },  100);

  const fetchDataOficina= async ()=> {
    await fetchOficinas().then((res)=>{
      dispatch(getOficina(res));
    });
    
  }
  if (historialpersona === null){
    setTimeout(() => {
      setOpenCreate(true);
    },  1500);
  }

  // historialpersona === null ? setTimeout(() => {
  //   setOpenCreate(true)
  // }, 1500) : setTimeout(() => {
  //   setOpenCreate(false);
  // },  0);

  useEffect(() => {
    if(store.getState().oficina.rows.length <= 0){
      fetchDataOficina();
    }
    //fetchData();
  });

  const handleLogout = () => {
    dispatch(LogOut());
  };

  const obtenerOficina = async() => {
    await fetchOficina(historialpersona.oficina.idOficina).then(res => {
      dispatch(setOficina(res));
    })
  }

  const obtenerCargo = async() => {
    await fetchCargo(historialpersona.cargo.idCargo).then(res => {
      dispatch(setCargo(res));
    })
  }

  const obtenerHistorialPersona = async() => {
    console.log(identificador);
    await fetchHistorialPersona(identificador).then(res => {
      dispatch(setHistorialPersona(res));
      console.log(res);
    })
  }

   const [selectCodicional, setSelectCodicional] = useState(historialpersona === false ? "false" : "true" );

   //console.log(selectCodicional);

  const handleChangeSelect = () => {
    console.log(selectCodicional);
    if ( selectCodicional == "true") {
        setOpenCreate(true)
    }else if (selectCodicional == "false") {
      // dispatch(startLogin(dni , 'cocacola'));
      history.push('/dashboard/home');
    }
  }

  const handleCloseModal = () => {
    setOpenCreate(false);
   // history.push('/dashboard/home');
  }

  useEffect(() => {
    if (oficina == null) {
      obtenerOficina();
    }
    if (cargo == null) {
      obtenerCargo();
    }
    if (historialpersona == null) {
      obtenerHistorialPersona();
    }
  });

  // console.log(oficina);
  // console.log(historialpersona);

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
            {historialpersona === false ? 'PARA CONTINUAR DEBERÁ AGREGAR NUEVO REGISTRO': 'VALIDAR SI VA A CONTINUAR CON EL REGISTRO O DESEA ACTUALIZARLO'}
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
            <FormLabel>{historialpersona === false ? 'ERES USUARIO NUEVO, TIENES QUE AGREGAR NUEVO REGISTRO': 'QUIERES CAMBIAR SEDE, ORGANO, OFICINA Ó CARGO?'}</FormLabel>
            <Select 
            defaultValue={ true }
            isDisabled={ historialpersona === false ? true : false}
            onChange={(e)=> {setSelectCodicional(e.target.value) }}
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

          <ModalHistorialUsuario cerrar={handleCloseModal}
            abrir={openCreate} oficina = {oficina} cargo = {cargo} idPersona= { identificador } listarHistorialPersona = { obtenerHistorialPersona } />

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