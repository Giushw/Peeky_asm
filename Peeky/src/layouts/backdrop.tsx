import {Box, Image} from '@chakra-ui/react';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import Blizzard from '../assets/images/blizzard.jpg';
import Cloudy from '../assets/images/cloudy.jpg';
import Fog from '../assets/images/fog.jpg';
import FreezeRain from '../assets/images/freezeRain.jpg';
import Rain from '../assets/images/rain.jpg';
import Sleet from '../assets/images/sleet.jpg';
import Snow from '../assets/images/snow.jpg';
import Sunny from '../assets/images/sunny.jpg';
import Thunder from '../assets/images/thunder.jpg';
import Wallp from '../assets/images/wllp.jpg';

interface WeatherCondition {
  code: number[];
  image: string;
}

const weatherConditions: WeatherCondition[] = [
  { code: [323, 326, 329, 335, 338, 368, 371], image: Snow },
  { code: [317, 320, 362, 365, 374, 377], image: Sleet },
  { code: [311, 314], image: FreezeRain },
  { code: [263, 293, 296, 299, 302, 305, 308, 353, 356, 359], image: Rain },
  { code: [200, 386, 389, 392, 395], image: Thunder },
  { code: [143, 248, 260], image: Fog },
  { code: [227, 230], image: Blizzard },
  { code: [116, 119, 122], image: Cloudy },
  { code: [113], image: Sunny},
  { code: [], image: Wallp },
];

const Backdrop: React.FunctionComponent = () => {
  const backdropCode: number = useSelector((s: RootState) => s.searchedCities.backdropCode);
  
  const findCondition = (code: number): string => {
    const match = weatherConditions.find((condition) => condition.code.includes(code));
    return match?.image || Wallp;
  };

  return (
    <Box w='100vw' h='100vh' bg='teal.900'>
      <Image 
        src={findCondition(backdropCode)}
        alt='Landscape Backdrop'
        objectFit='cover'
        w='100%'
        h='100%' 
      />
    </Box>
  );
};

export default Backdrop;
