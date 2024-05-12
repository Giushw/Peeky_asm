import {
  Flex,
  VStack,
  Heading,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  Button
} from '@chakra-ui/react'
import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateBackdropCode} from '../../store/slice';
import type {CurrentResponse, CurrentUnit} from '../../types/response';
import type {Error} from '../../types/error';
import type {City} from '../../store/slice';
import {RootState} from '../../store/store';
import {fetchData} from '../../utils/api';
import {MOCKDATA} from '../../mock/data';
import View from './view';
  
const Weather: React.FunctionComponent = () => {
  const [pending, setPending] = React.useState(false);
  const [withData, setWithData] = React.useState(false);
  const [viewData, setViewData] = React.useState<CurrentResponse>();
  const [error, setError] = React.useState<Error>();

  const searchedCities: City[] = useSelector((s: RootState) => s.searchedCities.cities);
  const currentUnit: CurrentUnit = useSelector((s: RootState) => s.searchedCities.currentUnit);

  const handleMock = () => {
    setPending(false);
    setWithData(true);
    setViewData(MOCKDATA);
  };

  useEffect(() => {
    if (searchedCities.length > 0) {
      setPending(true);
      fetchData<CurrentResponse>('GET', currentUnit, {query: searchedCities[searchedCities.length - 1].name})
        .then(data => {
          setPending(false);
          setWithData(true);
          setViewData(data);
        })
        .catch((error: Error) => {
          setPending(false);
          setWithData(false);
          setError(error);
        });
    }
    // Intended missied currentUnit dependency, its change shouldn't trigger calls
  }, [searchedCities]);
  
  return (
    <Flex w='100%' h='100%' p={4}>
      {pending && <PendingState />}
      {(!pending && !withData) && <ErrorState  error={error} mockFn={handleMock} />}
      {(!pending && withData) && <FullState data={viewData} mockFn={handleMock} />}
    </Flex>
  );
};

export default Weather;

const PendingState: React.FunctionComponent = () => (
  <VStack direction='column' spacing={4}>
    <Heading as='h4' size='xl' color='whiteAlpha.800'>
      Sent a pidgeon to get the infos...
    </Heading>
    <Spinner
      thickness='4px'
      emptyColor='blackAlpha.300'
      color='teal.500'
      size='xl'
    />
    
  </VStack>
);

interface viewState {
  mockFn: () => void;
}

interface ErrorStateProps extends viewState {
  error: Error | undefined;
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({error, mockFn}) => (
  <Flex maxW='100%' direction='column' align='center' justify='center'>
    <Heading as='h4' size='xl' color='whiteAlpha.800' mb={4}>
      Seem there was a problem...
    </Heading>
    <VStack spacing={6}>
      <Text fontSize='lg' color='whiteAlpha.700'>
        Even 8 times champions crash every race or not, don't fuss about it!
      </Text>
      <Text fontSize='lg' color='whiteAlpha.700'>
        Try run another search or you could try these mock data.
      </Text>
      <Button 
        colorScheme='teal'
        variant='solid' 
        size='lg'
        mb={3}
        onClick={() => mockFn()}
      >
        Mock Data
      </Button>
    </VStack>
    {(error && !error.success) &&
      <Alert status='error' variant='subtle' mt={4}>
        <AlertIcon />
        There was an error processing your request: {error.error.info}
      </Alert>
    }
  </Flex>
);

interface FullStateProps extends viewState {
  data: CurrentResponse | Error | undefined;
}

const FullState: React.FunctionComponent<FullStateProps> = ({data, mockFn}) => {
  const dispatch = useDispatch();

  const dataFound = () => {
    if (data) {
      // Type guard to discern case
      if ('success' in data) {
        // Fake 200 (200 with error inside)
        return false;
      } else {
        // 200
        dispatch(updateBackdropCode(data.current.weather_code));
        return true;
      }
    } else {
      // Genuine error
      return false;
    }
  };
  
  return (
    <VStack direction='column' spacing={4}>
      {!dataFound() &&
        <ErrorState error={data as Error} mockFn={mockFn}/>
      }

      {dataFound() && 
        <Heading as='h4' size='xl' color='whiteAlpha.800'>
          <View  data={data as CurrentResponse}/>
        </Heading>
      }
    </VStack>
  );
};