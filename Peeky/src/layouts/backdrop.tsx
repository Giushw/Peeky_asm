import {
    Box,
    Image
} from '@chakra-ui/react';
import React from 'react';
import Wallp from '../assets/images/wllp.jpg'

const Backdrop: React.FunctionComponent = () => (
  <Box w='100vw' h='100vh' bg='teal.900'>
    <Image 
      src={Wallp}
      alt='Landscape Backdrop'
      objectFit='cover'
      w='100%'
      h='100%' 
    />
  </Box>
);

export default Backdrop;
  