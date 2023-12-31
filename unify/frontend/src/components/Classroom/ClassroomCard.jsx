import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import { Box, Text, Avatar } from '@chakra-ui/react';

// Function to generate a random background color
function getRandomColor() {
  const colors = ['#FF5733', '#33FF9F', '#337DFF', '#FF3389'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}

// ClassroomCard component for individual class cards
function ClassroomCard({ Id, title, courseCode, instructor }) {
  const upperBackgroundColor = getRandomColor();
  const queryString = `?title=${encodeURIComponent(title)}&courseCode=${encodeURIComponent(courseCode)}&instructor=${encodeURIComponent(instructor)}`;


  return (
    <Link to={`/classroom/${Id}${queryString}`}>
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
        {/* Render class card details */}
        <Text mt={2} fontSize="md" color="gray.800">
          {courseCode}
        </Text>
        <Text fontWeight="bold" fontSize="xl">
          {title}
        </Text>
        <Text mt={2} fontSize="md" color="gray.600">
          {instructor}
        </Text>
        <hr style={{ borderTop: '3px solid #e2e8f0', width: '100%', marginTop: '10px' }} />
      </Box>
    </Link>
  );
}


export default ClassroomCard;

