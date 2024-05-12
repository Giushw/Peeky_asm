import {
    Box,
    Image
} from '@chakra-ui/react';
import React from 'react';
import Wallp from '../assets/images/wllp.jpg';
// import Rain from '../assets/images/rain.jpg';
// import Blizzard from '../assets/images/blizzard.jpg';

const Backdrop: React.FunctionComponent = () => (
  <Box w='100vw' h='100vh' bg='teal.900'>
    <Image 
      src={Wallp}
      // src={Blizzard}
      alt='Landscape Backdrop'
      objectFit='cover'
      w='100%'
      h='100%' 
    />
  </Box>
);

export default Backdrop;
  