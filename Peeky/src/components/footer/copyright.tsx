import {
    Flex,
    Box,
    Spacer,
    Text,
    HStack,
    Link,
    Icon
  } from '@chakra-ui/react';
  import React from 'react';
  import {} from '@chakra-ui/icons';
  import {FaGithub, FaLinkedin} from "react-icons/fa";
  
  const Copyright: React.FunctionComponent = () => (
    <Flex>
      <Box bg='trasparent' p={2}>
        <Text fontSize='lg' color='whiteAlpha.700'>© 2024 Peeky All Rights Reserved.</Text>
      </Box>
      <Spacer />
      <Box bg='trasparent' p={2}>
        <HStack spacing={3}>
          <Link href='https://github.com/Giushw' isExternal>
            <Icon as={FaGithub} boxSize='20px' color='whiteAlpha.700'/>
          </Link>
          <Link href='https://www.linkedin.com/in/giuseppedellavvocato/' isExternal>
            <Icon as={FaLinkedin}  boxSize='20px' color='whiteAlpha.700' />
          </Link>
        </HStack>
      </Box>
    </Flex>
  );
  
  export default Copyright;
  