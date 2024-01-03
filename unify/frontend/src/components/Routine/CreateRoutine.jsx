import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { FaPlus } from "react-icons/fa";

import {
    Box, 
    Grid,
    GridItem,
    Heading,
    Select,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Portal
} from '@chakra-ui/react';

import TimeBlock from './TimeBlock';
import CreateModal from './CreateClassModal';

const CreateRoutine = () => {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
    ]
    const times = [
        '7:00 AM',
        '8:00 AM',
        '9:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '1:00 PM',
        '2:00 PM',
        '3:00 PM',
    ]

    const programs = ['Computer Science', 'Computer Engineering', 'Civil Engineering']
    const batches = [2018, 2019, 2020, 2021, 2023, 2024]
    const rooms = [302, 303, 403, 404]
    
    const [classes, setClasses] = useState([
        { weekday: 'Sunday', startTime: '9:00 AM', endTime: '12:00 AM', courseName: 'COMP315', room: 404},
        { weekday: 'Monday', startTime: '7:00 AM', endTime: '9:00 AM', courseName: 'COMP315', room: 304},
        { weekday: 'Monday', startTime: '1:00 PM', endTime: '3:00 PM', courseName: 'MGTS301', room: 303},
        { weekday: 'Tuesday', startTime: '11:00 AM', endTime: '1:00 PM', courseName: 'MGTS301', room: 404},
    ])

    let mergeCount = 0;
    const [selection, setSelection] = useState({ start: null, end: null});
    const [editStart, setEditStart] = useState(8);
    const [editDuration, setEditDuration] = useState(1);
    const [classExists, setClassExists] = useState(false);
    const [courseName, setCourseName] = useState("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentSelectedRoom, setCurrentSelectedRoom] = useState();
    const [allocatedClass, setAllocatedClass] = useState([]);

    const getRoomAllocations = (room_no) => {
        const roomAllocations = classes.filter(
            (cls) =>
                cls.room === room_no
        )

        return roomAllocations;
    }

    const handleRoomChange = (e) => {
        setCurrentSelectedRoom(parseInt(e.target.value))
    }

    const checkTimeRange = (allocations, day, time) => {
        const [hour, minute] = time.split(':').map(Number);
        
        return allocations.some((cls) => {
            const [startHour, startMinute] = cls.startTime.split(':').map(Number);
            const [endHour, endMinute] = cls.endTime.split(':').map(Number);

            const existsInClassessArray = classes.some(
                (c) => c.weekday === cls.weekday && c.startTime === cls.startTime
            )
            if (existsInClassessArray) {
                return (
                    (cls.weekday === day) &&
                    (hour === startHour)
                )
            } else {
                return (
                    (cls.weekday === day) &&
                    (hour > startHour || hour === startHour) &&
                    (hour < endHour || hour === endHour)
                )
            }
        })
    }

    const roomNotAvailable = (day, time) => {
        let roomAllocations = getRoomAllocations(currentSelectedRoom);

        if (checkTimeRange(roomAllocations, day, time)) {
            return true
        } else {
            return false
        }
    }

    const checkClassExistence = (day, time) => {
        const classInfo = classes.find(
            (cls) =>
                cls.weekday === day &&
                cls.startTime === time
        )
        
        if (classInfo) {
            setClassExists(true)
        }
    }

    function handleButtonClick() {
        setIsCreateModalOpen(true);
    }

    const handleMouseDown = (day, time) => {
        // setSelection({ start: {day, time}, end: {day, time}})
        setSelection({ start: { day, time }, end: { day, time } });
        checkClassExistence(day, time);
    }

    const handleMouseEnter = (day, time) => {
        if (selection.start && selection.start.day && selection.start.time) {
            if (day === selection.start.day) {
                const startCol = times.indexOf(selection.start.time);
                const endCol = times.indexOf(time);
                const minCol = Math.min(startCol, endCol);
                const maxCol = Math.max(startCol, endCol);

                if (startCol !== -1 && endCol !== -1 && maxCol - minCol > 0) {
                    setSelection({
                        start: {...selection.start},
                        end: {day, time: times[maxCol]}
                    })

                    checkClassExistence(day, time)
                }
            }
        }
    }

    const handleMouseUp = () => {
        console.log("The duration:", editDuration)
        const actualStartTime = getActualTime(selection.start.time)
        setEditStart(actualStartTime)

        console.log(selection.start.time, selection.end.time)
        const classInfo = classes.find(
            (cls) => cls.weekday === selection.start.day && cls.startTime === selection.start.time
          );
      
        if (classInfo) {
            const duration = calculateTimeDuration(
              classInfo.startTime,
              classInfo.endTime
            );
            
            if(selection.start.time === selection.end.time) {
                let name = classes
                                .find(
                                    (cls) =>
                                        cls.weekday === selection.start.day &&
                                        cls.startTime === selection.start.time
                                )
                                .courseName;
                    
                setCourseName(name)
            }

            setEditDuration(duration);
        } else {
            const duration = calculateTimeDuration(selection.start.time, selection.end.time)
            setEditDuration(duration + 1)
        }

        setSelection({ start: null, end: null })

        if(selection.start && selection.end) {
            setIsCreateModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setClassExists(false);
        setCourseName('');
    }

    const isSelectedCell = (day, time) => {
        if (!selection.start || !selection.end) return false;

        const startRow = days.indexOf(selection.start.day);
        const endRow = days.indexOf(selection.end.day);
        const startCol = times.indexOf(selection.start.time);
        const endCol = times.indexOf(selection.end.time);
        const currentRow = days.indexOf(day);
        const currentCol = times.indexOf(time);

        return (
            currentRow >= Math.min(startRow, endRow) &&
            currentRow <= Math.max(startRow, endRow) &&
            currentCol >= Math.min(startCol, endCol) &&
            currentCol <= Math.max(startCol, endCol)
        )
    }

    const isClassTime = (day, time) => {
        return classes.some(
            (cls) => 
                cls.weekday === day &&
                cls.startTime === time
        )
    }

    const calculateTimeDuration = (start, end) => {
        const [startHour, startMinute] = start.split(':');
        const [endHour, endMinute] = end.split(':');
        
        const startDate = parseInt(startHour, 10) * 60 + (start.includes('PM') && startHour !== '12' ? 720 : 0);
        const endDate = parseInt(endHour, 10) * 60 + (end.includes('PM') && endHour !== '12' ? 720 : 0);

        const durationInHours = (endDate - startDate) / 60;
   
        return durationInHours;
    }

    const getActualTime = (displayedTime) => {
        const index = times.indexOf(displayedTime);

        let totalMergedDuration = 0;
        
        for (let i = 0; i < index; i++) {
            const classInfo = classes.find(
                (cls) => 
                    cls.weekday === selection.start.day &&
                    cls.startTime === times[i]
            );

            if (classInfo) {
                const duration = calculateTimeDuration(
                    classInfo.startTime,
                    classInfo.endTime
                );
                totalMergedDuration += duration;
            } else {
                totalMergedDuration += 1
            }
        }

        return 7 + totalMergedDuration;
    }

    const [draggingClass, setDraggingClass] = useState(null);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination || destination.droppableId === source.droppableId) {
            setDraggingClass(null);
            return;
        }

        const startDay = days[source.index];
        const endDay = days[destination.index];

        const updateClasses = classes.map((classItem) => {
            if(classItem.weekday === draggingClass.weekday) {
                classItem.weekday = endDay;
            }
            return classItem;
        })

        setClasses(updateClasses);
        setDraggingClass(null);
    }

    return (
            <Box p={4}>                               
                <Heading as='h1' mb={4}>
                    Routine Scheduler v1.0
                </Heading>
                <Grid templateColumns='repeat(10, 1fr)' borderBottom="2px solid #ccc">
                    <GridItem colSpan={1} colStart={1} m={1}>
                        <Select placeholder="Rooms" value={currentSelectedRoom} onChange={handleRoomChange}>
                            {rooms.map((room) => (
                                <option value={room}>{room}</option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem colSpan={2} colStart={8} m={1}>
                        <Select placeholder='Programs'>
                            {programs.map((program) => (
                                <option value={program}>{program}</option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem colSpan={1} colStart={10} m={1}>
                        <Select placeholder='Batch'>
                            {batches.map((batch) => (
                                <option value={batch}>{batch}</option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem colSpan={1} colStart={11} m={1}>
                        <Button onClick={handleButtonClick}>Create</Button>
                        <CreateModal
                            isOpen={isCreateModalOpen}
                            onClose={handleCloseModal}
                            start={editStart}
                            duration={editDuration}
                            classExists={classExists}
                            courseName={courseName}
                        />
                    </GridItem>
                </Grid>
                
                <Grid
                    templateColumns={`repeat(${times.length+1}, 1fr)`}
                    gap={0}
                >
                    <GridItem></GridItem>
                    {times.map((time, index) => (
                        <GridItem minHeight="50px">{time}</GridItem>
                    ))}
                    
                    {days.map((day, index) => (
                        <React.Fragment>
                            <GridItem minHeight="50px">{day}</GridItem>

                            <GridItem colSpan={times.length}>
                                    <Grid templateColumns={`repeat(${times.length}, 1fr)`}userSelect="none">
                                       
                                                {times.map((time, colIndex) => {
                                                    if (colIndex + 1 > times.length - mergeCount) {
                                                        if (colIndex == times.length - 1) {
                                                            mergeCount = 0;
                                                        }
                                                        console.log('returning')
                                                        return null;
                                                    }
                                                    const classInfo = classes.find(
                                                        (cls) => 
                                                            cls.weekday === day &&
                                                            cls.startTime === time
                                                    )

                                                    let colSpan = 1;
                                                    if(classInfo) {
                                                        const duration = calculateTimeDuration(classInfo.startTime, classInfo.endTime)
                                                        colSpan = times.indexOf(time) + duration > times.length ? times.length - times.indexOf(time) : duration;
                                                        
                                                        if (colSpan > 1) {
                                                            mergeCount += colSpan - 1;
                                                            console.log(mergeCount)
                                                        }
                                                    }

                                                    return (
                                                        <GridItem
                                                            colSpan={colSpan}
                                                            onMouseDown={() => handleMouseDown(day, time)}
                                                            onMouseEnter={() => handleMouseEnter(day, time)}
                                                            onMouseUp={handleMouseUp}
                                                            bg={isSelectedCell(day, time) ? 'blue.200' : 'transparent'}
                                                            cursor="pointer"
                                                        >
                                                            {isClassTime(day, time) && (
                                                                <Box
                                                                    minHeight="50px"
                                                                    bg={roomNotAvailable(day, time) ? "red.300" : "transparent"}
                                                                >
                                                                    <TimeBlock
                                                                        time={time}
                                                                        day={day}
                                                                        classes={classes}
                                                                    />
                                                                </Box>
                                                            ) || (
                                                                <Box
                                                                    border="1px solid #ccc" 
                                                                    minHeight="50px"
                                                                    bg={roomNotAvailable(day, time) ? "red.300" : "transparent"}
                                                                >
                                                                    {/* no class */}
                                                                </Box>
                                                            )}
                                                        </GridItem>
                                                    )}
                                                )}
                                            </Grid>
                            </GridItem>
                        </React.Fragment>
                    ))}
                </Grid>
            </Box>
    )
}

export default CreateRoutine;