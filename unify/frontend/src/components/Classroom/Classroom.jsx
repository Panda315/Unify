
import React, { useState, useEffect } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';
import ClassroomCard from './ClassroomCard'; // Assuming the path to your ClassroomCard component
import CreateClassroom from './CreateClassroom';
import JoinClassroom from './JoinClassroom';
import LeaveClassroom from "./LeaveClassroom";

function Classroom() {
    const [classrooms, setClassrooms] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [userToken, setUserToken] = useState('');
    const [isLoading, setIsLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        const roleFromStorage = localStorage.getItem('role');
        if (roleFromStorage) {
            setUserRole(roleFromStorage);
        } else {
            console.error('User role not found in local storage');
        }

    }, []);

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('token');
        if(tokenFromStorage){
            setUserToken(tokenFromStorage);
        }
        else {
            console.error('User token not found in local storage');
        }
    }, [])

    useEffect(() => {
        setIsLoading(true); // Set loading to true initially

        const fetchClassrooms = async () => {
            try {
                const response = await fetch('http://localhost:8000/loadclassroom/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        role: userRole,
                        token: userToken,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setClassrooms(data); // Set the fetched classrooms to state
                } else {
                    console.error('Failed to fetch classrooms');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Update loading state to false after fetching
            }
        };

        if (userRole) {
            fetchClassrooms();
        }
    }, [userRole]);

    return (
        <div>
            {isLoading ? ( // Render spinner if isLoading is true
                <Flex justifyContent="center" alignItems="center" height="100vh">
                    <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
                </Flex>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', margin: '2rem' }}>
                    {classrooms.map((classroom) => (
                        <ClassroomCard
                            key={classroom.Id}
                            Id={classroom.Id}
                            title={classroom.CourseName}
                            courseCode={classroom.CourseCode}
                            instructor={classroom.InstructorName}
                        />
                    ))}
                </div>
            )}

            {/* Render Join, Leave, and CreateClassroom components after loading */}
            {!isLoading && (
                <>
                    {userRole === 'faculty' && <CreateClassroom />}
                    {userRole === 'student' && (
                        <>
                            <JoinClassroom/>
                            <LeaveClassroom />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Classroom;
