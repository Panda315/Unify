// import React, { useState, useEffect } from 'react';
// import { Box, Text, Stack, Icon } from '@chakra-ui/react';
// import { CalendarIcon } from '@chakra-ui/icons';
// import DisplayPDF from './DisplayPdf';
// import LoadingSpinner from '../Loading/Loading';

// function LoadAssignments({ classroomId, token }) {
//   const [assignments, setAssignments] = useState([]);
//   const [dataFetched, setDataFetched] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // State for loading assignments

//   useEffect(() => {
//     if (!dataFetched) {
//       const fetchData = async () => {
//         try {
//           const response = await fetch('http://localhost:8000/downloadfile/', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               id: classroomId,
//               token: token,
//             }),
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setAssignments(data.flat());
//             setDataFetched(true);
//           } else {
//             console.error('Failed to fetch assignments');
//           }
//         } catch (error) {
//           console.error('Error fetching assignments:', error);
//         } finally {
//           setIsLoading(false); // Update loading state after fetching assignments
//         }
//       };

//       fetchData();
//     }
//   }, [classroomId, token, dataFetched]);

//   // Function to format date to 'MMM DD, YYYY' format
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
//   };

//   if (isLoading) {
//     return <LoadingSpinner />; // Render LoadingSpinner while fetching assignments
//   }

//   return (
//     <Box p="4">
//       <Text fontSize="xl" fontWeight="bold" mb="4">
//         Assignments
//       </Text>
//       {assignments.length === 0 && dataFetched ? (
//         <Text>No assignments to show</Text>
//       ) : (
//         <Stack spacing="4">
//           {assignments.map((assignment, index) => (
//             <Box
//               key={index}
//               p="4"
//               borderWidth="1px"
//               borderRadius="md"
//               boxShadow="md"
//               bg="white"
//             >
//               <Stack direction="row" align="center">
//                 <Icon as={CalendarIcon} color="gray.500" />
//                 <Text> {formatDate(assignment.uploaded_at)}</Text>
//               </Stack>
//               <Stack direction="row" align="center">
//                 {/* Display PDF name as a link */}
//                 {assignment.uploaded_file ? (
//                   <Text>{assignment.uploaded_file_name}</Text>
//                 ) : (
//                   <Text>Not a PDF file</Text>
//                 )}
//               </Stack>
//               {/* Render PDF if selected */}
//               {assignment.uploaded_file ? (
//                 <DisplayPDF pdfBase64String={assignment.uploaded_file} />
//               ) : null}
//               {/* Add more assignment details */}
//             </Box>
//           ))}
//         </Stack>
//       )}
//     </Box>
//   );
// }

// export default LoadAssignments;


import React, { useState, useEffect } from 'react';
import { Box, Text, Stack, Icon, Spinner } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons'; // Import the calendar icon
import DisplayPDF from './DisplayPdf';

function LoadAssignments({ classroomId, token }) {
  const [assignments, setAssignments] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    if (!dataFetched) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/downloadfile/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: classroomId,
              token: token,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data); // Check the received data structure
            setAssignments(data.flat()); // Flatten the nested array
            setDataFetched(true); // Set the state to indicate data has been fetched
          } else {
            console.error('Failed to fetch assignments');
          }
        } catch (error) {
          console.error('Error fetching assignments:', error);
        } finally {
          setIsLoading(false); // Set loading state to false after fetching data
        }
      };

      fetchData();
    }
  }, [classroomId, token, dataFetched]);

  // Function to format date to 'MMM DD, YYYY' format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Box p="4">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Assignments
      </Text>
      {isLoading ? ( // Show loading spinner while fetching assignments
        <Spinner />
      ) : assignments.length === 0 && dataFetched ? (
        <Text>No assignments to show</Text>
      ) : (
        <Stack spacing="4">
          {assignments.map((assignment, index) => (
            <Box
              key={index}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              bg="white"
            >
              <Stack direction="row" align="center">
                <Icon as={CalendarIcon} color="gray.500" />
                <Text> {formatDate(assignment.uploaded_at)}</Text>
              </Stack>
              <Stack direction="row" align="center">
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia magnam consectetur, eveniet quia eos velit corporis error ipsum, recusandae eaque dignissimos, aperiam sed. Magnam, praesentium dicta esse distinctio ipsum quam rem natus.
                </Text>
              </Stack>
              {assignment.uploaded_file ? (
                <DisplayPDF pdfBase64String={assignment.uploaded_file} />
              ) : (
                <Text>Not a PDF file</Text>
              )}
              {/* Add more assignment details */}
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default LoadAssignments;
