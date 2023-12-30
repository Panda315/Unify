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

function LeaveClassroom() {
  const [classroomId, setClassroomId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [leaveMessage, setLeaveMessage] = useState('');

  const handleClassroomIdChange = (e) => {
    setClassroomId(e.target.value);
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


  const handleLeave = async () => {
    try {
      // Make a request to the backend to leave the classroom with the entered ID
      const response = await fetch('http://localhost:8000/leaveclassroom/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
            classroom_id: classroomId,
            token: userToken,
        }),
      });

      
      if (response.ok) {
          console.log(`classroom id ${classroomId}`)
        // Handle successful leave
        setLeaveMessage('Left the classroom successfully!');
        setClassroomId('');
      } else {
        const error = await response.json();
        setLeaveMessage(`Failed to leave: ${error.message}`);
      }
    } catch (error) {
      console.error('Error leaving classroom:', error);
      setLeaveMessage('Error leaving classroom. Please try again.');
    }
  };

  return (
    <Box p="4" maxWidth="400px" mx="auto">
      <Heading as="h2" size="lg" mb="4">
        Leave Classroom
      </Heading>
      <FormControl>
        <FormLabel htmlFor="classroomId">Classroom ID:</FormLabel>
        <Input
          type="text"
          id="classroomId"
          value={classroomId}
          onChange={handleClassroomIdChange}
          required
          variant="filled"
          borderColor="gray.300"
          _hover={{ borderColor: 'gray.400' }}
          _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
          placeholder="Enter Classroom ID"
        />
      </FormControl>
      <Button
        mt="4"
        colorScheme="red"
        onClick={handleLeave}
        width="100%"
        borderRadius="md"
      >
        Leave Classroom
      </Button>
      {leaveMessage && <Text mt="3">{leaveMessage}</Text>}
    </Box>
  );
}

export default LeaveClassroom;
