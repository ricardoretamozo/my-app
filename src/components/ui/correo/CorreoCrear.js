import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  FormControl,
  Input,
  Textarea,
  useColorModeValue,
  Divider,
  FormLabel,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';

import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { createCorreo } from '../../../actions/correo';
import { store } from '../../../store/store';
import { fetchCorreoEnviado, fetchCorreoRecibido } from "../../../actions/correo";
import { getCorreosRecibidos, getCorreosEnviados } from "./index";

export default function CorreoCrear() {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const buttonColor = useColorModeValue('blue', 'gray');

  const { identificador } = useSelector(state => state.auth);
  const personaData = store.getState().persona.rows;
  const dispatch = useDispatch();

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const [indiceCorreo, setIndiceCorreo] = useState({
    idCorreo: null,
    from: {
      idpersona: null,
    },
    to: {
      idpersona: '',
    },
    asunto: '',
    mensaje: '',
    activo: 'A',
    fecha: hoy.toISOString().split('T')[0],
  });

  const fetchCorreoRecibidoData = async () => {
    await fetchCorreoRecibido(identificador).then(res => {
      dispatch(getCorreosRecibidos(res));
    });
  };

  const fetchCorreoEnviadoData = async () => {
    await fetchCorreoEnviado(identificador).then(res => {
      dispatch(getCorreosEnviados(res));
    });
  };

  useEffect(() => {
    if (store.getState().correoRecibido.checking) {
      fetchCorreoRecibidoData();
    }
    if (store.getState().correoEnviado.checking) {
      fetchCorreoEnviadoData();
    }
  });

  const guadarCorreo = e => {
    e.preventDefault();
    e.target.reset();
    var correo = {
      from: {
        idpersona: Number(identificador),
      },
      to: {
        idpersona: indiceCorreo.to.idpersona,
      },
      asunto: indiceCorreo.asunto,
      mensaje: indiceCorreo.mensaje,
      activo: indiceCorreo.activo,
      fecha: indiceCorreo.fecha,
    };
    dispatch(createCorreo(correo))
      .then(() => {
        fetchCorreoRecibidoData();
        fetchCorreoEnviadoData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeDestinatario = value => {
    console.log(value);
    setIndiceCorreo({
      ...indiceCorreo,
      to: { idpersona: value.value },
    });
  };

  return (
    <>
      <Box bg={bg} w={'100%'} borderWidth="1px" borderRadius={'lg'} p={6}>
        <Heading as="h3" pb={4} size="sm">
          Nuevo Mensaje
        </Heading>
        <Divider />
        <form onSubmit={guadarCorreo}>
          <Box bg={bg} color={textColor} mt={4}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Selecciona el Destinatario</FormLabel>
                <Select
                  onChange={handleChangeDestinatario}
                  options={personaData.map(persona => ({
                    value: persona.idpersona,
                    label: persona.nombre,
                  }))}
                  isClearable={true}
                  isSearchable
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  onChange={e =>
                    setIndiceCorreo({
                      ...indiceCorreo,
                      asunto: e.target.value.toUpperCase(),
                    })
                  }
                  variant="flushed"
                  placeholder="Asunto"
                />
              </FormControl>
              <FormControl isRequired>
                <Textarea
                  onChange={e =>
                    setIndiceCorreo({
                      ...indiceCorreo,
                      mensaje: e.target.value,
                    })
                  }
                  placeholder="Escribe el Mensaje..."
                  variant={'flushed'}
                  rows={7}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <Button
                  rightIcon={<FiSend />}
                  _focus={{ boxShadow: 'none' }}
                  variant="solid"
                  colorScheme={buttonColor}
                  color="white"
                  float={'right'}
                  type="submit"
                >
                  Enviar
                </Button>
              </FormControl>
            </VStack>
          </Box>
        </form>
      </Box>
    </>
  );
}
