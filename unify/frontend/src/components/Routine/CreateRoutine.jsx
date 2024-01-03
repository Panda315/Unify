import React, { useState, useEffect } from 'react';
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
    Portal,
    useToast
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

    const batches = [2018, 2019, 2020, 2021, 2022, 2023, 2024]; 
    const [userToken, setUserToken] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [currentSelectedProgram, setCurrentSelectedProgram] = useState();
    const [currentSelectedBatch, setCurrentSelectedBatch] = useState();
    const [classes, setClasses] = useState([])
    const [course, setCourse] = useState();
    const [courses, setCourses] = useState([])
    const [classID, setClassID] = useState();

    const fetchRooms = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/routine/get_room_ids/');

            if (response.ok) {
                const data = await response.json();
                setRooms(data.room_ids);
            } else {
                console.error('Failed to fetch rooms');
            }
        } catch (error) {
            console.error('Error fetching rooms: ', error);
        }
    }

    const fetchPrograms = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/routine/get_programs/');

            if (response.ok) {
                const data = await response.json();
                setPrograms(data.programs);
            } else {
                console.error('Failed to fetch programs');
            }
        } catch (error) {
            console.error('Error fetching programs: ', error);
        }
    }
    
    const fetchCourses = async () => {
        const request = {
            program_name: currentSelectedProgram
        }

        const response = await fetch('http://127.0.0.1:8000/routine/get_course_codes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })

        if (!response.ok) {
            throw new Error('Failed to fetch courses')
        }

        const data = await response.json();
        setCourses(data.courses)
    }

    const fetchRoutine = async () => {
        const request = {
            program: currentSelectedProgram,
            batch: currentSelectedBatch,
            token: userToken,
        }
        
        const response = await fetch('http://127.0.0.1:8000/routine/get_routine/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })

        if(!response.ok) {
            throw new Error('Failed to fetch routine')
        }

        const data = await response.json();
        setClasses(data)
    }

    

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if(tokenFromStorage){
            setUserToken(tokenFromStorage);
        }
        else {
            console.error('User token not found in local storage');
        }
        
        fetchRooms();
        fetchPrograms();
    }, [])

    useEffect(() => {
        fetchRoutine();
        fetchCourses();
        console.log(classes)
    }, [currentSelectedProgram, currentSelectedBatch]);

    let mergeCount = 0;
    const [selection, setSelection] = useState({ start: null, end: null});
    const [editStart, setEditStart] = useState(8);
    const [selectedDay, setSelectedDay] = useState('');
    const [editDuration, setEditDuration] = useState(1);
    const [classExists, setClassExists] = useState(false);
    const [offset, setOffset] = useState(0);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentSelectedRoom, setCurrentSelectedRoom] = useState();
    const [currentSelectedDay, setCurrentSelectedDay] = useState();
    const [filterRoom, setFilterRoom] = useState(false);
    const [allocatedClass, setAllocatedClass] = useState([]);

    const fetchRoutineByRoom = async () => {
        const request = {
            room_no: currentSelectedRoom,
        }
        
        const response = await fetch('http://127.0.0.1:8000/routine/get_allocations_by_room/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })

        if(!response.ok) {
            throw new Error('Failed to fetch routine by room')
        }

        const data = await response.json();
        setAllocatedClass(data)
    }

    useEffect(() => {
        fetchRoutineByRoom();
    }, [currentSelectedRoom])

    const handleProgramChange = (e) => {
        setCurrentSelectedProgram(e.target.value);
    }

    const handleRoomChange = (e) => {
        setCurrentSelectedRoom(parseInt(e.target.value));
        setFilterRoom(true);
    }

    const handleBatchChange = (e) => {
        setCurrentSelectedBatch(e.target.value);
    }

    const checkTimeRange = (allocations, day, time) => {
        const [hour, minute] = time.split(':').map(Number);
        
        return allocations.some((cls) => {
            const [startHour, startMinute] = cls.StartTime.split(':').map(Number);
            const [endHour, endMinute] = cls.EndTime.split(':').map(Number);

            const existsInClassessArray = classes.some(
                (c) => c.WeekDay === cls.WeekDay && c.StartTime === cls.StartTime
            )
            if (existsInClassessArray) {
                return (
                    (cls.WeekDay === day) &&
                    (hour === startHour)
                )
            } else {
                return (
                    (cls.WeekDay === day) &&
                    (hour > startHour || hour === startHour) &&
                    (hour < endHour)
                )
            }
        })
    }

    const roomNotAvailable = (day, time) => {
        if(filterRoom) {
            let roomAllocations = allocatedClass;
            return checkTimeRange(roomAllocations, day, time);
        } else {
            return false;
        }
    }

    const checkClassExistence = (day, time) => {
        time = times[editStart - 7]
        const classInfo = classes.find(
            (cls) =>
                cls.WeekDay === day &&
                cls.StartTime === time
        )
        
        if (classInfo) {
            setClassExists(true)
        }
    }

    function handleButtonClick() {
        setIsCreateModalOpen(true);
    }

    

    const handleAddExistingClass = (newRoutine) => {
        const updatedList = [...routineList, newRoutine];

        setRoutineList(updatedList);
    }

    const getActualTime = (displayedTime) => {
        const index = times.indexOf(displayedTime);
        console.log('sending to the modal: ', displayedTime)

        let totalMergedDuration = 0;
        
        let maxIteration = index
        

        for (let i = 0; i < maxIteration; i++) {
            const classInfo = classes.find(
                (cls) => 
                    cls.WeekDay === selection.start.day &&
                    cls.StartTime === times[i]
            );

            if (classInfo) {
                const duration = calculateTimeDuration(
                    classInfo.StartTime,
                    classInfo.EndTime
                );
                
                console.log(duration)

                totalMergedDuration += duration;
            } else {
                totalMergedDuration += 1
            }
        }

        return 7 + totalMergedDuration;
    }

    const handleMouseDown = (day, time) => {
        console.log("clicked on ", time)
        setSelection({ start: { day, time }, end: { day, time } });
        setCurrentSelectedDay(day);
        
        let classInfo = classes.find((cls) => cls.WeekDay === day && cls.StartTime === time)
        if(classInfo) {
            console.log(classInfo)
            setClassExists(true)
            setClassID(classInfo.Id)
        }
    }

    const handleMouseEnter = (day, time) => {
        if (selection.start && selection.start.day && selection.start.time) {
            if (day === selection.start.day) {
                const inClassInfo = classes.find((cls) => cls.WeekDay === day && cls.StartTime === time)
                console.log("adsf", getActualTime(time))
                if (inClassInfo) {
                    const duration = calculateTimeDuration(inClassInfo.StartTime, inClassInfo.EndTime)
                    let newOff = offset + duration - 1;
                    setOffset(newOff);
                    setClassExists(true)
                }

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
        const actualStartTime = getActualTime(selection.start.time)
        setEditStart(actualStartTime)

        const timeInStr = times[actualStartTime - 7]

        const classInfo = classes.find(
            (cls) => cls.WeekDay === selection.start.day && cls.StartTime === timeInStr
        );

        if (classInfo) {
            const duration = calculateTimeDuration(
              classInfo.StartTime,
              classInfo.EndTime
            );

            let name = classInfo.Course;
            let room = classInfo.RoomNo
            
            setCourse(name)
            setCurrentSelectedRoom(room)

            setEditDuration(duration);
            setClassID(classInfo.Id)

            setClassExists(true)
        } else {
            console.log(timeInStr, selection.start.time, selection.end.time)
            const duration = calculateTimeDuration(selection.start.time, selection.end.time)
            setEditDuration(duration + 1)
            setClassID(null)
        }

        setSelection({ start: null, end: null })

        if(selection.start && selection.end) {
            setIsCreateModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setClassExists(false);
        setCourse('');
        setCurrentSelectedRoom();
        setOffset(0);
        setClassID(null);
    }

    const toast = useToast();
    const handleSave = (classData) => {
        toast({
            position: 'top-left',
            title: 'Saving',
            status: 'info',
            duration: 9000,
            isClosable: true,
        })
        const data = {
            routine: classData,
            program: currentSelectedProgram,
            batch: currentSelectedBatch,
        }

        fetch('http://127.0.0.1:8000/routine/save_routine/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error('Response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success: ', data);
            fetchRoutine();
            toast.close();
            toast({
                title: 'Saved successfully',
                status: 'success',
                position: 'top-left',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((error) => {
            console.error('Error: ', error);
            toast.close();
            toast({
                title: 'Saving Failed',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    const handleUpdate = (classData) => {
        toast({
            title: 'Updating',
            status: 'info',
            position: 'top-left',
            duration: 9000,
            isClosable: true,
        })
        const data = {routine: classData}

        fetch('http://127.0.0.1:8000/routine/update_routine/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then(data => {
            console.log('Success', data);
            fetchRoutine();
            setClassID(null);
            toast({
                title: 'Update Successful',
                status: 'success',
                position: 'top-left',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((error) => {
            console.error('Error: ', error)
            toast({
                title: 'Update failed',
                status: 'error',
                position: 'top-left',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    const handleDelete = (classData) => {
        toast({
            title: 'Deleting',
            status: 'info',
            position: 'top-left',
            duration: 9000,
            isClosable: true,
        })
        const data = {
            routine: classData,
            program: currentSelectedProgram,
            batch: currentSelectedBatch
        }

        fetch('http://127.0.0.1:8000/routine/delete_routine/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error('Failed to delete routine');
            }
            return response.json()
        })
        .then((responseData) => {
            console.log('Routine deleted: ', responseData);
            fetchRoutine();
            toast({
                title: 'Delete successful',
                status: 'success',
                position: 'top-left',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((error) => {
            console.error('Error deleting routine: ', error);
            toast({
                title: 'Delete failed',
                status: 'error',
                position: 'top-left',
                duration: 3000,
                isClosable: true,
            })
        })
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
                cls.WeekDay === day &&
                cls.StartTime === time
        )
    }

    const calculateTimeDuration = (start, end) => {
        const [startHour, startMinute] = start.split(':');
        const [endHour, endMinute] = end.split(':');
        
        const startDate = parseInt(startHour, 10) + (start.includes('PM') && startHour !== '12' ? 12 : 0);
        const endDate = parseInt(endHour, 10) + (end.includes('PM') && endHour !== '12' ? 12 : 0);

        const durationInHours = (endDate - startDate);

        return durationInHours;
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
            if(classItem.WeekDay === draggingClass.weekday) {
                classItem.WeekDay = endDay;
            }
            return classItem;
        })

        setClasses(updateClasses);
        setDraggingClass(null);
    }

    const getTimeConsiderMerge = (time, mergeCount) => {
        const timeIndex = times.indexOf(time)
        const actualTime = times[timeIndex + mergeCount]

        return actualTime;
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
                        <Select placeholder='Programs' value={currentSelectedProgram} onChange={handleProgramChange}>
                            {programs.map((program) => (
                                <option value={program}>{program}</option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem colSpan={1} colStart={10} m={1}>
                        <Select placeholder='Batch' value={currentSelectedBatch} onChange={handleBatchChange}>
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
                            onSave={handleSave}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            id={classID}
                            day={currentSelectedDay}
                            start={editStart}
                            duration={editDuration}
                            classExists={classExists}
                            offset={offset}
                            courses={courses}
                            course={course}
                            room={currentSelectedRoom}
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
                                    <Grid templateColumns={`repeat(${times.length}, 1fr)`} userSelect="none">
                                       
                                                {times.map((time, colIndex) => {

                                                    if (colIndex + 1 > times.length - mergeCount) {
                                                        if (colIndex == times.length - 1) {
                                                            mergeCount = 0;
                                                        }
                                                        
                                                        return null;
                                                    }

                                                    const realTime = getTimeConsiderMerge(time, mergeCount)
                                                    
                                                        const classInfo = classes.find(
                                                            (cls) => 
                                                                cls.WeekDay === day &&
                                                                cls.StartTime === realTime
                                                        )

                                                        let colSpan = 1;
                                                        if(classInfo) {
                                                            const duration = calculateTimeDuration(classInfo.StartTime, classInfo.EndTime)
                                                            colSpan = times.indexOf(time) + duration > times.length ? times.length - times.indexOf(time) : duration;
                                                            
                                                            if (colSpan > 1) {
                                                                mergeCount += colSpan - 1;
                                                            }
                                                        }
                                                        
                                                        

                                                        return (
                                                            <GridItem
                                                                colSpan={colSpan}
                                                                onMouseDown={() => handleMouseDown(day, time)}
                                                                onMouseEnter={() => handleMouseEnter(day, time)}
                                                                onMouseUp={handleMouseUp}
                                                                bg={
                                                                    isSelectedCell(day, time)
                                                                        ? 'blue.200'
                                                                        : filterRoom && roomNotAvailable(day, time)
                                                                        ? 'red.300'
                                                                        : 'transparent'
                                                                }
                                                                cursor={
                                                                    filterRoom && roomNotAvailable(day, time)
                                                                        ? 'not-allowed'
                                                                        : 'pointer'
                                                                }
                                                                pointerEvents={
                                                                    filterRoom && roomNotAvailable(day, time)
                                                                        ? 'none'
                                                                        : 'auto'
                                                                }
                                                            >
                                                                {isClassTime(day, realTime) && (
                                                                    <Box 
                                                                        minHeight="50px"
                                                                        // bg={roomNotAvailable(day, time) ? "red.300" : "transparent"}
                                                                    >
                                                                        <TimeBlock
                                                                            time={realTime}
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