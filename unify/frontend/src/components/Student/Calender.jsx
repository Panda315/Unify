import React, { useState } from 'react';
import { Box, Center, Text, IconButton, Stack, useMediaQuery } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calender() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handlePreviousMonth() {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  }

  function handleNextMonth() {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  }

  const tileContent = ({ date, view }) => {
    // Highlight the current date with a red background
    if (view === 'month' && date.getDate() === new Date().getDate()) {
      return <div style={{ borderRadius: '50%', padding: '2px' }}></div>;
    }
    
    // Highlight the selected date with a black border
    if (view === 'month' && date.getDate() === selectedDate.getDate()) {
      return <div style={{  padding: '2px' }}></div>;
    }

    return null;
  };

  return (
    <Center h="70vh">
      <Box
        boxShadow="md"
        p=""
        bg="white"
        w={isLargerThan768 ? "400px" : "50%"}
        display="flex"
        flexDir="column"
        ml={isLargerThan768 ? "50rem" : "2rem"}
      >
        <Stack direction="row" justifyContent="space-between" mb="4">
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Previous Month"
            onClick={handlePreviousMonth}
          />
          <Text fontWeight="bold" fontSize="lg">
            {selectedDate.toDateString()}
          </Text>
          <IconButton
            icon={<ChevronRightIcon />}
            aria-label="Next Month"
            onClick={handleNextMonth}
          />
        </Stack>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </Box>
    </Center>
  );
}

export default Calender;
