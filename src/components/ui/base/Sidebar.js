import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  useColorMode,
  MenuList,
  Center,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Link,
} from '@chakra-ui/react';

import {
  FiHome,
  FiUsers,
  FiCompass,
  FiMenu,
  FiBell,
  FiMail,
  FiChevronDown,
  FiServer,
  FiLayers,
  FiAirplay,
  FiTrello,
  FiLogOut,
} from 'react-icons/fi';

import { NavLink } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { store } from '../../../store/store';
import { LogOut } from '../../../actions/auth';
import { useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';

const LinkItemsCoordinadorInformatico = [
  { name: 'INICIO', icon: FiHome, ruta: '/dashboard/home' },
  { name: 'INCIDENCIAS', icon: FiCompass, ruta: '/dashboard/incidencias' },
  { name: 'INCIDENCIAS ASIGNADAS', icon: FiCompass, ruta: '/dashboard/incidencias-asignadas' },
  { name: 'INCIDENCIAS NO ASIG.', icon: FiCompass, ruta: '/dashboard/incidencias-no-asignadas' },
  { name: 'MOTIVO INCIDENCIA', icon: FiCompass, ruta: '/dashboard/motivos' },
  { name: 'ORIGEN INCIDENCIA', icon: FiTrello, ruta: '/dashboard/origen-incidencia' },
  { name: 'PERFILES USUARIO', icon: FiUsers, ruta: '/dashboard/perfil' },
  { name: 'SEDE', icon: FiServer, ruta: '/dashboard/sedes' },
  { name: 'ÓRGANOS', icon: FiLayers, ruta: '/dashboard/organos' },
  { name: 'OFICINAS', icon: FiAirplay, ruta: '/dashboard/oficinas' },
  { name: 'USUARIOS', icon: FiUsers, ruta: '/dashboard/personas' },
  { name: 'CARGOS', icon: FiTrello, ruta: '/dashboard/cargos' },
];

const LinkItemsAsistenteInformatico = [
  { name: 'INICIO', icon: FiHome, ruta: '/dashboard/home' },
  { name: 'INCIDENCIAS', icon: FiCompass, ruta: '/dashboard/incidencias' },
  { name: 'INCIDENCIAS ASIGNADAS', icon: FiCompass, ruta: '/dashboard/incidencias-asignadas' },
  { name: 'INCIDENCIAS NO ASIG.', icon: FiCompass, ruta: '/dashboard/incidencias-no-asignadas' },
  { name: 'MOTIVO INCIDENCIA', icon: FiCompass, ruta: '/dashboard/motivos' },
  { name: 'ORIGEN INCIDENCIA', icon: FiTrello, ruta: '/dashboard/origen-incidencia' },
  { name: 'PERFILES USUARIO', icon: FiUsers, ruta: '/dashboard/perfil' },
  { name: 'SEDE', icon: FiServer, ruta: '/dashboard/sedes' },
  { name: 'ÓRGANOS', icon: FiLayers, ruta: '/dashboard/organos' },
  { name: 'OFICINAS', icon: FiAirplay, ruta: '/dashboard/oficinas' },
  { name: 'USUARIOS', icon: FiUsers, ruta: '/dashboard/personas' },
  { name: 'CARGOS', icon: FiTrello, ruta: '/dashboard/cargos' },
];

const LinkItemsSoporteTecnico = [
  { name: 'MIS INCIDENCIAS', icon: FiCompass, ruta: '/dashboard/soporte/incidencias'},
  { name: 'INCIDENCIAS NO ASIGN.', icon: FiCompass, ruta: '/dashboard/incidencias-no-asignadas' },
  { name: 'CARGOS', icon: FiTrello, ruta: '/dashboard/cargos' },
];

const LinkItemsUsuarioComun = [
  { name: 'MIS INCIDENCIAS', icon: FiCompass, ruta: '/dashboard/usuario/incidencias'},
];

export default function SidebarWithHeader({ componente: Component }) {
  
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'none', lg: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 0, lg: 56 }} p="4">
        <Component />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {

  const usuario = store.getState().auth;

  return (
    <>
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 'full', lg: 56 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
          <Text fontSize="2xl" color={useColorModeValue('red.600', 'white')} fontWeight="bold">
            SERVICE DESK
          </Text>
          <CloseButton display={{ base: 'flex', md: 'flex', lg: 'none' }} onClick={onClose} />
        </Flex>
        {usuario.rol === '[COORDINADOR INFORMATICO]' ? ( 
          LinkItemsCoordinadorInformatico.map((link, index) => (
            <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
              <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
                {link.name}
              </NavItem>
            </Link>
          ))
        ) : usuario.rol === '[ASISTENTE INFORMATICO]' ?  (
          LinkItemsAsistenteInformatico.map((link, index) => (
              <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
                <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
                  {link.name}
                </NavItem>
              </Link>
            ))
          ) : usuario.rol === '[SOPORTE TECNICO]' ?  (
            LinkItemsSoporteTecnico.map((link, index) => (
                <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
                  <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
                    {link.name}
                  </NavItem>
                </Link>
              )) 
          ) : LinkItemsUsuarioComun.map((link, index) => (
            <Link as={NavLink} to={link.ruta} key={index} _activeLink={{ color: 'red.600' }} _hover={{ textDecoration: 'none' }}>
              <NavItem icon={link.icon} _hover={{ color: 'white', bg: 'red.600' }}>
                {link.name}
              </NavItem>
            </Link>
          )) 
        }
      </Box>
    </>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  
  return (
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        textDecoration={'none'}
        height={50}
        {...rest}
        fontSize={'xs'}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="14"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const usuario = store.getState().auth;

  return (
    <Flex
      ml={{ base: 4, md: 4, lg: 60 }}
      mr={{ base: 4, md: 4, lg: 4 }}
      px={{ base: 4, md: 4, lg: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderWidth="1px"
      borderRadius={'md'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between', lg: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'flex', lg: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'flex', lg: 'none' }}
        fontSize="2xl"
        fontWeight="bold"
        color={useColorModeValue('red.600', 'white')}
      >
        SERVICE DESK
      </Text>

      <HStack spacing={{ base: '2', md: '2', lg: '2' }}>        
        <Link as={NavLink} to="/dashboard/correos" _activeLink={{ bg: 'red.600', color: 'white', borderRadius: 'md'}}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiMail />}
            _focus={{ boxShadow: "none" }}
            _hover={{ color: 'white', bg: 'red.600' }}
          />
        </Link>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
          _focus={{ boxShadow: "none" }}
        />
        <IconButton 
          size="lg"
          variant="ghost"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          _focus={{ boxShadow: "none" }}
          onClick={toggleColorMode}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/img/favicon.svg'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{usuario.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {usuario.rol}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList 
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              alignItems={'center'}
              bgSize={'md'}
              >
                <Center>
                  <Avatar
                    size={'lg'}
                    src={'https://avatars.dicebear.com/img/favicon.svg'}
                  />
                </Center>
                <Center>
                  <VStack mt="2">
                    <Text fontSize="sm" mx={8}>{usuario.name}</Text>
                    <Text fontSize="xs" color="gray.600">{usuario.rol}</Text>
                  </VStack>
                </Center>
                <MenuDivider />
                <Link as={NavLink} to="/dashboard/mi-perfil" _hover={{ textDecoration: 'none' }}>
                  <MenuItem icon={<FaUser />}>Mi Perfil</MenuItem>
                </Link>
                <ModalCerrarSesion />
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const ModalCerrarSesion = () => {

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleLogout = e => {
    e.preventDefault();
    dispatch(LogOut());
  };
  
  return(
    <>
      <MenuItem onClick={handleOpenModal} icon={<FiLogOut />}>CERRAR SESIÓN</MenuItem>
      <AlertDialog
        motionPreset='slideInBottom'
        onClose={handleCloseModal}
        isOpen={openModal}
        size="lg"
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>CERRAR SESIÓN</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            ¿ESTÁS SEGURO DE CERRAR SESIÓN?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCloseModal}>
              NO
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleLogout}>
              SI
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
