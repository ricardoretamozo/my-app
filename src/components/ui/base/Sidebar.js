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
  Link as LinkB,
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
} from 'react-icons/fi';

import { Link as LinkA } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { store } from '../../../store/store';
import { LogOut } from '../../../actions/auth';
import { useDispatch } from 'react-redux';

const LinkItemsCoordinadorInformatico = [
  { name: 'Inicio', icon: FiHome, ruta: '/dashboard/home' },
  { name: 'Incidencias', icon: FiCompass, ruta: '/dashboard/incidencias' },
  { name: 'Incidencias Asignadas', icon: FiCompass, ruta: '/dashboard/incidencias_asignadas' },
  { name: 'Incidencias No Asig.', icon: FiCompass, ruta: '/dashboard/incidencias_no_asignadas' },
  { name: 'Perfiles', icon: FiUsers, ruta: '/dashboard/perfil' },
  { name: 'Sedes', icon: FiServer, ruta: '/dashboard/sedes' },
  { name: 'Organos', icon: FiLayers, ruta: '/dashboard/organos' },
  { name: 'Oficinas', icon: FiAirplay, ruta: '/dashboard/oficinas' },
  { name: 'Usuarios', icon: FiUsers, ruta: '/dashboard/personas' },
  { name: 'Cargos', icon: FiTrello, ruta: '/dashboard/cargos' },
  { name: 'Explore', icon: FiCompass, ruta: '/dashboard/perfil' },
];

const LinkItemsAsistenteInformatico = [
  { name: 'Inicio', icon: FiHome, ruta: '/dashboard/home' },
  { name: 'Incidencias Asignadas', icon: FiCompass, ruta: '/dashboard/incidencias_asignadas' },
  { name: 'Incidencias No Asig.', icon: FiCompass, ruta: '/dashboard/incidencias_no_asignadas' },
  { name: 'Motivos', icon: FiCompass, ruta: '/dashboard/motivos' },
  { name: 'Perfiles', icon: FiUsers, ruta: '/dashboard/perfil' },
  { name: 'Sedes', icon: FiServer, ruta: '/dashboard/sedes' },
  { name: 'Organos', icon: FiLayers, ruta: '/dashboard/organos' },
  { name: 'Oficinas', icon: FiAirplay, ruta: '/dashboard/oficinas' },
  { name: 'Usuarios', icon: FiUsers, ruta: '/dashboard/personas' },
  { name: 'Cargos', icon: FiTrello, ruta: '/dashboard/cargos' },
  { name: 'Explore', icon: FiCompass, ruta: '/dashboard/perfil' },
];

const LinkItemsSoporteTecnico = [
  { name: 'Mis Incidencias', icon: FiCompass, ruta: '/dashboard/soporte/incidencias'},
  { name: 'Cargos', icon: FiTrello, ruta: '/dashboard/cargos' },
  { name: 'Explore', icon: FiCompass, ruta: '/dashboard/perfil' },
];

const LinkItemsUsuarioComun = [
  { name: 'Mis Incidencias', icon: FiCompass, ruta: '/dashboard/usuario/incidencias'},
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
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" color={useColorModeValue('red.700', 'white')} fontWeight="bold">
          Service Desk
        </Text>
        <CloseButton display={{ base: 'flex', md: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>
      {usuario.rol === '[COORDINADOR INFORMATICO]' ? ( 
        LinkItemsCoordinadorInformatico.map(link => (
          <LinkA to={link.ruta}>
            <NavItem as="li" icon={link.icon}>
              {link.name}
            </NavItem>
          </LinkA>
        ))
      ) : usuario.rol === '[ASISTENTE INFORMATICO]' ?  (
        LinkItemsAsistenteInformatico.map(link => (
            <LinkA to={link.ruta}>
              <NavItem as="li" icon={link.icon}>
                {link.name}
              </NavItem>
            </LinkA>
          ))
        ) : usuario.rol === '[SOPORTE TECNICO]' ?  (
          LinkItemsSoporteTecnico.map(link => (
              <LinkA to={link.ruta}>
                <NavItem as="li" icon={link.icon}>
                  {link.name}
                </NavItem>
              </LinkA>
            )) 
        ) : LinkItemsUsuarioComun.map(link => (
          <LinkA to={link.ruta}>
            <NavItem as="li" icon={link.icon}>
              {link.name}
            </NavItem>
          </LinkA>
        )) 
      }
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  
  return (
    <LinkB
      href=""
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        height={50}
        _hover={{
          bg: 'red.600',
          color: 'white',
        }}
        {...rest}
        fontSize={'sm'}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </LinkB>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const usuario = store.getState().auth;
  const dispatch = useDispatch();
  const handleLogout = e => {
    e.preventDefault();
    dispatch(LogOut());
  };
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
      >
        Service Desk
      </Text>

      <HStack spacing={{ base: '2', md: '2', lg: '2' }}>        
        <LinkA to="/dashboard/correos">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiMail />}
            _focus={{ boxShadow: "none" }}
          />
        </LinkA>
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
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
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
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
