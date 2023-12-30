// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Heading,
// //   FormControl,
// //   FormLabel,
// //   Input,
// //   Button,
// // } from '@chakra-ui/react';

// // function CreateClassroom() {
// //   const [userToken, setUserToken] = useState('');
// //   const [courseCode, setCourseCode] = useState('');

// //   useEffect(() => {
// //     const tokenFromStorage = localStorage.getItem('token');
// //     if (tokenFromStorage) {
// //       setUserToken(tokenFromStorage);
// //     } else {
// //       console.error('User token not found in local storage');
// //     }
// //   }, []);

// //   const handleCourseCodeChange = (e) => {
// //     setCourseCode(e.target.value);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Perform the submission to the backend with the course code
// //     try {
// //       const response = await fetch('http://localhost:8000/createclassroom/', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${userToken}`,
// //         },
// //         body: JSON.stringify({
// //             course_code: courseCode,
// //             token: userToken,
// //         }),
// //       });

// //       if (response.ok) {
// //         // Handle successful submission
// //         console.log('Classroom created successfully!');
// //         // Optionally, reset the form fields after successful submission
// //         setCourseCode('');
// //       } else {
// //         console.error('Failed to create classroom');
// //       }
// //     } catch (error) {
// //       console.error('Error creating classroom:', error);
// //     }
// //   };

// //   return (
// //     <Box p="4" maxWidth="400px" mx="auto">
// //       <Heading as="h2" size="lg" mb="4">
// //         Create Classroom
// //       </Heading>
// //       <form onSubmit={handleSubmit}>
// //         <FormControl>
// //           <FormLabel htmlFor="courseCode">Course Code:</FormLabel>
// //           <Input
// //             type="text"
// //             id="courseCode"
// //             value={courseCode}
// //             onChange={handleCourseCodeChange}
// //             required
// //             variant="filled"
// //             borderColor="gray.300"
// //             _hover={{ borderColor: 'gray.400' }}
// //             _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
// //             placeholder="Enter Course Code"
// //           />
// //         </FormControl>
// //         <Button
// //           mt="4"
// //           colorScheme="blue"
// //           type="submit"
// //           width="100%"
// //           borderRadius="md"
// //         >
// //           Submit
// //         </Button>
// //       </form>
// //     </Box>
// //   );
// // }

// // export default CreateClassroom;


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Text,
// } from '@chakra-ui/react';

// function CreateClassroom() {
//   const [userToken, setUserToken] = useState('');
//   const [courseCode, setCourseCode] = useState('');
//   const [joiningCode, setJoiningCode] = useState('');
//   const [isCopied, setIsCopied] = useState(false);

//   useEffect(() => {
//     const tokenFromStorage = localStorage.getItem('token');
//     if (tokenFromStorage) {
//       setUserToken(tokenFromStorage);
//     } else {
//       console.error('User token not found in local storage');
//     }
//   }, []);

//   const handleCourseCodeChange = (e) => {
//     setCourseCode(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform the submission to the backend with the course code
//     try {
//       const response = await fetch('http://localhost:8000/createclassroom/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify({
//           course_code: courseCode,
//           token: userToken,
//         }),
//       });

//       if (response.ok) {
//         // Handle successful submission
//         console.log('Classroom created successfully!');
//         const data = await response.json();
//         console.log(data);
//         setJoiningCode(data.joiningCode); // Assuming the joining code is returned from the backend
//         setIsCopied(false); // Reset isCopied state
//         // Optionally, reset the form fields after successful submission
//         setCourseCode('');
//       } else {
//         console.error('Failed to create classroom');
//       }
//     } catch (error) {
//       console.error('Error creating classroom:', error);
//     }
//   };

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(joiningCode);
//     setIsCopied(true);
//   };

//   return (
//     <Box p="4" maxWidth="400px" mx="auto">
//       <Heading as="h2" size="lg" mb="4">
//         Create Classroom
//       </Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl>
//           <FormLabel htmlFor="courseCode">Course Code:</FormLabel>
//           <Input
//             type="text"
//             id="courseCode"
//             value={courseCode}
//             onChange={handleCourseCodeChange}
//             required
//             variant="filled"
//             borderColor="gray.300"
//             _hover={{ borderColor: 'gray.400' }}
//             _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
//             placeholder="Enter Course Code"
//           />
//         </FormControl>
//         <Button
//           mt="4"
//           colorScheme="blue"
//           type="submit"
//           width="100%"
//           borderRadius="md"
//         >
//           Submit
//         </Button>
//       </form>

//       {joiningCode && (
//         <Box mt="4" p="2" borderWidth="1px" borderColor="gray.300">
//           <Text mb="2">Joining Code: {joiningCode}</Text>
//           <Button onClick={handleCopyCode} isDisabled={isCopied}>
//             {isCopied ? 'Copied!' : 'Copy Joining Code'}
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default CreateClassroom;



// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Text,
// } from '@chakra-ui/react';

// function CreateClassroom() {
//   const [userToken, setUserToken] = useState('');
//   const [courseCode, setCourseCode] = useState('');
//   const [joiningCode, setJoiningCode] = useState('');
//   const [isCopied, setIsCopied] = useState(false);

//   useEffect(() => {
//     const tokenFromStorage = localStorage.getItem('token');
//     if (tokenFromStorage) {
//       setUserToken(tokenFromStorage);
//     } else {
//       console.error('User token not found in local storage');
//     }
//   }, []);

//   const handleCourseCodeChange = (e) => {
//     setCourseCode(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform the submission to the backend with the course code
//     try {
//       const response = await fetch('http://localhost:8000/createclassroom/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken}`,
//         },
//         body: JSON.stringify({
//           course_code: courseCode,
//           token: userToken,
//         }),
//       });

//       if (response.ok) {
//         // Handle successful submission
//         console.log('Classroom created successfully!');
//         const data = await response.json();
//         setJoiningCode(data.joiningCode); // Assuming the joining code is returned from the backend
//         setIsCopied(false); // Reset isCopied state
//         // Optionally, reset the form fields after successful submission
//         setCourseCode('');
//       } else {
//         console.error('Failed to create classroom');
//       }
//     } catch (error) {
//       console.error('Error creating classroom:', error);
//     }
//   };

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(joiningCode);
//     setIsCopied(true);

//     // Reset the "Copied" state after 3 seconds
//     setTimeout(() => {
//       setIsCopied(false);
//     }, 3000); // Reset after 3 seconds (3000 milliseconds)
//   };

//   return (
//     <Box p="4" maxWidth="400px" mx="auto">
//       <Heading as="h2" size="lg" mb="4">
//         Create Classroom
//       </Heading>
//       <form onSubmit={handleSubmit}>
//         <FormControl>
//           <FormLabel htmlFor="courseCode">Course Code:</FormLabel>
//           <Input
//             type="text"
//             id="courseCode"
//             value={courseCode}
//             onChange={handleCourseCodeChange}
//             required
//             variant="filled"
//             borderColor="gray.300"
//             _hover={{ borderColor: 'gray.400' }}
//             _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
//             placeholder="Enter Course Code"
//           />
//         </FormControl>
//         <Button
//           mt="4"
//           colorScheme="blue"
//           type="submit"
//           width="100%"
//           borderRadius="md"
//         >
//           Submit
//         </Button>
//       </form>

//       {joiningCode && (
//         <Box mt="4" p="2" borderWidth="1px" borderColor="gray.300">
//           <Text mb="2">Joining Code: {joiningCode}</Text>
//           <Button onClick={handleCopyCode} isDisabled={isCopied}>
//             {isCopied ? 'Copied!' : 'Copy Joining Code'}
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default CreateClassroom;



import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

function CreateClassroom() {
  const [userToken, setUserToken] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [joiningCode, setJoiningCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setUserToken(tokenFromStorage);
    } else {
      console.error('User token not found in local storage');
    }
  }, []);

  const handleCourseCodeChange = (e) => {
    setCourseCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform the submission to the backend with the course code
    try {
      const response = await fetch('http://localhost:8000/createclassroom/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          course_code: courseCode,
          token: userToken,
        }),
      });

      if (response.ok) {
        // Handle successful submission
        console.log('Classroom created successfully!');
        const data = await response.json();
        setJoiningCode(data.joiningCode); // Assuming the joining code is returned from the backend
        setIsCopied(false); // Reset isCopied state
        // Optionally, reset the form fields after successful submission
        setCourseCode('');
      } else {
        console.error('Failed to create classroom');
      }
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(joiningCode);
    setIsCopied(true);
  };

  return (
    <Box p="4" maxWidth="400px" mx="auto">
      <Heading as="h2" size="lg" mb="4">
        Create Classroom
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="courseCode">Course Code:</FormLabel>
          <Input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={handleCourseCodeChange}
            required
            variant="filled"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
            placeholder="Enter Course Code"
          />
        </FormControl>
        <Button
          mt="4"
          colorScheme="blue"
          type="submit"
          width="100%"
          borderRadius="md"
        >
          Submit
        </Button>
      </form>

      {!isCopied && joiningCode && (
        <Box mt="4" p="2" borderWidth="1px" borderColor="gray.300">
          <Text mb="2">Joining Code: {joiningCode}</Text>
          <Button onClick={handleCopyCode}>Copy and store it safely.</Button>
        </Box>
      )}
    </Box>
  );
}

export default CreateClassroom;
