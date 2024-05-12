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
  Flex,
  FormLabel,
  Switch,
  useDisclosure
} from '@chakra-ui/react';
import {Search2Icon} from '@chakra-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import {addCity, type City, removeCity, updateUnit, updateIsSearching} from '../../store/slice';
import {generateId} from '../../utils/lib';
import {RootState} from '../../store/store';

const Search: React.FunctionComponent = () => {
  const firstField = React.useRef();
  const [value, setValue] = React.useState('');

  const [isCelsius, setIsCelsius] = React.useState(true);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useDispatch();
  const searchedCities: City[] = useSelector((s: RootState) => s.searchedCities.cities);

  //@ts-expect-error Browser Event is any for semplicity
  const handleChange = (event) => setValue(event.target.value);

  const onUnitChange = (unit: boolean) => {
    setIsCelsius(unit);
    dispatch(updateUnit( unit ? 'm' : 'f' ));
  };

  const onSearch = () => {
    dispatch(addCity({
      id: generateId(),
      name: value,
    }));
    dispatch(updateIsSearching(true));
    onClose();
  };

  const onClean = () => {
    setValue('');
  }

  const onChronoClick = (city: City) => {
    const findCity = searchedCities.filter(c => c.id === city.id);
    dispatch(removeCity(findCity[0]));
    dispatch(addCity(city));
};

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
        //@ts-expect-error Error between MutableRefObject<undefined and RefObject<FocusableElement
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
                    //@ts-expect-error error between MutableRefObject<undefined> and LegacyRef<HTMLInputElement>
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
                  <Flex alignItems='center' justifyContent='end'>
                    <FormLabel htmlFor='temp-unit' mb='0'>
                      F°
                    </FormLabel>
                    <Switch 
                      id='temp-unit' 
                      colorScheme='teal'
                      size='md' 
                      isChecked={isCelsius} 
                      onChange={() => onUnitChange(!isCelsius)}
                    />
                    <FormLabel htmlFor='temp-unit' mb='0' ml={4}>
                      C°
                    </FormLabel>
                  </Flex>
                  <ButtonGroup variant='outline' spacing='3'>
                    <Button colorScheme='blackAlpha' variant='solid' onClick={onClean}>
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
                          onClick={() => onChronoClick(city)}
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
