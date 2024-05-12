import {
  Flex,
  Heading,
  Text,
  Highlight,
  Container,
  VStack,
  Collapse,
  useDisclosure
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import Weather from './weather';
  
const Wrapper: React.FunctionComponent = () => {
  const isSearching: boolean = useSelector((s: RootState) => s.searchedCities.isSearching);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  useEffect(() => {
    isSearching ? onOpen() : onClose()
  },[isSearching]);

  return (
    <Flex w='100%' h='100%' align='center' justify='center' p={4} direction='column'>
      <Collapse in={!isOpen} animateOpacity>
        <Splash />
      </Collapse>
      <Collapse in={isOpen} animateOpacity>
        <Weather />
      </Collapse>
    </Flex>
  );
};

export default Wrapper;

const Splash: React.FunctionComponent = () => (
  <Flex maxW='100%' direction='column' align='center' justify='center'>
    <Heading mb='2rem' as='h1' size='4xl' color='teal.500'>
      Look outside the window for me!
    </Heading>
    <Container maxW='70%' >
      <VStack spacing={6}>
        <Text fontSize='2xl' color='whiteAlpha.700'>
          Tired of weather apps that bury the forecast in a mountain of graphs and glitz?
          <Highlight
            query={['Peeky']}
            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100'}}
          >
            Peeky cuts to the chase - literally!  
          </Highlight>
        </Text>
        <Text fontSize='2xl' color='whiteAlpha.700'>
          Because hey, who needs a meteorologist in your pocket when you have perfectly good eyeballs?
          <Highlight
            query={['Peeky']}
            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100'}}
          >
            Peeky gives you the nudge you need to Look outside the window for me!  
          </Highlight>
        </Text>
        <Text fontSize='2xl' color='whiteAlpha.700'>
            We'll tell you if you need an umbrella or sunglasses, but the view - that's all you, baby.
        </Text>
      </VStack>
    </Container>
  </Flex>
);
