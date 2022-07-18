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


export default function AlertaDialogo(props) {
  const cancelRef = React.useRef();
  console.log(props);

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
              {props.title}
            </AlertDialogHeader>

            <AlertDialogBody>Confirmo la acción</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props.onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={props.metodo} ml={3}>
                Confirmación
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
