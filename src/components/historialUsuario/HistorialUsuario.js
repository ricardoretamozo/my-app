import React, { useRef } from 'react';
import {
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
  Box,
  SimpleGrid,
  Center,
  Avatar,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { fetchOficina, fetchOficinas } from '../../actions/oficina';
import { fetchHistorialPersona } from '../../actions/historialpersona';
import { updatePersona } from '../../actions/persona';
import { getOficina } from '../../components/ui/oficina/oficina';
import { fetchCargo } from '../../actions/cargo';
import { LogOut } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ModalHistorialUsuario from './ModalHistorialUsuario';
import { store } from '../../store/store';
import { useHistory } from 'react-router-dom';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoIosArrowDropupCircle } from 'react-icons/io';

export default function HistorialUsuario() {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);
  const { identificador } = useSelector(state => state.auth);
  const history = useHistory();
  const [oficina, setOficina] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [historialpersona, setHistorialPersona] = useState(null);
  const [persona, setPersona] = useState(null);
  const [openCreate, setOpenCreate] = useState(true);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectCodicional, setSelectCodicional] = useState(false);

  const [indice, setIndice] = useState({
    correo: null,
    celular: null,
    telefono: null,
    anexo: null,
    password: '',
    perfilPersona: {
      idPerfilPersona: null,
    },
  });

  const fetchDataOficina = () => {
    fetchOficinas().then(res => {
      getOficina(res);
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

  const obtenerOficina = () => {
    if (historialpersona) {
      fetchOficina(historialpersona.oficina.idOficina).then(res => {
        setOficina(res);
      });
    }
  };

  const obtenerCargo = () => {
    if (historialpersona) {
      fetchCargo(historialpersona.cargo.idCargo).then(res => {
        setCargo(res);
      });
    }
  };

  const obtenerHistorialPersona = () => {
    fetchHistorialPersona(identificador).then(res => {
      if (res !== false) {
        setSelectCodicional(false);
        setOpenCreate(false);
        setHistorialPersona(res);
        setCargo(res?.cargo);
        setOficina(res?.oficina);
        setPersona(res?.persona);
      } else {
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

  const handleOpenSelect = (e) => {
    if (e.target.value === 'true') {
      setOpenCreate(true);
    } else {
      setOpenCreate(false);
    }
  }

  function Next() {
    history.push("/dashboard/usuario/incidencias");
  }

  function Back() {
    history.push("/dashboard/usuario");
  }

  const handleCloseModal = () => {
    setOpenCreate(false);
    obtenerHistorialPersona();
    obtenerOficina();
    obtenerCargo();
  };

  useEffect(() => {
    if (oficina == null) {
      obtenerOficina();
    }
    if (cargo == null) {
      obtenerCargo();
    }
    if (historialpersona == null) {
      obtenerHistorialPersona();
    } else {
      console.log('no');
    }

  }, []);

  const handleUpdatePersona = () => {
    var dataPersona = {
      idpersona: persona.idpersona,
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
      usuario: persona.usuario,
      password: indice.password,
      correo: indice.correo === null ? persona.correo : indice.correo,
      celular: indice.celular === null ? persona.celular : indice.celular,
      telefono: indice.telefono === null ? persona.telefono : indice.telefono,
      anexo: indice.anexo === null ? persona.anexo : indice.anexo,
      fecha: persona.fecha,
      sexo: persona.sexo,
      activo: persona.activo,
      perfilPersona: {
        idPerfilPersona: persona.perfilPersona.idPerfilPersona,
      },
    }
    dispatch(updatePersona(dataPersona))
      .then(() => {
        console.log(indice);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const inputRefPassword = useRef(null);
  const inputRefCorreo = useRef(null);
  const inputRefCelular = useRef(null);
  const inputRefTelefono = useRef(null);
  const inputRefAnexo = useRef(null);

  const SelectUpdateData = (e) => {
    if (e.target.value === 'true') {
      setOpenSelect(true);
    } else {
      setOpenSelect(false);
      inputRefPassword.current.value = "";
      inputRefCorreo.current.value = persona?.correo === "" ? "@pj.gob.pe" : persona?.correo;
      inputRefCelular.current.value = persona?.celular;
      inputRefTelefono.current.value = persona?.telefono;
      inputRefAnexo.current.value = persona?.anexo;
    }
  }

  return (
    <>
      <Stack
        direction={'column'}
        p={4}
        w={'full'}
        h={'100%'}
        justify='space-between'
        spacing={4}
        align={'center'}
        bg={'white'}
      >
        {/* <Stack direction={'column'} w={'full'} h={'full'} boxShadow={'base'} borderColor="gray.100" borderWidth="1px" bg="gray.50" borderRadius="lg" p={4}>
          <Box flex="1" w="100%" textAlign="center" justify="center" alignItems="center">
              <Text fontWeight={'bold'} mb="2">{historialpersona === null
                    ? 'USUARIO NUEVO, TIENES QUE AGREGAR NUEVO REGISTRO'
                    : 'QUIERES CAMBIAR SEDE, ORGANO, OFICINA Ó CARGO?'}
              </Text>
            <HStack flex="1" alignItems="center" justify="center">
                <Select
                  w="sm"
                  value={selectCodicional ? selectCodicional : false}
                  isDisabled={historialpersona === null ? true : false}
                  onChange={(e) => handleOpenSelect(e)}
                  
                  // onChange={e => {
                  //   setSelectCodicional(e.target.value === 'true' ? true : false);
                  // }}
                >
                  <option value={true}>SI</option>
                  <option value={false}>NO</option>
                </Select>
            </HStack>
            <ModalHistorialUsuario
              cerrar={handleCloseModal}
              abrir={openCreate}
              oficina={null}
              cargo={null}
              idPersona={identificador}
              listarHistorialPersona={obtenerHistorialPersona}
              handleClick={Next}
              editar={oficina ? true : false}
            />
          </Box>
        </Stack> */}
        <VStack spacing={4} w={'100%'} h={'full'} color="white" bg="gray.700" pb={4} py={5} boxShadow="base" borderRadius={'lg'}>
        <Box flex="1" w="100%" textAlign="center" justify="center" alignItems="center" py={2}>
              <Text fontWeight={'bold'} mb="2">{historialpersona === null
                    ? 'ERES USUARIO NUEVO, TIENES QUE AGREGAR NUEVO REGISTRO'
                    : 'DESEA ACTUALIZAR SU SEDE, ORGANO, OFICINA Ó CARGO?'}
              </Text>
            <HStack flex="1" alignItems="center" justify="center">
                <Select
                  color={'gray.700'}
                  bg={'gray.50'}
                  w="sm"
                  value={selectCodicional ? selectCodicional : false}
                  isDisabled={historialpersona === null ? true : false}
                  onChange={(e) => handleOpenSelect(e)}
                  
                  // onChange={e => {
                  //   setSelectCodicional(e.target.value === 'true' ? true : false);
                  // }}
                >
                  <option value={true}>SI</option>
                  <option value={false}>NO</option>
                </Select>
            </HStack>
            <ModalHistorialUsuario
              cerrar={handleCloseModal}
              abrir={openCreate}
              oficina={null}
              cargo={null}
              idPersona={identificador}
              listarHistorialPersona={obtenerHistorialPersona}
              handleClick={Next}
              handleBack={Back}
              editar={oficina ? true : false}
            />
          </Box>
          <Box mt={4} mb={5}>
            <Center>
              <Avatar
                size={'xl'}
                color={'white'}
                fontWeight={'bold'}
                bg={'gray.600'}
                name={historialpersona === null ? name : persona?.nombre + ' ' + persona?.apellido}
              />
            </Center>
            <Heading
              textTransform={'uppercase'}
              fontSize={'2xl'}
              color={useColorModeValue('gray.100', 'gray.800')}
              mt={2}
            >
              {historialpersona === null ? name : persona?.nombre + ' ' + persona?.apellido}
            </Heading>
          </Box>
          
          <Box flex="1" mt={4} mb={4} w={'100%'}>
            <SimpleGrid columns={[1, 1, 2, 4]} spacing={1} textAlign="center">
            {/* <FormControl>
                    <FormLabel fontSize={'sm'}>CORREO</FormLabel>
                    <Input
                      type="email"
                      ref={inputRefCorreo}
                      defaultValue={persona?.correo === "" ? "@pj.gob.pe" : persona?.correo}
                      readOnly={openSelect === false ? true : false}
                      onChange={e => setIndice({ ...indice, correo: e.target.value })}
                    />
                  </FormControl> */}
              <Box>
                <Text color={'gray.100'} fontWeight="bold">SEDE</Text>
                <Text color={'gray.200'} fontWeight="light">{oficina ? oficina.organo?.sede.sede : ''}</Text>
              </Box>
              <Box>
                <Text color={'gray.100'} fontWeight="bold">ORGANO</Text>
                <Text color={'gray.200'} fontWeight="light">{oficina ? oficina.organo?.organo : ''}</Text>
              </Box>
              <Box>
                <Text color={'gray.100'} fontWeight="bold">OFICINA</Text>
                <Text color={'gray.200'} fontWeight="light">{oficina ? oficina?.oficina : ''}</Text>
              </Box>
              <Box>
                <Text color={'gray.100'} fontWeight="bold">CARGO</Text>
                <Text color={'gray.200'} fontWeight="light">{cargo ? cargo.cargo : ''}</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
        <Stack spacing={4} direction={'column'} w={'full'} h={'full'} boxShadow="base" borderColor="gray.100" borderWidth="1px" bg="gray.50" borderRadius="lg" p={4} py={10}>
          {historialpersona !== null ? (
            <>
              <Box flex="1" w="100%" textAlign="center" justifyItems="center" alignItems="center" alignContent="center">
                <Text fontWeight="bold" mb={2}>DESEA ACTUALIZAR SUS DATOS DE CONTACTO?</Text>
                <HStack flex="1" alignItems="center" justify="center">
                  <Select
                    w="sm"
                    value={openSelect ? openSelect : false}
                    onChange={(e) => SelectUpdateData(e)}
                  >
                    <option value={true}>SI</option>
                    <option value={false}>NO</option>
                  </Select>
                </HStack>
              </Box>
              <Stack spacing={'10px'} direction={'column'} mt={5} w={'full'} justify="center">
                <SimpleGrid columns={[1, 2, 2, 4]} spacing={2} justifyContent="center">
                  <FormControl>
                    <FormLabel fontSize={'sm'}>CORREO</FormLabel>
                    <Input
                      type="email"
                      ref={inputRefCorreo}
                      defaultValue={persona?.correo === "" ? "@pj.gob.pe" : persona?.correo}
                      readOnly={openSelect === false ? true : false}
                      onChange={e => setIndice({ ...indice, correo: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'sm'}>CELULAR</FormLabel>
                    <Input
                      type="text"
                      ref={inputRefCelular}
                      defaultValue={persona ? persona.celular : ''}
                      readOnly={openSelect === false ? true : false}
                      onChange={e => setIndice({ ...indice, celular: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'sm'}>TELÉFONO</FormLabel>
                    <Input
                      type="text"
                      ref={inputRefTelefono}
                      defaultValue={persona ? persona.telefono : ''}
                      readOnly={openSelect === false ? true : false}
                      onChange={e => setIndice({ ...indice, telefono: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'sm'}>ANEXO</FormLabel>
                    <Input
                      type="text"
                      ref={inputRefAnexo}
                      defaultValue={persona ? persona.anexo : ''}
                      readOnly={openSelect === false ? true : false}
                      onChange={e => setIndice({ ...indice, anexo: e.target.value })}
                    />
                  </FormControl>
                </SimpleGrid>
                <Stack direction={'column'} alignItems="center" justify="center">
                  <FormControl hidden={openSelect === false ? true : false} w={'sm'}>
                    <FormLabel fontSize={'sm'}>CONFIRMAR SU CONTRASEÑA</FormLabel>
                    <Input
                      type="password"
                      ref={inputRefPassword}
                      onChange={e => setIndice({ ...indice, password: e.target.value })}
                    />
                  </FormControl>
                  <Button
                    w={'sm'}
                    alignContent="center"
                    colorScheme={'facebook'}
                    hidden={openSelect === false}
                    disabled={indice.password === '' || indice.password.length <= 6 ? true : false}
                    _focus={{ boxShadow: "none" }}
                    onClick={handleUpdatePersona}
                  >
                    ACTUALIZAR
                  </Button>
                </Stack>
              </Stack>
            </>
          ) : (null)}
        </Stack>
        <HStack
          w={'full'}
          h={'full'}
          direction='row'
          spacing={4}
          justify={['center', 'center', 'center', 'flex-end']}
          position={'relative'}
        >
          <IconButton
            w="150px"
            size={'md'}
            icon={<IoIosArrowDropleftCircle size="25px" />}
            bg="gray.600"
            color="white"
            fontSize="sm"
            _hover={{ bg: 'gray.700' }}
            _focus={{ boxShadow: "none" }}
            onClick={() => handleLogout()}
          />
          <IconButton
            w="150px"
            size={'md'}
            icon={historialpersona === null ? <IoIosArrowDropupCircle size="25px" /> : <IoIosArrowDroprightCircle size="25px" />}
            bg="gray.600"
            color="white"
            fontSize="sm"
            _hover={{ bg: 'gray.700' }}
            _focus={{ boxShadow: "none" }}
            onClick={() => handleChangeSelect()}         
          />
        </HStack>
      </Stack>
    </>
  );
}
