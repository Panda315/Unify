import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

function JoinClassroom() {
  const [classroomCode, setClassroomCode] = useState('');
  const [userToken, setUserToken] = useState('');
  const [joinMessage, setJoinMessage] = useState('');

  const handleClassroomCodeChange = (e) => {
    setClassroomCode(e.target.value);
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if(tokenFromStorage){
        setUserToken(tokenFromStorage);
    }
    else {
        console.error('User token not found in local storage');
    }
}, [])

  const handleJoin = async () => {
    try {
      // Make a request to the backend to join the classroom with the entered code
      const response = await fetch('http://localhost:8000/joinclassroom/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
            token: userToken,
            code: classroomCode,
        }),
      });

      if (response.ok) {
        // Handle successful join
        setJoinMessage('Joined the classroom successfully!');
        setClassroomCode('');
      } else {
        const error = await response.json();
        setJoinMessage(`Failed to join: ${error.message}`);
      }
    } catch (error) {
      console.error('Error joining classroom:', error);
      setJoinMessage('Error joining classroom. Please try again.');
    }
  };

  return (
    <Box p="4" maxWidth="400px" mx="auto">
      <Heading as="h2" size="lg" mb="4">
        Join Classroom
      </Heading>
      <FormControl>
        <FormLabel htmlFor="classroomCode">Classroom Code:</FormLabel>
        <Input
          type="text"
          id="classroomCode"
          value={classroomCode}
          onChange={handleClassroomCodeChange}
          required
          variant="filled"
          borderColor="gray.300"
          _hover={{ borderColor: 'gray.400' }}
          _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
          placeholder="Enter Classroom Code"
        />
      </FormControl>
      <Button
        mt="4"
        colorScheme="blue"
        onClick={handleJoin}
        width="100%"
        borderRadius="md"
      >
        Join Classroom
      </Button>
      {joinMessage && <Text mt="3">{joinMessage}</Text>}
    </Box>
  );
}

export default JoinClassroom;
