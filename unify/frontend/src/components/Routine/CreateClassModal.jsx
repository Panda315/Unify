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

const CreateModal = ({ isOpen, onClose, onSave, onUpdate, onDelete, id, day, start, duration, classExists, offset, courses, course, room}) => {
    console.log(classExists)
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
    const [endTime, setEndTime] = useState(parseInt(start) + parseInt(duration) + offset);
    const [selectedCourse, setSelectedCourse] = useState(course);
    const [selectedRoom, setSelectedRoom] = useState(room);

    useEffect(() => {
      setEndTime(parseInt(start) + parseInt(duration));
    }, [startTime]);

    const endTimeOptions = timeOptions.filter(
      (option) => option.value > startTime
    )

    useEffect(() => {
      setEndTime(parseInt(start) + parseInt(duration) + offset);
      console.log(endTime)
    }, [offset])

    useEffect(() => {
      setStartTime(parseInt(start));
    }, [start]);

    useEffect(() => {
      setEndTime(parseInt(start) + parseInt(duration));
    }, [start, duration]);

    useEffect(() => {
      setSelectedCourse(course);
    }, [course])

    useEffect(() => {
      setSelectedRoom(room);
    }, [room])

    const handleStartTimeChange = (e) => {
      setStartTime(parseInt(e.target.value));
    }

    const handleEndTimeChange = (e) => {
      setEndTime(parseInt(e.target.value));
    }

    const handleRoomChange = (e) => {
      setSelectedRoom(e.target.value)
    }

    const handleModalOpen = () => {
      isOpen = true;
    }
    
    const handleCourseNameChange = (e) => {
      setSelectedCourse(e.target.value)
    }

    const handleSave = () => {
      const classData = {
          course: selectedCourse,
          week_day: day,
          start_time: startTime,
          end_time: endTime,
          room_no: selectedRoom
        }

      onSave(classData);

      onClose();
    }

    const handleUpdate = () => {
      const classData = {
        routine_id: id,
        course: selectedCourse,
        start_time: startTime,
        end_time: endTime,
        room_no: selectedRoom
      };

      onUpdate(classData);

      onClose();
    }

    const handleDelete = () => {
      const classData = {
        course: selectedCourse,
        week_day: day,
        start_time: startTime,
        end_time: endTime,
        room_no: selectedRoom
      }

      onDelete(classData);

      onClose();
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
                <Select value={selectedCourse} onChange={handleCourseNameChange}>
                  {selectedCourse === '' && <option value="" disabled>Select Course</option>}
                  {courses && courses.map((c) => (
                    <option value={c}>{c}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Room</FormLabel>
                <Select placeholder='Select Room' value={selectedRoom} onChange={handleRoomChange}>
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
              {!id && (<Button variant="solid" colorScheme='green' mr={3} onClick={handleSave}>Save</Button>)}
              {id && (<Button variant="solid" colorScheme='green' mr={3} onClick={handleUpdate}>Update</Button>)}
              {classExists && (<Button variant="solid" colorScheme='red' mr={3} onClick={handleDelete}>Delete</Button>)}
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