import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select
} from '@chakra-ui/react';

const CreateModal = ({ isOpen, onClose, start, duration, classExists, courseName}) => {
    const courses = ['COMP315', 'MGTS301']
    const rooms = [302, 303, 402, 404]

    const timeOptions = Array.from({ length: 10 }, (_, i) => ({
      value: i + 7,
      label: new Intl.DateTimeFormat('en-US', {
         hour: '2-digit',
         minute: '2-digit',
         hour12: true,
      }).format(new Date().setHours(i + 7, 0)),
     }));

    const [startTime, setStartTime] = useState(parseInt(start));
    const [endTime, setEndTime] = useState(parseInt(start) + parseInt(duration));
    const [course, setCourse] = useState(courseName);

    useEffect(() => {
      setEndTime(parseInt(start) + parseInt(duration));
    }, [startTime]);

    const endTimeOptions = timeOptions.filter(
      (option) => option.value > startTime
    )

    useEffect(() => {
      setStartTime(parseInt(start));
    }, [start]);

    useEffect(() => {
      console.log("index: ", start + duration)
      setEndTime(parseInt(start) + parseInt(duration));
    }, [start, duration]);

    useEffect(() => {
      setCourse(courseName);
    }, [courseName]);

    const handleStartTimeChange = (e) => {
      setStartTime(parseInt(e.target.value));
    }

    const handleEndTimeChange = (e) => {
      setEndTime(parseInt(e.target.value));
    }

    const handleModalOpen = () => {
      isOpen = true;
    }
    
    const handleCourseNameChange = (e) => {
      setCourse(e.target.value)
    }

    return (
      <>
        {/* <Button onClick={handleModalOpen}>Create</Button> */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Class</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Course</FormLabel>
                <Select value={course} onChange={handleCourseNameChange}>
                  {course === '' && <option value="" disabled>Select Course</option>}
                  {courses.map((c) => (
                    <option value={c}>{c}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Room</FormLabel>
                <Select placeholder='Select Room'>
                  {rooms.map((room) => (
                    <option value={room}>{room}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Select Time</FormLabel>
                <Grid templateColumns={'repeat(2, 1fr)'} gap={1}>
                  <Select variant='flushed' value={startTime} onChange={handleStartTimeChange}>
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  
                  <Select variant='flushed' value={endTime} onChange={handleEndTimeChange}>
                    {console.log("endtime: ", endTime)}
                    {endTimeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>   
                    ))}   
                  </Select>
                </Grid>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button variant="solid" colorScheme='green' mr={3}>Save</Button>
              {classExists && (<Button variant="solid" colorScheme='red' mr={3}>Delete</Button>)}
              <Button variant="outline" colorScheme='blue' onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default CreateModal;