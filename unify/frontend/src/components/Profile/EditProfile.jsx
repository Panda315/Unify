import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });

    // Reset password match error on input change
    setPasswordsMatch(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match before submission
    if (profileData.password !== profileData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // Passwords match, continue with submission
    console.log('Updated Profile Data:', profileData);
  };

  return (
    <Center>
      <Box
        as="form"
        onSubmit={handleSubmit}
        p="20px"
        borderRadius="8px"
        boxShadow="md"
        w="400px"
      >
        <Stack spacing="16px">
          <FormControl>
            <FormLabel htmlFor="firstName">First Name:</FormLabel>
            <Input
            border="1px solid #B2A59B" 
            borderRadius="8px" 
              type="text"
              id="firstName"
              name="firstName"
              placeholder='First Name'
              value={profileData.firstName}
              onChange={handleInputChange}
              variant="filled"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last Name:</FormLabel>
            <Input
            border="1px solid #B2A59B" 
            borderRadius="8px" 
              type="text"
              id="lastName"
              name="lastName"
              placeholder='Last Name'
              value={profileData.lastName}
              onChange={handleInputChange}
              variant="filled"
            />
          </FormControl>
          <FormControl isInvalid={!passwordsMatch}>
            <FormLabel htmlFor="password">New Password:</FormLabel>
            <Input
            border="1px solid #B2A59B" 
            borderRadius="8px" 
              type="password"
              id="password"
              name="password"
              value={profileData.password}
              onChange={handleInputChange}
              variant="filled"
            />
          </FormControl>
          <FormControl isInvalid={!passwordsMatch}>
            <FormLabel htmlFor="confirmPassword">Confirm Password:</FormLabel>
            <Input
            border="1px solid #B2A59B" 
            borderRadius="8px" 
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={profileData.confirmPassword}
              onChange={handleInputChange}
              variant="filled"
            />
            {!passwordsMatch && (
              <FormErrorMessage>Passwords do not match</FormErrorMessage>
            )}
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Save Changes
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default EditProfile;
