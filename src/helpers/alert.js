import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

export const alertChackra = (icon, message, open, close) => {

    <Alert
    status='success'
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='200px'
    >
    <AlertIcon boxSize='40px' mr={0} />
    <AlertTitle mt={4} mb={4} fontSize='lg'>
        Application submitted!
    </AlertTitle>
    <AlertDescription maxWidth='sm'>
        Thanks for submitting your application. Our team will get back to you soon.
    </AlertDescription>
    </Alert>
};

export const notification = (title, message, type) => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: 'Aceptar',
  });
};

export const timerNotification = title => {
  let timerInterval;

  Swal.fire({
    title: title,
    html: 'Serás redireccionado en <b></b> segundos.',
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer();
        if (content) {
          const b = content.querySelector('b');
          if (b) {
            b.textContent = Swal.getTimerLeft();
          }
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then(result => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer');
    }
  });
};
