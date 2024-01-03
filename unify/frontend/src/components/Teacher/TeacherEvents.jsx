import React, { useState } from 'react';
import ViewEvents from '../Events/ViewEvents';
import CreateEvent from '../Events/CreateEvent';
import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const TeacherHome = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleAddEventsClick = () => {
    setShowCreateEvent(true);
  };

  const handleCloseClick = () => {
    setShowCreateEvent(false);
  };

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <ViewEvents />
      {!showCreateEvent ? (
        <Box textAlign="center">

          <Box
            marginTop="0.5rem"
            marginBottom="-1.15rem"
            marginLeft="1rem"
            backgroundColor="green"
            color="white"
            borderRadius="8px" // Rounded corners to make it square
            width="10rem"
            height="10rem" // Equal width and height to make it square
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgColor="blue.300"
          >
            <IconButton
              icon={<AddIcon />}
              onClick={handleAddEventsClick}
              variant="unstyled"
              aria-label="Add Event"
              width="100%" // Set width to 100% to occupy the box space
              height="100%" // Set height to 100% to occupy the box space
              fontSize="30px"
            />
          </Box>
        </Box>
      ) : (
        <Box margin="20px">
          <Button
            onClick={handleCloseClick}
            backgroundColor="red"
            color="white"
            borderRadius="5px"
            padding="10px 20px"
            cursor="pointer"
          >
            Close
          </Button>
          <CreateEvent />
        </Box>
      )}
    </Flex>
  );
};  

export default TeacherHome;





