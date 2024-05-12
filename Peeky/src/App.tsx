import {Box} from '@chakra-ui/react';
import Home from './layouts/home';
import Backdrop from './layouts/backdrop';
import './App.css';

function App() {

  return (
    <Box>
      <Box position='relative' zIndex={1}>
        <Backdrop />
      </Box>
      <Box position='absolute' top='0' left='0' zIndex={100}>
        <Home />
      </Box>
    </Box>
  )
}

export default App;