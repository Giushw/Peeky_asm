import {
  Flex,
  VStack,
  Heading,
  Spinner,
  Text,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import type {City} from '../store/slice';
import {fetchData} from '../utils/api';
import type {CurrentResponse} from '../types/response';
import type {Error} from '../types/error';
  
const Weather: React.FunctionComponent = () => {
  const [pending, setPending] = React.useState(false);
  const [withData, setWithData] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [data, setData] = React.useState<CurrentResponse>();

  const searchedCities: City[] = useSelector((s: RootState) => s.searchedCities.cities);

  useEffect(() => {
    if (searchedCities.length > 0) {
      console.log('change');
      setPending(true);
      fetchData<CurrentResponse>('GET', 'm', {query: 'Milan'})
        .then(data => {
          setPending(false);
          setWithData(true);
          setData(data);
          console.log('API response DATA:', data);
        })
        .catch((error: Error) => {
          setPending(false);
          setWithData(false);
          setError(error);
          console.error('API request ERROR:', error);
        });
    };
  }, [searchedCities]);
  
  return (
    <Flex w='100%' h='100%' p={4}>
      {pending && <PendingState />}
      {(!pending && !withData) && <ErrorState  error={error}/>}
      {(!pending && withData) && <FullState data={data} />}
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

interface ErrorStateProps {
  error: Error | undefined;
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({error}) => {
  return (
    <Flex maxW='100%' direction='column' align='center' justify='center'>
      <Heading as='h4' size='xl' color='whiteAlpha.800' mb={4}>
        Seem there was a problem...
      </Heading>
      <VStack spacing={6}>
        <Text fontSize='lg' color='whiteAlpha.700'>
          Even 8 times champions crash every race or not, don't fuss about it!
        </Text>
        <Text fontSize='lg' color='whiteAlpha.700'>
          Try run another search.
        </Text>
      </VStack>
      {(error && !error.success) &&
        <Alert status='error' variant='subtle' mt={4}>
          <AlertIcon />
          There was an error processing your request: {error.error.info}
        </Alert>
      }
    </Flex>
  )
};

interface FullStateProps {
  data: CurrentResponse | Error | undefined;
}

const FullState: React.FunctionComponent<FullStateProps> = () => {
  
  return (
    <VStack direction='column' spacing={4}>
      <Heading as='h4' size='xl' color='whiteAlpha.800'>
        DAta
      </Heading>
    </VStack>
  );
};