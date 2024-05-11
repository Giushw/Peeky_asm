import {
  Box,
  Center,
  Button,
  ButtonGroup,
  Input,
  Text,
  Heading,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  StackDivider,
  useDisclosure,
  Flex
} from '@chakra-ui/react';
import {Search2Icon} from '@chakra-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import {addCity, type City, removeCity} from '../../store/slice';
import {generateId} from '../../utils/lib';
import {RootState} from '../../store/store';

const Search: React.FunctionComponent = () => {
  const firstField = React.useRef();
  const [value, setValue] = React.useState('');

  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useDispatch();
  const searchedCities: City[] = useSelector((s: RootState) => s.searchedCities.cities);

  const handleSearch = (city: City) => { 
    dispatch(addCity(city));
  };

  const handleChange = (event) => setValue(event.target.value);

  const onChronoClick = (emitter: string) => console.log('Clicked: ', emitter);

  const onSearch = () => {
    handleSearch({
      id: generateId(),
      name: value
    });
    onClose();
  };

  const onCancel = () => {
    setValue('');
  }

  useEffect(() => {
    if (searchedCities && searchedCities.length > 5) {
      dispatch(removeCity(searchedCities[0]))
    }
  },[searchedCities, dispatch]);

  return (
    <>
      <Center p='4' bg='transparent' boxSize='100px'>
        <Button colorScheme='teal' onClick={onOpen}>
          <Search2Icon />
        </Button>
      </Center>
      <Drawer
        colorScheme='whiteAlpha'
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent bg='whiteAlpha.700'>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack
              divider={<StackDivider borderColor='gray.200' />}
              spacing={4}
              align='stretch'
            >
              <Box m='100px 0 50px'>
                <VStack spacing={6} align='stretch'>
                  <Heading as='h4' size='xl' color='teal.500'>
                    Where do you want to peek?
                  </Heading>
                  <Input 
                    ref={firstField}
                    color='blackAlpha.800'
                    size='lg'
                    variant='flushed'
                    focusBorderColor="teal.500"
                    placeholder='Search a city...' 
                    _placeholder={{ color: 'white' }}
                    value={value}
                    onChange={handleChange}
                  />
                  <ButtonGroup variant='outline' spacing='3'>
                    <Button colorScheme='blackAlpha' variant='solid' onClick={onCancel}>
                      Clean
                    </Button>
                    <Button colorScheme='teal' variant='solid'  onClick={onSearch}>
                      Search
                    </Button>
                  </ButtonGroup>
                </VStack>
              </Box>
              <Box mt='50px'>
                <VStack spacing={6}>
                  <Heading as='h4' size='md' color='white'>
                    Last searched cities
                  </Heading>
                  <Box>
                    <Flex direction='column-reverse'>
                      {searchedCities.length > 0 && searchedCities.map((city) => (
                        <Button 
                          key={city.id} 
                          colorScheme='blackAlpha'
                          variant='solid' 
                          size='lg'
                          mb={3}
                          onClick={() => onChronoClick(city.name)}
                        >
                          {city.name}
                        </Button>
                      ))}
                      {
                        searchedCities.length === 0 &&
                        <Text fontSize='lg' color='blackAlpha.700'>
                          Nothing here.
                        </Text>
                      }
                    </Flex>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
};

export default Search;
