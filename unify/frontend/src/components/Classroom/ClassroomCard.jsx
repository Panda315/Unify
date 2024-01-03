  // import React from 'react';
  // import { Box, Text, Avatar } from '@chakra-ui/react';
  // import { Link } from 'react-router-dom';

  // function getRandomColor() {
  //   const colors = ['#FF5733', '#33FF9F', '#337DFF', '#FF3389'];
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //   return randomColor;
  // }



  // function ClassroomCard({ Id, title, courseCode, instructor }) {
  //   const upperBackgroundColor = getRandomColor();
  //   const queryString = `?title=${encodeURIComponent(title)}&courseCode=${encodeURIComponent(courseCode)}&instructor=${encodeURIComponent(instructor)}`;

  //   const avatarLetters = title.split(' ').map(word => word.charAt(0)).join('');

  //   return (
  //     <Link to={`/classroom/${Id}${queryString}`}>
  //       <Box
  //         bg="white"
  //         p={6}
  //         borderRadius="xl"
  //         boxShadow="xl"
  //         borderWidth="2px"
  //         borderColor="gray.200"
  //         w="400px"
  //         position="relative"
  //         h="250px"
  //         transition="transform 0.2s"
  //         _hover={{
  //           transform: "scale(1.05)",
  //           cursor: "pointer"
  //         }}
  //       >
  //         <Avatar
  //           size="xl"
  //           name={title}
  //           src={`https://ui-avatars.com/api/?name=${avatarLetters}&background=${upperBackgroundColor}&color=fff`}
  //           position="absolute"
  //           top={2}
  //           right={2}
  //         />
  //         <Text mt={2} fontSize="md" color="gray.800">
  //           {courseCode}
  //         </Text>
  //         <Text fontWeight="bold" fontSize="xl">
  //           {title}
  //         </Text>
  //         <Text mt={2} fontSize="md" color="gray.600">
  //           {instructor}
  //         </Text>
  //         <hr style={{ borderTop: '3px solid #e2e8f0', width: '100%', marginTop: '10px' }} />
  //       </Box>
  //     </Link>
  //   );
  // }

  // export default ClassroomCard;


  // import React from 'react';
  // import { Box, Text, Avatar } from '@chakra-ui/react';
  // import { Link } from 'react-router-dom';

  // function getRandomColor() {
  //   const colors = ['#FF5733', '#33FF9F', '#337DFF', '#FF3389'];
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //   return randomColor;
  // }

  // function ClassroomCard({ Id, title, courseCode, instructor }) {
  //   const upperBackgroundColor = getRandomColor();
  //   const queryString = `?title=${encodeURIComponent(title)}&courseCode=${encodeURIComponent(courseCode)}&instructor=${encodeURIComponent(instructor)}`;

  //   const avatarLetters = title.split(' ').map(word => word.charAt(0)).join('');

  //   return (
  //     <Link to={`/classroom/${Id}${queryString}`}>
  //       <Box
  //         bg="white"
  //         p={6}
  //         borderRadius="xl"
  //         boxShadow="xl"
  //         borderWidth="2px"
  //         borderColor="gray.200"
  //         w="400px"
  //         position="relative"
  //         h="250px"
  //         transition="transform 0.01s"
  //         _hover={{
  //           transform: "scale(1.03)",
  //           cursor: "pointer"
  //         }}
  //       >
  //         <Avatar
  //           size="xl"
  //           name={avatarLetters}
  //           bg={upperBackgroundColor}
  //           color="white"
  //           position="absolute"
  //           top={2}
  //           right={2}
  //         />
  //         <Text mt={2} fontSize="md" color="gray.800">
  //           {courseCode}
  //         </Text>
  //         <Text fontWeight="bold" fontSize="xl">
  //           {title}
  //         </Text>
  //         <Text mt={2} fontSize="md" color="gray.600">
  //           {instructor}
  //         </Text>
  //         <hr style={{ borderTop: '3px solid #e2e8f0', width: '100%', marginTop: '10px' }} />
  //       </Box>
  //     </Link>
  //   );
  // }

  // export default ClassroomCard;
  import React, { useState, useEffect } from 'react';
  import { Box, Text, Avatar } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  
  function getRandomColor() {
    const colors = ['#FF5733', '#33FF9F', '#337DFF', '#FF3389'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  }
  
  async function fetchData() {
    try {
    
      const response = await fetch('your_api_endpoint');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
      return null;
    }
  }
  
  function ClassroomCard({ Id, title, courseCode, instructor }) {
    const [fetchedData, setFetchedData] = useState(null);
  
    useEffect(() => {
      async function fetchDataAsync() {
        const data = await fetchData();
        setFetchedData(data);
      }
      fetchDataAsync();
    }, []);
  
    const upperBackgroundColor = getRandomColor();
    const queryString = `?title=${encodeURIComponent(title)}&courseCode=${encodeURIComponent(courseCode)}&instructor=${encodeURIComponent(instructor)}`;
  
    const avatarLetters = title.split(' ').map(word => word.charAt(0)).join('');
  
    return (
      <Link to={`/classroom/${Id}${queryString}`}>
        <Box
          bg="white"
          p={6}
          borderRadius="xl"
          boxShadow="xl"
          borderWidth="2px"
          borderColor="gray.200"
          w="400px"
          position="relative"
          h="250px"
          transition="transform 0.01s"
          _hover={{
            transform: "scale(1.03)",
            cursor: "pointer"
          }}
        >
          <Avatar
            size="xl"
            name={avatarLetters}
            bg={upperBackgroundColor}
            color="white"
            position="absolute"
            top={2}
            right={2}
          />
          <Text mt={2} fontSize="md" color="gray.800">
            {courseCode}
          </Text>
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <Text mt={2} fontSize="md" color="gray.600">
            {instructor}
          </Text>
          <hr style={{ borderTop: '3px solid #e2e8f0', width: '100%', marginTop: '10px' }} />
        </Box>
      </Link>
    );
  }
  
  export default ClassroomCard;
  