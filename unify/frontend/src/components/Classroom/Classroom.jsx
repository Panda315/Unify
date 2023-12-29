
import React, { useState, useEffect } from 'react';
import ClassroomCard from './ClassroomCard'; // Assuming the path to your ClassroomCard component
import FileUpload from '../FIleUpload/FileUpload';
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
            console.error('User role found in local storage');
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
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {classrooms.map((classroom) => (
                    <ClassroomCard
                        key={classroom.Id} 
                        title={classroom.CourseName}
                        courseCode={classroom.CourseCode}
                        instructor={classroom.InstructorName}
                    />
                ))}
            </div>

            <FileUpload/>
        </div>
    );
}

export default Classroom;



// import React, { useState, useEffect } from 'react';
// import ClassroomCard from './ClassroomCard'; // Assuming the path to your ClassroomCard component
// import { VStack, Text, Box, SimpleGrid } from '@chakra-ui/react'; // Import necessary Chakra UI components

// function Classroom() {
//     const [classrooms, setClassrooms] = useState([]);
//     const [userRole, setUserRole] = useState('');
//     const [userToken, setUserToken] = useState('');

//     useEffect(() => {
//         // Fetch user role from local storage
//         const roleFromStorage = localStorage.getItem('role');
//         if (roleFromStorage) {
//             setUserRole(roleFromStorage);
//         } else {
//             console.error('User role found in local storage');
//         }

//     }, []);

//     useEffect(() => {
//         const tokenFromStorage = localStorage.getItem('token');
//         if(tokenFromStorage){
//             setUserToken(tokenFromStorage);
//         }
//         else {
//             console.error('User token not found in local storage');
//         }
//     }, [])

//     useEffect(() => {
//         // Fetch classrooms based on the user's role from the backend API
//         const fetchClassrooms = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/loadclassroom/', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         role: userRole,
//                         token: userToken,
//                     }),
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setClassrooms(data); // Set the fetched classrooms to state
//                 } else {
//                     console.error('Failed to fetch classrooms');
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         if (userRole) {
//             fetchClassrooms();
//         }
//     }, [userRole]);

//     return (
//         <HStack
//         h="100%"
//         w="100%"
//         display="flex"
//         alignItems="stretch"
//     >
//         <VStack
//             w="200px"
//             bg="white"
//             color="black"
//             p={4}
//             spacing={4}
//             mt="25px"
//             justifyContent="flex-start"
//             alignItems="flex-start"
//             position="fixed"
//             height="100%"
//             overflowY="auto" // Enable vertical scrolling
//             borderRight="1px solid #e2e8f0" // Add right-side border
//             cursor="pointer"
//         >
//                   </HStack>
//             </VStack>

// <Box
//                 p={4}
//                 flexGrow={1}
//                 overflow="auto"
//                 mt="25px"
//                 ml="240px" // Add margin to start after the sidebar
//                 mr="60px" // Add margin on the right side
//             >

//             {/* Main Content */}
//                 <SimpleGrid columns={3} gap={4}>
//                     {classrooms.map((classroom) => (
//                         <ClassroomCard
//                             key={classroom.Id} 
//                             title={classroom.CourseName}
//                             courseCode={classroom.CourseCode}
//                             instructor={classroom.InstructorName}
//                             // Add other props as needed
//                         />
//                     ))}
//                 </SimpleGrid>
//             </Box>
//                 </HStack>
//     );
// }

// export default Classroom;
