import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

function LoadingSpinner() {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
    </Flex>
  );
}

export default LoadingSpinner;
