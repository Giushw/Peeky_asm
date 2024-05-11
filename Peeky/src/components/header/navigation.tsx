import {
  Flex,
  Box,
  Spacer,
  Image,
  Center
} from '@chakra-ui/react';
import React from 'react';
import Logo from '../../assets/logo.svg';
import LogoType from '../../assets/logoType.svg';
import Search from './search';

const Navigation: React.FunctionComponent = () => (
  <Flex>
    <Box bg='trasparent'>
      <Flex>
        <Box p='4' boxSize='100px'>
          <Image 
            src={Logo}
            alt='Peeky Logo'
            objectFit='cover'
          />
        </Box>
        <Center p='4' w='200px' h='100px'>
          <Image 
            src={LogoType}
            alt='Peeky LogoType'
            objectFit='cover'
          />
        </Center>
      </Flex>
    </Box>
    <Spacer />
    <Search />
  </Flex>
);

export default Navigation;
