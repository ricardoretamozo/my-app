import React, { useState, useEffect } from 'react';
import {
    Heading,
    Text,
    VStack,
    HStack,
    Avatar,
    Box,
    useColorModeValue,
    Input,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Icon,
    Center,
    Select,
    Divider,
    SimpleGrid
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';

import { RiFileInfoFill } from 'react-icons/ri';
import { fetchHistorialPersona } from '../../../actions/historialpersona';

const Profile = () => {

    const { identificador } = useSelector(state => state.auth);

    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosPerfilUsuario, setDatosPerfilUsuario] = useState([]);
    const [sedeUsuario, setSedeUsuario] = useState([]);
    const [organoUsuario, setOrganoUsuario] = useState([]);
    const [oficinaUsuario, setOficinaUsuario] = useState([]);
    const [cargoUsuario, setCargoUsuario] = useState([]);

    const obtenerMisDatos = async () => {
        await fetchHistorialPersona(identificador).then(historial => {
            console.log(historial);
            setDatosUsuario(historial?.persona);
            setDatosPerfilUsuario(historial?.persona.perfilPersona);
            setSedeUsuario(historial?.oficina.organo.sede);
            setOrganoUsuario(historial?.oficina.organo);
            setOficinaUsuario(historial?.oficina);
            setCargoUsuario(historial?.cargo);
        })
    }

    useEffect(() => {
        obtenerMisDatos();
     }, []) 

    return (
        <>
            <Box
                borderRadius="md"
                overflow="hidden"
                boxShadow={'xs'}
                w="100%"
                bg={useColorModeValue('white', 'gray.900')}
            >
                <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                        <AccordionButton _expanded={{ bg: 'facebook.600', color: 'white' }} _focus={{ boxShadow: "none" }}>
                            <Box flex='1' textAlign='left'>
                                <HStack spacing={2}>
                                    <Icon as={RiFileInfoFill} />
                                    <Heading size={'sm'} fontWeight="extrabold">MIS DATOS</Heading>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Box
                                overflow="hidden"
                                w="100%"
                                bg={useColorModeValue('white', 'gray.900')}
                                px={4}
                                py={5}
                            >
                                <VStack spacing={4} w="100%">
                                    <Avatar size={'xl'} name={datosUsuario.nombre + ' ' + datosUsuario.apellido} />
                                    <Text fontWeight={'extrabold'}>MIS DATOS ACTUALES</Text>
                                    <Center w="100%">
                                        <Box flex="1" textAlign="center" fontSize={'13px'}>
                                            <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
                                                <Box>
                                                    <Text fontWeight={'bold'}>NOMBRES</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.nombre} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>APELLIDOS</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.apellido} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>DNI</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.dni} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                                                    <Select textAlign={'center'} size="xs" defaultValue={datosPerfilUsuario ? datosPerfilUsuario.idPerfilUsuario : ''} isReadOnly>

                                                        <option>{datosPerfilUsuario.perfil}</option>

                                                    </Select>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>NUMERO DE CELULAR</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.celular} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>CORREO ELECTRÓNICO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={datosUsuario.correo} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>FECHA NACIMIENTO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="date" size="xs" defaultValue={datosUsuario.fecha} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>SEXO</Text>
                                                    <Select textAlign={'center'} size="xs" defaultValue={datosUsuario.sexo} isReadOnly>
                                                        <option value={datosUsuario.sexo}>{datosUsuario.sexo === 'M' ? 'MASCULINO': 'FEMEMINO'}</option>
                                                    </Select>
                                                </Box>
                                            </SimpleGrid>
                                            <Divider mt={4} mb={1} />
                                            <Divider mt={4} mb={1} />
                                            <SimpleGrid columns={[1, 2, 3, 4]} spacing={1}>
                                                <Box>
                                                    <Text fontWeight={'bold'}>SEDE</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={sedeUsuario.sede} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>ORGANO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={organoUsuario.organo} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>OFICINA</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={oficinaUsuario.oficina} readOnly/>
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>CARGO</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" defaultValue={cargoUsuario.cargo} readOnly/>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                    </Center>
                                </VStack>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>

                    {/* <AccordionItem>
                        <AccordionButton _expanded={{ bg: 'facebook.600', color: 'white' }} _focus={{ boxShadow: "none" }}>
                            <Box flex='1' textAlign='left'>
                                <HStack spacing={2}>
                                    <Icon as={RiFileEditFill} />
                                    <Heading size={'sm'} fontWeight="extrabold">ACTUALIZAR MI CONTRASEÑA</Heading>
                                </HStack>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Box
                                overflow="hidden"
                                w="100%"
                                bg={useColorModeValue('white', 'gray.900')}
                                px={4}
                            >
                                <VStack spacing={4} w="100%">
                                    <Text fontWeight={'extrabold'}>ACTUALIZAR MI CONTRASEÑA</Text>
                                    <Center w="100%">
                                        <Box flex="1" textAlign="center" fontSize={'13px'}>
                                            <SimpleGrid columns={[1, 3]} spacing={10}>
                                                <Box>
                                                    <Text fontWeight={'bold'}>CONTRASEÑA ACTUAL</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>CONTRASEÑA NUEVA</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" />
                                                </Box>
                                                <Box>
                                                    <Text fontWeight={'bold'}>REPETIR CONTRASEÑA</Text>
                                                    <Input textAlign={'center'} variant='flushed' type="text" size="xs" />
                                                </Box>
                                            </SimpleGrid>
                                            <Button mt={4} colorScheme={'facebook'} size={'sm'}>ACTUALIZAR</Button>
                                        </Box>
                                    </Center>
                                </VStack>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem> */}
                </Accordion>
            </Box>
        </>
    );
};

export default Profile;
