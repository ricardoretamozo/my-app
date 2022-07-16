import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { deletePersonaOrgano } from '../actions/personaOrgano';
import { useDispatch } from 'react-redux';

export default function AlertaDialogo(props) {
  const cancelRef = React.useRef();
  console.log(props);
  const dispatch = useDispatch();
  const deletePersonaOrganoId = () => {
    dispatch(deletePersonaOrgano(props.id));
    props.onClose();
  }
  return (
    <>
      <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Estas seguro de eliminar el registro?
            </AlertDialogHeader>

            <AlertDialogBody>Confirmo la acción</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props.onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deletePersonaOrganoId} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
