import { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import ViewEvents from './Events/ViewEvents';
import ClassroomCard from './Classroom/ClassroomCard';
const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const first_name = localStorage.getItem('first_name')
  console.log(first_name)
  setFirstName(first_name)

  useEffect(() => {
    
  }, []);

  return (
    <Box p="4">
      <Heading as="h1" size="lg" mt="4">
        {`Welcome back, ${firstName} 👋`}
      </Heading>
     
      <Heading as="h2" size="lg"  my="1rem" >
        Events
      </Heading>
      <ViewEvents/>
      <Box>
     
      </Box>
      </Box>
  );
};

export default HomePage;
