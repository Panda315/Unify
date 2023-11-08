import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const hours = Array.from({ length: 9 }, (_, i) => 7 + i);

const StudentRoutine = () => {
  const [subjects, setSubjects] = useState({});
  const [newEntry, setNewEntry] = useState({ day: "", time: "", subject: "" });
  const [selectedCell, setSelectedCell] = useState(null);

  const cellStyle = {
    padding: "8px",
    textAlign: "center",
    border: "1px solid #ccc",
    overflow: "hidden",
  };

  const getSpan = (subjectKey) => {
    if (subjects[subjectKey]) {
      const [day, hour] = subjectKey.split("-");
      const currentSubject = subjects[subjectKey];
      let span = 1;

      // Check if the next hour in the same day contain the same subject
      for (let i = parseInt(hour) + 1; i <= 15; i++) {
        const nextKey = `${day}-${i}`;
        if (subjects[nextKey] === currentSubject) {
          span++;
          delete subjects[nextKey]; // Prevent rendering of the merged cells
        } else {
          break;
        }
      }

      return span;
    }

    return 1; // Default value
  };

  const handleNewEntryChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value,
    });
  };

  const addNewEntry = () => {
    if (newEntry.day && newEntry.time && newEntry.subject) {
      const subjectKey = `${newEntry.day}-${newEntry.time}`;
      if (!subjects[subjectKey]) {
        setSubjects((prevSubjects) => ({
          ...prevSubjects,
          [subjectKey]: newEntry.subject,
        }));
      }
      setNewEntry({ day: "", time: "", subject: "" });
    }
  };

  const openDeletePopup = (subjectKey) => {
    setSelectedCell(subjectKey);
  };

  const handleDelete = () => {
    if (selectedCell) {
      const subjectKey = selectedCell;
      const updatedSubjects = { ...subjects };
      delete updatedSubjects[subjectKey];
      setSubjects(updatedSubjects);
      setSelectedCell(null);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Table variant="simple" maxW="800px" my={5}>
        <Thead>
          <Tr>
            <Th style={cellStyle}></Th>
            {hours.map((hour) => (
              <Th key={hour} style={cellStyle}>
                {hour}:00
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {daysOfWeek.map((day, dayIndex) => (
            <Tr key={dayIndex}>
              <Td style={cellStyle}>{day}</Td>
              {hours.map((hour, hourIndex) => {
                const subjectKey = `${day}-${hour}`;
                const subject = subjects[subjectKey];
                const colSpan = getSpan(subjectKey);

                return (
                  <Td
                    key={`${day}-${hour}`}
                    colSpan={colSpan}
                    style={{
                      
                      ...cellStyle,
                      maxWidth: colSpan === 1 ? 'none' : `${colSpan * 80}%`,
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      openDeletePopup(subjectKey);
                    }}
                  >
                    {subject && (
                      <Box
                        bg="blue.100"
                        p={2}
                        borderRadius="md"
                        boxShadow="md"
                        textAlign="center"
                        whiteSpace="nowrap"
                      >
                        {subject}
                      </Box>
                    )}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <VStack spacing={2}>
        <Input
          type="text"
          name="day"
          placeholder="Day (e.g., Monday)"
          onChange={handleNewEntryChange}
          value={newEntry.day}
        />
        <Input
          type="text"
          name="time"
          placeholder="Time (e.g., 9-10)"
          onChange={handleNewEntryChange}
          value={newEntry.time}
        />
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={handleNewEntryChange}
          value={newEntry.subject}
        />
        <Button onClick={addNewEntry}>Add Entry</Button>
      </VStack>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={selectedCell !== null}
        onClose={() => setSelectedCell(null)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this subject?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={() => setSelectedCell(null)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default StudentRoutine;
