import React, { useState, useEffect } from "react";
import { FaUser, FaTimes } from "react-icons/fa";
import { Grid, Box, Flex, Text, Button, IconButton } from "@chakra-ui/react";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

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
    <Grid className="Student" p="3rem" borderRadius="md" justifyContent="center">
      <Flex alignItems="flex-start">
        <Box className="gradient" borderRadius="md">
          <Flex className="profile_down" alignItems="center" justifyContent="center"></Flex>
        </Box>
        <Box
          className="profile_title"
          backgroundColor="gray.200"
          borderRadius="md"
          flex="0 0 65%"
          mr="1rem"
          p="1rem"
        >
          <Flex flexDirection="column" alignItems="center" my="1rem">
            <Box bg="blue.400" borderRadius="full" p="1rem" boxShadow="md" mb="2rem">
              <FaUser size={64} color="white" />
            </Box>
            <Text fontSize="large" fontWeight="600" color="gray.600" mt="-1.5rem">
              <strong>{userData?.name} </strong>
              Ankit Rimal
            </Text>
            <Button colorScheme="blue" onClick={handleEditProfileClick} mt="1rem">
              Edit Profile
            </Button>
            <Text ml="2rem">
              <Text fontSize="md" fontWeight="400" color="gray.600" mt=".5rem">
                <strong>Department:</strong><br/> {userData?.department}
                School of Computer Science and Engineering
              </Text>
              <Text fontSize="md" fontWeight="400" color="gray.600" mt=".5rem">
                <strong>Country:</strong><br/> {userData?.country}
                Nepal
              </Text>
              <Text fontSize="md" fontWeight="400" color="gray.600">
                <strong>Email address:</strong>{" "}
                <small>{userData?.email}</small>
                ar41041720@student.ku.edu.np
              </Text>
            </Text>
          </Flex>
        </Box>
        {showEditProfile && (
          <Box className="edit_profile_section" bg="gray.100" borderRadius="md" p="1rem" my="-2.5rem">
            <Flex flexDirection="column" alignItems="flex-end">
              <IconButton
                aria-label="Close"
                icon={<FaTimes />}
                colorScheme="red"
                onClick={handleCloseEditProfile}
                mb="1rem"
              />
              <EditProfile onClose={handleCloseEditProfile} />
            </Flex>
          </Box>
        )}
      </Flex>
    </Grid>
  );
};

export default UserProfile;
