import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Grid, Box, Flex, Text } from "@chakra-ui/react";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("https://api/user/profile");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Grid
      className="Student"
      p="3rem"
      borderRadius="md"
      justifyContent="center"
    >
      <Box className="gradient" borderRadius="md">
        <Flex
          className="profile_down"
          alignItems="center"
          justifyContent="center"
        ></Flex>
      </Box>
      <Box
        className="profile_title"
        backgroundColor="gray.200"
        borderRadius="md"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          my="2rem"
          maxHeight="100%"
          maxW="18rem"
        >
          <Box
            bg="blue.400"
            borderRadius="full"
            p="1rem"
            boxShadow="md"
            mb="2rem"
          >
            <FaUser size={64} color="white" />
          </Box>
          <Text fontSize="large" fontWeight="600" color="gray.600" mt="-1.5rem">
            <strong>{userData?.name}</strong>
            Ankit Rimal
          </Text>
          <Text ml="2rem">
            <Text fontSize="md" fontWeight="400" color="gray.600" mt=".5rem">
              <strong>
                Department: <br />{" "}
              </strong>{" "}
              {userData?.department}
              School of Computer Science and Engineering
            </Text>
            <Text fontSize="md" fontWeight="400" color="gray.600" mt=".5rem">
              <strong>
                Country:
                <br />{" "}
              </strong>{" "}
              {userData?.country}
              Nepal
            </Text>
            <Text fontSize="md" fontWeight="400" color="gray.600">
              <strong>Email address: </strong> <small>{userData?.email}</small>
              ar41041720@student.ku.edu.np
            </Text>
          </Text>
        </Flex>
      </Box>
    </Grid>
  );
};

export default UserProfile;
