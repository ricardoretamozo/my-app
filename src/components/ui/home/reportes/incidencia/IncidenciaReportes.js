import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  useColorModeValue,
  HStack,
  Input,
  FormLabel,
  FormControl,
  Tabs, TabList, TabPanels, Tab, TabPanel, Button, ButtonGroup, IconButton,
} from '@chakra-ui/react';

import { store } from '../../../../../store/store';

import Select from 'react-select';
import { SearchIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { timerNotification } from '../../../../../helpers/alert';
import ChartExample from './ChartExample';
import { Filtering } from './ReportOne';
import { fetchReporteTecnicos } from '../../../../../actions/reporte';

export default function IncidenciaReportes() {

  // const data = store.getState().origenIncidencia.rows;
  const sedesData = store.getState().sede.rows;

  const [selectedSedeId, setSelectedSedeId] = useState(null);
  const [selectedFechaIncio, setSelectedFechaInicio] = useState(null);
  const [selectedFechaFinal, setSelectedFechaFinal] = useState(null);


  const fechaInicio = Moment().startOf('month').format('yyyy-MM-DD');
  const fechaActual = Moment(new Date()).format('yyyy-MM-DD');

  const [reportes, setReportes] = useState([]);
  const [nombreTecnicos, setNombreTecnicos] = useState([]);
  const [totalReportes, setTotalReportes] = useState([]);
  
  const BuscarFiltros = () => {
    var data = {
      fechaInicio: selectedFechaIncio === null ? fechaInicio : selectedFechaIncio,
      fechaActual: selectedFechaFinal === null ? fechaActual : selectedFechaFinal,
      sede : {
        idSede: selectedSedeId,
      }
    }
    fetchReporteTecnicos(data).then((res)=>{
      setReportes(res.data);
    })
    .then(()=>{
      setNombreTecnicos(reportes.map(item => item.usuario?.nombre));
      setTotalReportes(reportes.map(item => item?.total));
    })

    timerNotification('Buscando Registros...', 'info', 2000);
  }

  // React.useMemo(() => {
  //   BuscarFiltros();
  // },[])

  // console.log(nombreTecnicos)

  // CREANDO UN TEMA PARA LA TABLA

  const handleChangeSede = (value) => {
    if (value !== null) {
      setSelectedSedeId(value.value);
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
        <HStack
          spacing="24px"
          width={'100%'}
          justifyContent={'space-between'}
          px={4}
          mt={4}
          mb={4}
          fontSize={'xs'}
        >
        <FormControl>
          <FormLabel fontSize={'xs'}>FECHA INICIO</FormLabel>
          <Input
            type={'date'}
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
              type={'date'}
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
                <Filtering 
                  reportes = { reportes }
                  nombreTecnicos = { nombreTecnicos }
                  totalReportes = { totalReportes }
                />
              </TabPanel>
              <TabPanel>
                <ChartExample 
                  reportes = { reportes }
                  nombreTecnicos = { nombreTecnicos }
                  totalReportes = { totalReportes }
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </HStack>
      </Box>
    </>
  );
}
