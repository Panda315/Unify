  // import React, { useState, useEffect } from 'react';
  // import { Box, Text, Stack, Icon, Spinner, Link as RouterLink } from '@chakra-ui/react';
  // import { CalendarIcon } from '@chakra-ui/icons';
  // import { Link } from 'react-router-dom';
  // import DisplayPDF from './DisplayPdf';

  // function LoadAssignments({ classroomId, token }) {
  //   const [assignments, setAssignments] = useState([]);
  //   const [dataFetched, setDataFetched] = useState(false);
  //   const [isLoading, setIsLoading] = useState(true);

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
  //           setIsLoading(false);
  //         }
  //       };

  //       fetchData();
  //     }
  //   }, [classroomId, token, dataFetched]);

  //   const formatDate = (dateStr) => {
  //     const date = new Date(dateStr);
  //     return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
  //   };

  //   return (
  //     <Box p="4">
  //       <Text fontSize="xl" fontWeight="bold" mb="4">
  //         Assignments
  //       </Text>
  //       {isLoading ? (
  //         <Spinner />
  //       ) : assignments.length === 0 && dataFetched ? (
  //         <Text>No assignments to show</Text>
  //       ) : (
  //         <Stack spacing="4">
  //           {assignments.map((assignment, index) => (
  //             <Link
  //               as={RouterLink}
  //               to={`/assignment/${assignment.id}`}
  //               key={index}
  //               textDecoration="none"
  //             >
  //               <Box
  //                 p="4"
  //                 borderWidth="1px"
  //                 borderRadius="md"
  //                 boxShadow="md"
  //                 bg="white"
  //                 cursor="pointer"
  //                 _hover={{ bg: 'gray.100' }}
  //               >
  //                 <Stack direction="row" align="center">
  //                   <Icon as={CalendarIcon} color="gray.500" />
  //                   <Text> {formatDate(assignment.uploaded_at)}</Text>
  //                 </Stack>
  //                 <Stack direction="row" align="center">
  //                   <Text>
  //                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia magnam consectetur, eveniet quia eos velit corporis error ipsum, recusandae eaque dignissimos, aperiam sed. Magnam, praesentium dicta esse distinctio ipsum quam rem natus.
  //                   </Text>
  //                 </Stack>
  //                 {assignment.uploaded_file ? (
  //                   <DisplayPDF pdfBase64String={assignment.uploaded_file} />
  //                 ) : (
  //                   <Text>Not a PDF file</Text>
  //                 )}
  //               </Box>
  //             </Link>
  //           ))}
  //         </Stack>
  //       )}
  //     </Box>
  //   );
  // }

  // export default LoadAssignments;



  import React, { useState, useEffect } from 'react';
  import { Box, Text, Stack, Icon, Spinner, Link as RouterLink } from '@chakra-ui/react';
  import { CalendarIcon } from '@chakra-ui/icons';
  import { Link } from 'react-router-dom';
  import DisplayPDF from './DisplayPdf';
  
  function LoadAssignments({ classroomId, token }) {
    const [assignments, setAssignments] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
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
              setAssignments(data.flat());
              setDataFetched(true);
  
              // Store assignments in session storage
              sessionStorage.setItem('assignmentsData', JSON.stringify(data.flat()));
            } else {
              console.error('Failed to fetch assignments');
            }
          } catch (error) {
            console.error('Error fetching assignments:', error);
          } finally {
            setIsLoading(false);
          }
        };
  
        fetchData();
      }
    }, [classroomId, token, dataFetched]);
  
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
    };
  
    return (
      <Box p="4">
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Assignments
        </Text>
        {isLoading ? (
          <Spinner />
        ) : assignments.length === 0 && dataFetched ? (
          <Text>No assignments to show</Text>
        ) : (
          <Stack spacing="4">
            {assignments.map((assignment, index) => (
              <Link
                as={RouterLink}
                to={`/assignment/${assignment.id}`}
                key={index}
                textDecoration="none"
              >
                <Box
                  p="4"
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                  bg="white"
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                >
                  <Stack direction="row" align="center">
                    <Icon as={CalendarIcon} color="gray.500" />
                    <Text> {formatDate(assignment.uploaded_at)}</Text>
                  </Stack>
                  <Stack direction="row" align="center">
                    <Text> {assignment.description}</Text>
                  </Stack>
                  {/* {assignment.uploaded_file ? (
                    <DisplayPDF pdfBase64String={assignment.uploaded_file} />
                  ) : (
                    <Text>Not a PDF file</Text>
                  )} */}
                </Box>
              </Link>
            ))}
          </Stack>
        )}
      </Box>
    );
  }
  
  export default LoadAssignments;
  