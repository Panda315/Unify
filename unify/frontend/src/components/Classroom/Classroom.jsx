import React, { useState, useEffect } from 'react';
import ClassroomCard from './ClassroomCard'; // Assuming the path to your ClassroomCard component
import CreateClassroom from './CreateClassroom';
import JoinClassroom from './JoinClassroom';

function Classroom() {
    const [classrooms, setClassrooms] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [userToken, setUserToken] = useState('');

    useEffect(() => {
        // Fetch user role from local storage
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
        // Fetch classrooms based on the user's role from the backend API
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
            }
        };

        if (userRole) {
            fetchClassrooms();
        }
    }, [userRole]);


    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', margin:'2rem' }}>
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

            
            {userRole === 'faculty' && (
                <>
                    <CreateClassroom />
                </>
            )}

            {userRole === 'student' && (
                <>
                    <JoinClassroom/>
                </>
            )}
        </div>
    );
}

export default Classroom;
