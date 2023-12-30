import React from 'react';
import { Box, Text, Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// Function to generate a random background color
function getRandomColor() {
  const colors = ['#FF5733', '#33FF9F', '#337DFF', '#FF3389'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}



function ClassroomCard({id, title, courseCode, profileImage, instructor }) {
  const upperBackgroundColor = getRandomColor();
 

  return (
    <Link to={`/classroom/${id}?title=${encodeURIComponent(title)}&courseCode=${encodeURIComponent(courseCode)}&instructor=${encodeURIComponent(instructor)}`}>
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="xl"
      borderWidth="2px"
      borderColor="gray.200"
      w="400px"
      position="relative"
      h="250px"
      transition="transform 0.2s"
      _hover={{
        transform: "scale(1.05)",
        cursor: "pointer"
      }}
    >
      <Avatar
        size="xl"
        name={title}
        src={profileImage}
        position="absolute"
        top={4}
        right={4}
        borderRadius="full"
        zIndex="1" // Raise the avatar above the card
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)" // Add a shadow for depth
      />
      <Text mt={2} fontSize="md" color="gray.800">
        {courseCode}
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        {title}
      </Text>
      <Text mt={2} fontSize="md" color="gray.600">
        {instructor}
      <hr style={{ borderTop: '3px solid #e2e8f0', width: '100%', marginTop: '10px' }} />
      </Text>
    </Box>
    </Link>
  
  );
}

export default ClassroomCard;










