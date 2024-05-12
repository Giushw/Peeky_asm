import {
  Flex,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Image
} from '@chakra-ui/react'
// import React, { useEffect } from 'react';
// import {useSelector} from 'react-redux';
import type {CurrentResponse,
  // CurrentUnit
} from '../../types/response';
import {CiLocationArrow1} from "react-icons/ci";

interface ViewProps {
  data: CurrentResponse;
}
    
const View: React.FunctionComponent<ViewProps> = ({data}) => {
  // const [pending, setPending] = React.useState(false);
  // const [withData, setWithData] = React.useState(false);
  // const [viewData, setViewData] = React.useState<CurrentResponse>();
  // const [error, setError] = React.useState<Error>();

  // const searchedCities: City[] = useSelector((s: RootState) => s.searchedCities.cities);
  // const currentUnit: CurrentUnit = useSelector((s: RootState) => s.searchedCities.currentUnit);

  // const handleMock = () => {
  //   setPending(false);
  //   setWithData(true);
  //   setViewData(MOCKDATA);
  // };

  // useEffect(() => {
  //   if (searchedCities.length > 0) {
  //     setPending(true);
  //     fetchData<CurrentResponse>('GET', currentUnit, {query: searchedCities[searchedCities.length - 1].name})
  //       .then(data => {
  //         setPending(false);
  //         setWithData(true);
  //         setViewData(data);
  //       })
  //       .catch((error: Error) => {
  //         setPending(false);
  //         setWithData(false);
  //         setError(error);
  //       });
  //   }
  //   // Intended missied currentUnit dependency, its change shouldn't trigger calls
  // }, [searchedCities]);
  const {location, current} = data;
  
  return (
    <Flex w='100%' h='100%' p={4}>
      <Grid
        h='65vh'
        // h='70vh'
        w='90vw'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <LocationData location={location} current={current}/>
        </GridItem> 
        <GridItem colSpan={4}>
          <TempData current={current} />
        </GridItem>
        <GridItem colSpan={2}>
          <CurrentData current={current} />
        </GridItem>
        <GridItem colSpan={2}>
          <WindData current={current} />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default View;

type CurrentLocationDataProps = Omit<CurrentResponse, 'request'>;

const LocationData: React.FunctionComponent<CurrentLocationDataProps> = ({location, current}) => (
  <Card bg='blackAlpha.600' color='white'>
    <CardHeader>
      <Heading size='md' color='teal.500'>{location.name}</Heading>
    </CardHeader>

    <CardBody >
      <Stack divider={<StackDivider />} spacing='4'>
        <Box>
          <Heading size='xs' textTransform='uppercase' color='teal.500'>
            {location.country}
          </Heading>
          <Text pt='2' fontSize='sm'>
            {location.region}
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase' color='teal.500'>
            {location.timezone_id}
          </Heading>
          <Text pt='2' fontSize='sm'>
            {`Lat: ${location.lat}`}
          </Text>
          <Text pt='2' fontSize='sm'>
            {`Lon: ${location.lon}`}
          </Text>
        </Box>
        <Box>
          <Heading size='xs' textTransform='uppercase' color='teal.500'>
            {location.localtime}
          </Heading>
          <Text pt='2' fontSize='sm'>
            {`UTC: ${location.utc_offset}`}
          </Text>
          <Text pt='2' fontSize='sm'>
            {`Observed at: ${current.observation_time}`}
          </Text>
        </Box>
      </Stack>
    </CardBody>
  </Card>
);

type CurrentDataProps = Pick<CurrentResponse, 'current'>;

const CurrentData: React.FunctionComponent<CurrentDataProps> = ({current}) => (
  <Card bg='blackAlpha.600' color='white'>
    <CardBody>
      <Stack divider={<StackDivider />} spacing='4'>
        <StatGroup>
          <Stat>
            <StatLabel>Cloudcover</StatLabel>
            <StatNumber color='teal.500'>{current.cloudcover}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Visibility</StatLabel>
            <StatNumber color='teal.500'>{current.visibility}</StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup>
          <Stat>
            <StatLabel>Uv Index</StatLabel>
            <StatNumber color='teal.500'>{current.uv_index}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Is Day</StatLabel>
            <StatNumber color='teal.500'>{current.is_day}</StatNumber>
          </Stat>
        </StatGroup>
      </Stack>
    </CardBody>
  </Card>
);

const WindData: React.FunctionComponent<CurrentDataProps> = ({current}) => {
  const rotaryDeg: Record<string, number> = {
    n: 315,
    ne: 1,
    e: 40,
    se: 90,
    s: 135,
    sw: 180,
    w: 225,
    nw: 270   
  };

  const calculateRotation = () => rotaryDeg[current.wind_dir.toLowerCase()];

  return (
    <Card bg='blackAlpha.600' color='white'>
      <CardBody >
        <Stack divider={<StackDivider />} spacing='4'>
          <StatGroup>
            <Stat>
              <Image 
                as={CiLocationArrow1}
                alt='wind Arrow'
                objectFit='cover'
                style={{ transform: `rotate(${calculateRotation()}deg)` }}
              />
            </Stat>

            <Stat>
              <StatLabel>Wind Direction</StatLabel>
              <StatNumber color='teal.500'>{current.wind_dir}</StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup>
            <Stat>
              <StatLabel>Wind Degree</StatLabel>
              <StatNumber color='teal.500'>{current.wind_degree}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Wind Speed</StatLabel>
              <StatNumber color='teal.500'>{current.wind_speed}</StatNumber>
            </Stat>
          </StatGroup>
        </Stack>
      </CardBody>
    </Card>
  );
};

const TempData: React.FunctionComponent<CurrentDataProps> = ({current}) => (
  <Card  bg='blackAlpha.600' color='white'>
    <CardBody>
      <Stack spacing='4'>
        <Flex direction='column' justify='flex-end' align='flex-end'>
          <Heading as='h2' size='4xl' mb={2} color='teal.500'>
            {current.temperature}
          </Heading>
          <Text fontSize='xl' >
            Feelslike: {current.feelslike}
          </Text>
        </Flex>
        <Box>
          <Heading as='h2' size='4xl' mb={20} color='teal.500'>
            {current.weather_descriptions}
          </Heading>
        </Box>
      </Stack>
      
      <Stack spacing='4'>
        <StatGroup>
          <Stat>
            <StatLabel>Humidity</StatLabel>
            <StatNumber color='teal.500'>{current.humidity}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Precipitation</StatLabel>
            <StatNumber color='teal.500'>{current.precip}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Pressure</StatLabel>
            <StatNumber color='teal.500'>{current.pressure}</StatNumber>
          </Stat>
        </StatGroup>
      </Stack>
    </CardBody>
  </Card>
);