import React, { useState } from 'react';
import {
  Box,
  useColorModeValue,
  HStack,
  Input,
  FormLabel,
  FormControl,
  Tabs, TabList, TabPanels, Tab, TabPanel, Button, ButtonGroup, IconButton,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
} from '@chakra-ui/react';

import { store } from '../../../../../store/store';

import Select from 'react-select';
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { timerNotification } from '../../../../../helpers/alert';
import ChartReporteOne from './ChartReporteOne';
import { Filtering } from './ReportOne';
import { fetchReporteTecnicos, fetchReporteTiempo } from '../../../../../actions/reporte';
import { TiempoReporte } from './ReportThree';
import { NavLink } from 'react-router-dom';

export default function TercerReporte() {

  const sedesData = store.getState().sede.rows;

  const [selectedSedeId, setSelectedSedeId] = useState(null);
  const [selectedFechaIncio, setSelectedFechaInicio] = useState(null);
  const [selectedFechaFinal, setSelectedFechaFinal] = useState(null);


  const fechaInicio = Moment().startOf('month').format('yyyy-MM-DDTHH:mm:ss');
  const fechaActual = Moment(new Date()).format('yyyy-MM-DDTHH:mm:ss');
  const fechaActualizada = Moment(fechaActual).add(5 , 'hours').format('yyyy-MM-DDTHH:mm:ss');

  const [reportes, setReportes] = useState([]);
  const [nombreTecnicos, setNombreTecnicos] = useState([]);
  const [totalReportes, setTotalReportes] = useState([]);

  const BuscarFiltros = () => {
    var data = {
      fechaInicio: selectedFechaIncio === null ? fechaInicio : selectedFechaIncio,
      fechaActual: selectedFechaFinal === null ? fechaActualizada : Moment(selectedFechaFinal).add(5, 'hours').format('yyyy-MM-DDTHH:mm:ss'),
      sede: [selectedSedeId]
    }
    fetchReporteTiempo(data).then((res) => {
      setReportes(res.data);
    })
      .then(() => {
        setNombreTecnicos(reportes.map(item => item.usuarioTecnico?.nombre));
        // setTotalReportes(reportes.map(item => item?.total));
      })

    timerNotification('Buscando Registros Tercer Reporte...', 'info', 2000);
  }

  const handleChangeSede = (value) => {
    if (value !== null) {
      var sede = [];
      for (let i=0; i<value.length; i++) {
        sede.push({
            idSede: value[i].value,
          });
      }
      setSelectedSedeId(sede);
    } else {
      setSelectedSedeId(null);
    }
  }

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={'xs'}
        bg={useColorModeValue('white', 'gray.900')}
      >
        <Box px="4" mt="6">
          <Box d="flex" alignItems="baseline">
            <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="/dashboard/home" _hover={{ textDecoration: 'none' }}>
                  <Button size="xs" variant="unstyled" fontWeight={'bold'} color="black">INICIO</Button>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbLink as={NavLink} to="/dashboard/reportes/incidencias-three" _hover={{ textDecoration: 'none' }}>
                  <Button size="xs" variant="unstyled" color="black">REPORTES DE INCIDENCIAS POR TIEMPO DE ATENCIÓN</Button>
              </BreadcrumbLink>
            </Breadcrumb>
          </Box>
        </Box>
        <HStack
          spacing="24px"
          width={'100%'}
          justifyContent={'space-between'}
          px={4}
          mt={6}
          mb={4}
          fontSize={'xs'}
        >
          <FormControl>
            <FormLabel fontSize={'xs'}>FECHA INICIO</FormLabel>
            <Input
              type={'datetime-local'}
              size={'sm'}
              defaultValue={selectedFechaIncio === null ? fechaInicio : selectedFechaIncio}
              onChange={(e) => {
                setSelectedFechaInicio(e.target.value);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={'xs'}>FECHA FINAL</FormLabel>
            <Input
              type={'datetime-local'}
              size={'sm'}
              defaultValue={fechaActual}
              onChange={(e) => {
                setSelectedFechaFinal(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'xs'}>SEDE</FormLabel>
            <Select
              placeholder="SELECCIONE UNA SEDE"
              options={sedesData.map(sede => ({
                value: sede.idSede,
                label: sede.sede,
              }))}
              onChange={handleChangeSede}
              isClearable
              isSearchable
              isMulti
            />
          </FormControl>
        </HStack>
        <HStack w={'100%'} px={4} spacing="24px" justifyContent={'space-between'}>
          <FormControl>
            <ButtonGroup size='sm' isAttached>
              <Button
                size="sm"
                variant='solid'
                pointerEvents="none"
                px="5"
                disabled={selectedSedeId === null}
              >
                BUSCAR REGISTROS
              </Button>
              <IconButton
                onClick={() => BuscarFiltros()}
                variant='solid'
                icon={<SearchIcon />}
                colorScheme="facebook"
                _focus={{ boxShadow: "none" }}
                disabled={selectedSedeId === null}
              />
            </ButtonGroup>
          </FormControl>
        </HStack>

        <HStack
          width={'100%'}
          textAlign={'center'}
          mt={4}
          fontSize={'xs'}
        >
          <Tabs isFitted variant='enclosed' colorScheme='green' w={'100%'}>
            <TabList mb='1em'>
              <Tab _focus={{ boxShadow: "none" }}>
                DATOS 📅
              </Tab>
              <Tab _focus={{ boxShadow: "none" }}>
                GRAFICOS 📊
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TiempoReporte
                  reportes={reportes}
                  nombreTecnicos={nombreTecnicos}
                  totalReportes={totalReportes}
                />
              </TabPanel>
              <TabPanel>
                {/* <ChartReporteOne
                  reportes={reportes}
                  nombreTecnicos={nombreTecnicos}
                  totalReportes={totalReportes}
                /> */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Box>
    </>
  );
}
