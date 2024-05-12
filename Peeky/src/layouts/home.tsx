import {
  Box,
  Grid,
  GridItem
} from '@chakra-ui/react';
import React from 'react';
import Navigation from '../components/header/navigation';
import Copyright from '../components/footer/copyright';
import Wrapper from '../components/body/wrapper';

const Home: React.FunctionComponent = () => (
  <Box w='100vw' h='100vh' bg='transparent'>
    <Grid
      templateAreas={`
      "header header"
      "main main"
      "footer footer"
      `}
      gridTemplateRows={'100px 1fr 50px'}
      gridTemplateColumns={'150px 1fr'}
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
      boxSize='full'
    >
      <GridItem bg='blackAlpha.400' area={'header'}>
        <Navigation />
      </GridItem>
      <GridItem bg='transparent' area={'main'}>
        <Wrapper />
      </GridItem>
      <GridItem bg='blackAlpha.400' area={'footer'}>
        <Copyright />
      </GridItem>
    </Grid>
  </Box>
);
  
export default Home;
