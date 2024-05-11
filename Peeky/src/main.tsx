import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';
import store from './store/store';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
)
