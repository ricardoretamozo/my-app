import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
