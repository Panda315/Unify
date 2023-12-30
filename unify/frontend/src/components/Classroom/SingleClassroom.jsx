import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import DeleteClassroom from './DeleteClassroom';
function SingleClassroom() {
  const { id } = useParams(); // Extract the 'id' parameter from the URL
  const { title, courseCode, instructor } = useParams();
  console.log(id,title,courseCode)
  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    // Simulated delay to mimic API call
    const delay = setTimeout(() => {
      
      setClassroom({
        id: id
       
      });
    }, 1000); // Simulating a delay of 1 second (1000 milliseconds)

    // Clear the timeout to prevent memory leaks on component unmount
    return () => clearTimeout(delay);
  }, [id]);

  if (!classroom) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <Box>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Classroom ID: {decodeURIComponent(classroom.id)}
      </Text>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Title : {decodeURIComponent(title)}
      </Text>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Course code: {courseCode}
      </Text>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        instructor: {instructor}
      </Text>
    <DeleteClassroom/> 
    </Box>
    
  );
}

export default SingleClassroom;
