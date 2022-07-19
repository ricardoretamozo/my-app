import React, { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Spacer,
  Text,
  SimpleGrid,
  Badge,
  VStack,
} from '@chakra-ui/react';

import { ViewIcon } from '@chakra-ui/icons';

import { fetchIncidencia } from '../../../actions/incidencia';

const IncidenciaDetalles = props => {
  const [openCreate, setOpenCreate] = React.useState(false);

  const [detalleIncidencia, setDetalleIncidencia] = useState([]);
  const [incidenciaMotivo, setIncidenciaMotivo] = useState([]);
  const [incidenciaOficina, setIncidenciaOficina] = useState([]);
  const [incidenciaOrgano, setIncidenciaOrgano] = useState([]);
  const [incidenciaSede, setIncidenciaSede] = useState([]);
  const [incidenciaPersona, setIncidenciaPersona] = useState([]);
  const [incidenciaPerfilPersona, setIncidenciaPerfilPersona] = useState([]);
  const [incidenciaPersonaAsignado, setIncidenciaPersonaAsignado] = useState([]);
  const [incidenciaPerfilPersonaAsignado, setIncidenciaPerfilPersonaAsignado] = useState([]);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const obtenerIncideciadetalle = async () => {
    handleClickOpenCreate();
    await fetchIncidencia(props.rowId).then(incidencia => {
      setDetalleIncidencia(incidencia);
      setIncidenciaMotivo(incidencia.motivo); //
      setIncidenciaOficina(incidencia.oficina); //
      setIncidenciaOrgano(incidencia.oficina.organo); //
      setIncidenciaSede(incidencia.oficina.organo.sede); //
      setIncidenciaPersona(incidencia.persona); //
      setIncidenciaPerfilPersona(incidencia.persona.perfilPersona); //
      if (incidencia.persona_asignado === null){
        setIncidenciaPersonaAsignado("USUARIO NO ASIGNADO");
      }else{
        setIncidenciaPersonaAsignado(incidencia.persona_asignado);
        setIncidenciaPerfilPersonaAsignado(incidencia.persona_asignado.perfilPersona);
      }
    });
  };

  const handleCloseModal = () => {
    setOpenCreate(false);
  };

  return (
    <>
      <IconButton
        icon={<ViewIcon />}
        variant={'outline'}
        colorScheme={'blue'}
        onClick={obtenerIncideciadetalle}
        fontSize={'22px'}
        size={'sm'}
      />

      <Drawer
        isOpen={openCreate}
        onClose={handleCloseModal}
        closeOnOverlayClick={true}
        size={'xl'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <HStack>
              <Text>DETALLES DE LA INCIDENCIA</Text>
              <Text fontWeight={'normal'}>{detalleIncidencia.idIncidencia}</Text>
            </HStack>
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody pb={6}>
            <Flex> 
              <Text fontWeight={'bold'}>FECHA DE CREACIÓN DE LA INCIDENCIA</Text>
              <Spacer />
              <Text>{detalleIncidencia.fecha}</Text>
            </Flex>
            <VStack spacing={'10px'}>
              <HStack spacing={20} mt={4} w={'100%'}>
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>MOTIVO</FormLabel>
                  <Input size={'sm'} value={incidenciaMotivo.motivo} state={''} onChange={null} readOnly />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={'bold'}>ESTADO</FormLabel>
                  <Badge size={'lg'} borderRadius={'sm'} fontSize='1rem' colorScheme={detalleIncidencia.estado === 'P' ? 'gray' : 'green'}>
                  {detalleIncidencia.estado === 'P' ? 'PENDIENTE' : 'SOLUCIONADO'}
                  </Badge>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel fontWeight={'bold'}>DESCRIPCIÓN DE LA INCIDENCIA</FormLabel>
                <Textarea size={'sm'} value={detalleIncidencia.descripcion} state={''} onChange={null} readOnly />
              </FormControl>
            </VStack>
            {/* Acordion items */}
            <Accordion defaultIndex={[0]} mt={4} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" ml={0}  textAlign="left" fontWeight={'bold'}>
                      DETALLES DEL USUARIO
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={5}>
                      <Box>
                          <Text fontWeight={'bold'}>NOMBRES</Text>
                          <Text>{incidenciaPersona.nombre}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>APELLIDOS</Text>
                          <Text>{incidenciaPersona.apellido}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>DNI</Text>
                          <Text>{incidenciaPersona.dni}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                          <Text>{incidenciaPerfilPersona.perfil}</Text>
                      </Box>
                    </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" ml={0}  textAlign="left" fontWeight={'bold'}>
                      DETALLES DE SEDE, ORGANO, OFICINA
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={4}>
                      <Box>
                          <Text fontWeight={'bold'}>SEDE</Text>
                          <Text>{incidenciaSede.sede}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>ORGANO</Text>
                          <Text>{incidenciaOrgano.organo}</Text>
                      </Box>
                    </SimpleGrid>
                    <Box mt={4}>
                        <Text fontWeight={'bold'}>OFICINA</Text>
                        <Text>{incidenciaOficina.oficina}</Text>
                    </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" ml={0}  textAlign="left" fontWeight={'bold'}>
                      DETALLES DEL USUARIO ASIGNADO
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <SimpleGrid columns={2} spacing={5}>
                      <Box>
                          <Text fontWeight={'bold'}>NOMBRES</Text>
                          <Text>{incidenciaPersonaAsignado.nombre}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>APELLIDOS</Text>
                          <Text>{incidenciaPersonaAsignado.apellido}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>DNI</Text>
                          <Text>{incidenciaPersonaAsignado.dni}</Text>
                      </Box>
                      <Box>
                          <Text fontWeight={'bold'}>PERFIL PERSONA</Text>
                          <Text>{incidenciaPerfilPersonaAsignado.perfil}</Text>
                      </Box>
                    </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
             
            </Accordion>
          </DrawerBody>
          <DrawerFooter>
            {/* <Button type={'submit'} colorScheme={'blue'} autoFocus mr={3}>
              Guardar
            </Button> */}
            <Button colorScheme={'blue'} onClick={handleCloseModal}>OK</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IncidenciaDetalles;
