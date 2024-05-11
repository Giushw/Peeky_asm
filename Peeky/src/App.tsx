// import {useState, 
  // useEffect
// } from 'react';
// import {fetchData} from './utils/api';
// import {CurrentResponse} from './types/response';
import {
  Box,
} from '@chakra-ui/react';
import Home from './layouts/home';
import Backdrop from './layouts/backdrop';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetchData<CurrentResponse>('GET', 'm', {query: 'Milan'})
  //     .then(data => {
  //       console.log('API response data:', data);
  //     })
  //     .catch(error => {
  //       console.error('API request error:', error);
  //     });
  // }, []);

  return (
    <>
      <Box position='relative' zIndex={1}>
        <Backdrop />
      </Box>
      <Box position='absolute' top='0' left='0' zIndex={100}>
        <Home />
      </Box>
    </>
  )
}

export default App;