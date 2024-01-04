// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Text, Grid } from '@chakra-ui/react';
// import DeleteClassroom from './DeleteClassroom';
// import Calendar from 'react-calendar'; // Import Calendar component from react-calendar
// import FileUpload from '../FIleUpload/FileUpload';

// function SingleClassroom() {
//   const { Id } = useParams(); // Extract parameters from the URL
//   const queryParams = new URLSearchParams(window.location.search);
  
//   // Retrieve the values from query parameters
//   const title = queryParams.get('title');
//   const courseCode = queryParams.get('courseCode');
//   const instructor = queryParams.get('instructor');
  
//   const [classroom, setClassroom] = useState(null);

//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//       // Fetch user role from local storage
//       const roleFromStorage = localStorage.getItem('role');
//       if (roleFromStorage) {
//           setUserRole(roleFromStorage);
//       } else {
//           console.error('User role not found in local storage');
//       }

//   }, []);
  
//   useEffect(() => {
//     // Simulated delay to mimic API call for classroom details
//     const delay = setTimeout(() => {
//       setClassroom({
//         id: Id,
//         title: decodeURIComponent(title),
//         courseCode: decodeURIComponent(courseCode),
//         instructor: decodeURIComponent(instructor)
//       });
//     }, 1000); // Simulating a delay of 1 second (1000 milliseconds)
    
//     return () => clearTimeout(delay); // Clear timeout on unmount
//   }, [Id, title, courseCode, instructor]);
  
//   if (!classroom) {
//     return <div>Loading...</div>; // Display a loading message while fetching data
//   }

//   return (
//     <Grid
//       templateColumns="1fr 2fr 1fr" // Three columns: 1st column, 2nd column, 3rd column
//       height="100vh" // Set the height of the grid to full viewport height
// >
//       <Box gridColumn="1 / 2"
//         marginTop="2rem"
//       > {/* First column */}

// {userRole === 'faculty' && (
//                 <>
//                     <DeleteClassroom />
//                 </>
//             )}

//             <FileUpload classroom_id={Id}/>



      
      
        
//       </Box>
//       <Box gridColumn="2 / 3"> {/* Second column */}
//         <Box
//           width="100%"
//           height="300px"
//           backgroundColor="blue.300" // Change background color here (replace blue.300 with your color)
//           borderRadius="xl"
//           boxShadow="lg"
//           p={6}
//           color="white"
//           marginTop="2rem"
//         >
//           <Text as="h2" fontSize="2xl" fontWeight="bold" mb={2}>
//             {classroom.title}
//           </Text>
//           <Text fontSize="xl" fontWeight="bold" mb={2}>
//             {classroom.courseCode}
//           </Text>
//           <Text fontSize="xl" fontWeight="bold">
//             {classroom.instructor}
//           </Text>
//             {Id}
//         </Box>
//         Announcement and assignment notices are to be shown here
//       </Box>
//       <Box gridColumn="3 / 4" marginLeft="4rem" marginTop="3rem"> {/* Third column */}
//         <Calendar /> {/* Render the Calendar component */}
      
//       </Box>
//     </Grid>
//   );
// }

// export default SingleClassroom;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Grid } from '@chakra-ui/react';
import DeleteClassroom from './DeleteClassroom';
import Calendar from 'react-calendar'; // Import Calendar component from react-calendar
import FileUpload from '../FIleUpload/FileUpload';
import LoadAssignments from './LoadAssignments';

import Attendance from '../Attendance/Attendance';

function SingleClassroom() {
  const { Id } = useParams(); // Extract parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  
  // Retrieve the values from query parameters
  const title = queryParams.get('title');
  const courseCode = queryParams.get('courseCode');
  const instructor = queryParams.get('instructor');
  
  const [classroom, setClassroom] = useState(null);

  const [userRole, setUserRole] = useState('');
  const [userToken, setUserToken] = useState('');

  const [assignments, setAssignments] = useState([]);

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
    // Fetch user role from local storage
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
        setUserToken(tokenFromStorage);
    } else {
        console.error('User token not found in local storage');
    }

}, []);


  


  
  useEffect(() => {
    // Simulated delay to mimic API call for classroom details
    const delay = setTimeout(() => {
      setClassroom({
        id: Id,
        title: decodeURIComponent(title),
        courseCode: decodeURIComponent(courseCode),
        instructor: decodeURIComponent(instructor)
      });
    }, 1000); // Simulating a delay of 1 second (1000 milliseconds)
    
    return () => clearTimeout(delay); // Clear timeout on unmount
  }, [Id, title, courseCode, instructor]);
  
  if (!classroom) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <Grid
      templateColumns="1fr 2fr 1fr" // Three columns: 1st column, 2nd column, 3rd column
      height="100vh" // Set the height of the grid to full viewport height
>
      <Box gridColumn="1 / 2"
        marginTop="2rem"
      > {/* First column */}

{userRole === 'faculty' && (
                <>
                    <DeleteClassroom />
                </>
            )}

            <FileUpload classroom_id={Id}/>



      
      
        
      </Box>
      <Box gridColumn="2 / 3"> {/* Second column */}
        <Box
          width="100%"
          height="300px"
          backgroundColor="blue.300" // Change background color here (replace blue.300 with your color)
          borderRadius="xl"
          boxShadow="lg"
          p={6}
          color="white"
          marginTop="2rem"
        >
          <Text as="h2" fontSize="2xl" fontWeight="bold" mb={2}>
            {classroom.title}
          </Text>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {classroom.courseCode}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {classroom.instructor}
          </Text>
            {Id}
        </Box>
        <LoadAssignments classroomId={Id} token={userToken}/>
      </Box>
      <Box gridColumn="3 / 4" marginLeft="4rem" marginTop="3rem"> {/* Third column */}
        <Calendar /> {/* Render the Calendar component */}
        <Attendance />
      </Box>
    </Grid>
  );
}

export default SingleClassroom;