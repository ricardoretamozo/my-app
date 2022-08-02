import React, { useState } from 'react';
import {
    Button,
    IconButton,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogCloseButton,
} from '@chakra-ui/react';

import { VscAdd } from 'react-icons/vsc'

import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidenciaSoporte, asignarIncidencia } from '../../../../actions/incidencia';
import { getIncidenciasAsignadasSoporte } from './incidencia';

const IncidenciaAsignarme = (props) => {

    const [openAlert, setOpenAlert] = useState(false);
    const { identificador } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [idIncidencia, setIndiceIncidencia] = useState(null);

    const handleClickCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleClickOpenAlert = (index) => {
        setIndiceIncidencia(index);
        setOpenAlert(true);
    }

    const fetchDataIncidencias = async () => {
        await fetchIncidenciaSoporte(identificador).then((res) => {
            dispatch(getIncidenciasAsignadasSoporte(res));
        });
    }

    const AsignarmeIncidencia = () => {
        var incidencia = {
          idIncidencia: idIncidencia,
          historialIncidencia: {
            persona_registro: {
              idpersona: Number(identificador)
            },
            persona_asignado: {
              idpersona: Number(identificador),
            }
          }
        }
        dispatch(asignarIncidencia(incidencia))
          .then(() => {
            setOpenAlert(false);
            fetchDataIncidencias();
          }).catch((error) => {
            console.log(error);
          })
      }

    return (
        <>
            <IconButton
                icon={<VscAdd />}
                variant={'solid'}
                colorScheme={'blue'}
                onClick={() => handleClickOpenAlert(props.rowId)}
                fontSize='20px'
                size={'sm'}
                ml={1}
                _focus={{ boxShadow: "none" }}
            />

            {/* CONFIRMAR PARA ASIGNARSE A EL MISMO LA INCIDENCIA */}

            <AlertDialog isOpen={openAlert} onClose={handleClickCloseAlert} size={'3xl'}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="xl" fontWeight="bold">
                            ¿ASIGNARME LA INCIDENCIA A MI PERSONA?
                        </AlertDialogHeader>
                        <AlertDialogCloseButton _focus={{ boxShadow: "none" }} />
                        <AlertDialogBody>
                                ¿CONFIRMAR LA ACCIÓN?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={handleClickCloseAlert} _focus={{ boxShadow: "none" }}>CANCELAR</Button>
                            <Button
                                colorScheme="blue"
                                ml={3}
                                _focus={{ boxShadow: "none" }}
                                onClick={() => AsignarmeIncidencia()}
                            >
                                CONFIRMAR
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default IncidenciaAsignarme;
