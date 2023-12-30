import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

function SingleClassroom() {
  const { id } = useParams(); // Extract the 'id' parameter from the URL
  const [classroom, setClassroom] = useState(null);

  // Simulated data or API call to fetch classroom information based on 'id'
  useEffect(() => {
    // Simulated delay to mimic API call
    const delay = setTimeout(() => {
      // Replace this with your API call logic to fetch classroom data
      // Example: fetchClassroomData(id)
      // Upon fetching, update the 'classroom' state with the retrieved data
      setClassroom({
        id: id,
        title: "Math",
        courseCode: 'MATH101',
        instructor: 'John Doe',
        // Add more properties as needed
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
        Classroom ID: {classroom.id}
      </Text>
      <Text as="p" fontSize="lg" mt="4">
        Title: {classroom.title}
      </Text>
      <Text as="p" fontSize="lg">
        Course Code: {classroom.courseCode}
      </Text>
      <Text as="p" fontSize="lg">
        Instructor: {classroom.instructor}
      </Text>
      {/* Add more Text components to display other classroom information */}
    </Box>
  );
}

export default SingleClassroom;
