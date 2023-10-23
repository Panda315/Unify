// import React, { useState } from 'react';
// import {
//   VStack,
//   Text,
//   IconButton,
//   extendTheme,
//   ChakraProvider,
//   SimpleGrid,
//   Box,
//   HStack,
//   Spacer,
// } from '@chakra-ui/react';
// import { ArrowForwardIcon, DragHandleIcon, AddIcon, CheckIcon, EditIcon } from '@chakra-ui/icons'; // Import icons

// const customTheme = extendTheme({
//   styles: {
//     global: {
//       "html, body": {
//         height: "100%",
//       },
//     },
//   },
// });

// function Classroom() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [modalContent, setModalContent] = useState({ title: '', description: '', img: '' });

//   return (
//     <HStack
//       h="100%"
//       w="100%"
//       display="flex"
//       alignItems="stretch"
//     >
//       <VStack
//         w="200px"
//         bg="white"
//         color="black"
//         p={4}
//         spacing={4}
//         mt="25px"
//         justifyContent="flex-start"
//         alignItems="flex-start"
//         position="fixed"
//         height="100%"
//         overflowY="auto" // Enable vertical scrolling
//         borderRight="1px solid #e2e8f0" // Add right-side border
//       >
//         {/* Icons and Titles */}
//         <HStack spacing={2} alignItems="center">
//           <DragHandleIcon />
//           <Text>Home</Text>
//         </HStack>

//         <HStack spacing={2} alignItems="center">
//           <AddIcon />
//           <Text>Enroll</Text>
//         </HStack>

//         <HStack spacing={2} alignItems="center">
//           <CheckIcon />
//           <Text>Todo</Text>
//         </HStack>

//         <HStack spacing={2} alignItems="center">
//           <EditIcon />
//           <Text>COMP307</Text>
//         </HStack>
//       </VStack>

//       <Box
//         p={4}
//         flexGrow={1}
//         overflow="auto"
//         mt="25px"
//         ml="240px" // Add margin to start after the sidebar
//         mr="60px" // Add margin on the right side
//       >
//         <SimpleGrid columns={3} gap={4}>
//           {/* Your Classroom Cards Go Here */}
//           <Box
//             bg="gray.100"
//             p={4}
//             borderRadius="md"
//             boxShadow="md"
//           >
//             <Text>Classroom Card 1</Text>
//           </Box>

//           <Box
//             bg="gray.100"
//             p={4}
//             borderRadius="md"
//             boxShadow="md"
//           >
//             <Text>Classroom Card 2</Text>
//           </Box>

//           <Box
//             bg="gray.100"
//             p={4}
//             borderRadius="md"
//             boxShadow="md"
//           >
//             <Text>Classroom Card 3</Text>
//           </Box>

//           {/* Add more classroom cards as needed */}
//         </SimpleGrid>
//       </Box>
//     </HStack>
//   );
// }

// export default Classroom;


import React, { useState } from 'react';
import {
    VStack,
    Text,
    IconButton,
    extendTheme,
    ChakraProvider,
    SimpleGrid,
    Box,
    HStack,
    Spacer,
} from '@chakra-ui/react';
import { ArrowForwardIcon, DragHandleIcon, AddIcon, CheckIcon, EditIcon } from '@chakra-ui/icons'; // Import icons
import ClassroomCard from './ClassroomCard';
const customTheme = extendTheme({
    styles: {
        global: {
            "html, body": {
                height: "100%",
            },
        },
    },
});

function Classroom() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalContent, setModalContent] = useState({ title: '', description: '', img: '' });

    return (
        <HStack
            h="100%"
            w="100%"
            display="flex"
            alignItems="stretch"
        >
            <VStack
                w="200px"
                bg="white"
                color="black"
                p={4}
                spacing={4}
                mt="25px"
                justifyContent="flex-start"
                alignItems="flex-start"
                position="fixed"
                height="100%"
                overflowY="auto" // Enable vertical scrolling
                borderRight="1px solid #e2e8f0" // Add right-side border
                cursor="pointer"
            >
                {/* Icons and Titles */}
                <HStack spacing={2} alignItems="center">
                    <DragHandleIcon />
                    <Text>Home</Text>
                </HStack>

                <HStack spacing={2} alignItems="center">
                    <AddIcon />
                    <Text>Enroll</Text>
                </HStack>

                <HStack spacing={2} alignItems="center">
                    <CheckIcon />
                    <Text>Todo</Text>
                </HStack>

                <HStack spacing={2} alignItems="center">
                    <EditIcon />
                    <Text>COMP307</Text>
                </HStack>
            </VStack>

            <Box
                p={4}
                flexGrow={1}
                overflow="auto"
                mt="25px"
                ml="240px" // Add margin to start after the sidebar
                mr="60px" // Add margin on the right side
            >
                <SimpleGrid columns={3} gap={4}>
                    {/* Your Classroom Cards Go Here */}
                    <ClassroomCard
                        title="Operating Systems"
                        courseCode="COMP 307"
                        profileImage="https://example.com/profile-image.jpg"
                        instructor="Prof. Dr. Sudhan Jha"
                    />
                    <ClassroomCard
                        title="Computer Graphics"
                        courseCode="COMP 342"
                        profileImage="https://example.com/profile-image.jpg"
                        instructor="Mr. Dhiraj Shrestha"
                    />
                    <ClassroomCard
                        title="Theory of Computation"
                        courseCode="COMP 316"
                        profileImage="https://example.com/profile-image.jpg"
                        instructor="Mrs. Deni Shahi"
                    />
                    <ClassroomCard
                        title="Computer Architecture"
                        courseCode="COMP 315"
                        profileImage="https://example.com/profile-image.jpg"
                        instructor="Mr. Hari KC"
                    />
                    <ClassroomCard
                        title="Computational Operations Research"
                        courseCode="COMP 317"
                        profileImage="https://example.com/profile-image.jpg"
                        instructor="Dr. Ram Prasad Ghimire"
                    />
                    <ClassroomCard
                        title="Engineering Economics"
                        courseCode="MGTS 301"
                        profileImage="https://example.com/profile-image.jpg"
                        instructor="Mr. Dhiraj Shrestha"
                    />
                    {/* Add more classroom cards as needed */}
                </SimpleGrid>
            </Box>
        </HStack>
    );
}

export default Classroom;
