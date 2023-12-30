import React, { useState,useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

function DeleteClassroom() {
  const [classroomCode, setClassroomCode] = useState('');
  const [userToken, setUserToken] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setUserToken(tokenFromStorage);
    } else {
      console.error('User token not found in local storage');
    }
  }, []);

  const handleClassroomCodeChange = (e) => {
    setClassroomCode(e.target.value);
  };

  const handleDelete = async () => {
    try {
      // Make a delete request to the backend API to delete the classroom
      const response = await fetch('http://localhost:8000/deleteclassroom/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`, 
           },

        body: JSON.stringify({
            code: classroomCode,
            token: userToken,

        }),
      });

      if (response.ok) {
        // Handle successful deletion
        setDeleteMessage('Classroom deleted successfully!');
        setClassroomCode('');
      } else {
        const error = await response.json();
        setDeleteMessage(`Failed to delete: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting classroom:', error);
      setDeleteMessage('Error deleting classroom. Please try again.');
    }
  };

  return (
    <Box p="4" maxWidth="400px" mx="auto">
      <Heading as="h2" size="lg" mb="4">
        Delete Classroom
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
        colorScheme="red"
        onClick={handleDelete}
        width="100%"
        borderRadius="md"
      >
        Delete Classroom
      </Button>
      {deleteMessage && <Text mt="3">{deleteMessage}</Text>}
    </Box>
  );
}

export default DeleteClassroom;
