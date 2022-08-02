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
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
  SimpleGrid,
  Badge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

import { ViewIcon } from '@chakra-ui/icons';

import { fetchIncidenciaDetalles } from '../../../actions/incidencia';
import { fetchHistorialPersona } from '../../../actions/historialpersona'; 
import Moment from 'moment';

const IncidenciaDetalles = props => {
  const colorStatus = useColorModeValue('gray.700', 'white');
  const bgAcordion = useColorModeValue('gray.100', 'gray.600');

  const [openCreate, setOpenCreate] = React.useState(false);

  const [detalleIncidencia, setDetalleIncidencia] = useState([]);
  const [incidenciaHistorial, setIncidenciaHistorial] = useState([]);
  const [incidenciaMotivo, setIncidenciaMotivo] = useState([]);
  const [incidenciaOrigen, setIncidenciaOrigen] = useState([]);
  const [incidenciaOficina, setIncidenciaOficina] = useState([]);
  const [incidenciaOrgano, setIncidenciaOrgano] = useState([]);
  const [incidenciaSede, setIncidenciaSede] = useState([]);
  const [incidenciaPersona, setIncidenciaPersona] = useState([]);
  const [incidenciaPerfilPersona, setIncidenciaPerfilPersona] = useState([]);
  const [incidenciaPersonaAsignado, setIncidenciaPersonaAsignado] = useState([]);
  const [incidenciaPerfilPersonaAsignado, setIncidenciaPerfilPersonaAsignado] = useState([]);
  const [incidenciaUsuarioCargo, setIncidenciaUsuarioCargo] = useState(null)

  

  const obtenerIncideciadetalle = async () => {
    await fetchIncidenciaDetalles(props.rowId).then(incidencia => {
      setDetalleIncidencia(incidencia);
      setIncidenciaHistorial(incidencia.historialIncidencia);
      setIncidenciaMotivo(incidencia.motivo); //
      setIncidenciaOrigen(incidencia.origen); //
      setIncidenciaOficina(incidencia.oficina); //
      setIncidenciaOrgano(incidencia.oficina.organo); //
      setIncidenciaSede(incidencia.oficina.organo.sede); //
      setIncidenciaPersona(incidencia.persona); //
      setIncidenciaPerfilPersona(incidencia.persona.perfilPersona); //
      if (incidencia.historialIncidencia.persona_asignado === null) {
        setIncidenciaPersonaAsignado('');
      } else {
        setIncidenciaPersonaAsignado(incidencia.historialIncidencia.persona_asignado);
        setIncidenciaPerfilPersonaAsignado(
          incidencia.historialIncidencia.persona_asignado.perfilPersona
        );
      }
      fetchHistorialPersona(incidencia.persona.idpersona).then(historial => {
        setIncidenciaUsuarioCargo(historial.cargo.cargo)
      })
    });
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
    obtenerIncideciadetalle();
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
        onClick={handleClickOpenCreate}
        fontSize={'20px'}
        size={'sm'}
        _focus={{ boxShadow: 'none' }}
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
            <Box flex="1" textAlign="center" fontSize={'20px'}>
              <Text as="u">DETALLES DE LA INCIDENCIA</Text>
            </Box>
          </DrawerHeader>
          <DrawerCloseButton _focus={{ boxShadow: 'none' }} />
          <DrawerBody pb={2}>
            <Box flex="1" textAlign="center">
              <SimpleGrid columns={2} spacing={1}>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'}>
                    FECHA Y HORA
                  </Text>
                  <Text fontSize={'13px'}>{Moment(incidenciaHistorial.fecha).format("DD/MM/YYYY - hh:mm:ss")}</Text>
                </Box>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'}>
                    ORIGEN INCIDENCIA
                  </Text>
                  <Text fontSize={'13px'}>{incidenciaOrigen.origen}</Text>
                </Box>
              </SimpleGrid>
            </Box>
            <Box flex="1" textAlign="center" mt={4}>
              <SimpleGrid columns={2} spacing={1}>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'}>
                    MOTIVO INCIDENCIA
                  </Text>
                  <Text fontSize={'13px'}>{incidenciaMotivo.motivo}</Text>
                </Box>
                <Box>
                  <Text fontSize={'14px'} fontWeight={'bold'} mb={-1}>
                    ESTADO INCIDENCIA
                  </Text>
                  <Badge
                    variant={'solid'}
                    fontSize={'11px'}
                    p={0.5}
                    colorScheme={
                      incidenciaHistorial.estadoIncidencia === 'P'
                        ? 'red'
                        : incidenciaHistorial.estadoIncidencia === 'T'
                        ? 'yellow'
                        : 'green'
                    }
                  >
                    {incidenciaHistorial.estadoIncidencia === 'P'
                      ? 'PENDIENTE'
                      : incidenciaHistorial.estadoIncidencia === 'T'
                      ? 'EN TRÁMITE'
                      : 'ATENDIDO'}
                  </Badge>
                </Box>
              </SimpleGrid>
            </Box>
            <Box flex="1" textAlign="center" mt={4}>
              <FormControl>
                <FormLabel
                  fontSize={'14px'}
                  textAlign="center"
                  fontWeight={'bold'}
                >
                  DESCRIPCIÓN DE LA INCIDENCIA
                </FormLabel>
                <Textarea
                  fontSize={'13px'}
                  textColor={'blue.500'}
                  textAlign="center"
                  size={'sm'}
                  rows={3}
                  value={detalleIncidencia.descripcion}
                  state={''}
                  onChange={null}
                  readOnly
                />
              </FormControl>
            </Box>
            {/* Acordion items */}
            <Accordion defaultIndex={[0, 1, 2]} mt={4} allowMultiple>
              <AccordionItem>
                <AccordionButton
                  _focus={{ boxShadow: 'none' }}
                  _expanded={{ bg: bgAcordion, color: colorStatus }}
                >
                  <Box
                    flex="1"
                    fontSize={'14px'}
                    textAlign="center"
                    fontWeight={'bold'}
                  >
                    DETALLES DEL USUARIO
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={2}>
                  <Box flex="1" textAlign="center" fontSize={'13px'}>
                    <SimpleGrid columns={2} spacing={1}>
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
                    <Divider mt={1} mb={1} />
                    <SimpleGrid columns={[2,4,4]} spacing={1}>
                      <Box>
                        <Text fontWeight={'bold'}>SEDE</Text>
                        <Text>{incidenciaSede.sede}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>ORGANO</Text>
                        <Text>{incidenciaOrgano.organo}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>OFICINA</Text>
                        <Text>{incidenciaOficina.oficina}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>CARGO</Text>
                        <Text>{incidenciaUsuarioCargo}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton
                  _focus={{ boxShadow: 'none' }}
                  _expanded={{ bg: bgAcordion, color: colorStatus }}
                >
                  <Box
                    flex="1"
                    textAlign="center"
                    fontWeight={'bold'}
                    fontSize={'14px'}
                  >
                    DETALLES DEL USUARIO ASIGNADO
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={2}>
                  <Box flex="1" textAlign="center" fontSize={'13px'}>
                    <SimpleGrid columns={2} spacing={1}>
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
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme={'blue'} onClick={handleCloseModal}>
              OK
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IncidenciaDetalles;
