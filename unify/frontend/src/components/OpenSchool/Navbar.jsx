// // import React from 'react';
// // import { ChakraProvider, Box, Flex, Spacer, Input, InputGroup, InputRightElement, IconButton, Grid, GridItem } from '@chakra-ui/react';
// // import { FaUser, FaSearch } from 'react-icons/fa'; // Import icons from react-icons library
// // import OpenSchoolProfile from '../Profile/OpenschoolProfile';

// // const Navbar = () => {
// //   return (
// //     <ChakraProvider>
// //       <Box bg="blue.500" color="white" p={4}>
// //         <Grid templateColumns="1fr 3fr"> {/* Splitting the navbar into two columns */}
// //           {/* Profile icon */}
// //           <GridItem>
// //             <OpenSchoolProfile />
// //           </GridItem>
          
// //           {/* Search bar */}
// //           <GridItem>
// //             <Flex align="center">
// //               <InputGroup>
// //                 <Input
// //                   variant="filled"
// //                   placeholder="Search..."
// //                   bg="white"
// //                   color="black"
// //                 />
// //                 <InputRightElement>
// //                   <IconButton
// //                     aria-label="Search"
// //                     icon={<FaSearch />}
// //                     bg="transparent"
// //                     color="blue.500"
// //                     fontSize="20px"
// //                     _hover={{ bg: 'transparent' }}
// //                     _focus={{ outline: 'none' }}
// //                   />
// //                 </InputRightElement>
// //               </InputGroup>
// //             </Flex>
// //           </GridItem>
// //         </Grid>
// //       </Box>
// //     </ChakraProvider>
// //   );
// // };

// // export default Navbar;


// import React from 'react';
// import { ChakraProvider, Box, Flex, Input, InputGroup, InputRightElement, IconButton, Grid, GridItem } from '@chakra-ui/react';
// import { FaUser, FaSearch } from 'react-icons/fa'; // Import icons from react-icons library
// import OpenSchoolProfile from '../Profile/OpenschoolProfile';

// const Navbar = () => {
//   return (
//     <ChakraProvider>
//       <Box bg="blue.500" color="white" p={4}>
//         <Grid templateColumns="1fr auto 1fr"> {/* Splitting the navbar into three columns */}
//           {/* Empty GridItem to push profile icon to the right */}
//           <GridItem></GridItem>

//           {/* Profile icon */}

          
//           {/* Search bar */}
//           <GridItem>
//             <Flex justify="center" align="center">
//               <InputGroup size="sm">
//                 <Input
//                   variant="filled"
//                   placeholder="Search..."
//                   bg="white"
//                   color="black"
//                 />
//                 <InputRightElement>
//                   <IconButton
//                     aria-label="Search"
//                     icon={<FaSearch />}
//                     bg="transparent"
//                     color="blue.500"
//                     fontSize="18px" // Reduced the font size
//                     _hover={{ bg: 'white' }}
//                     _focus={{ outline: 'none' }}
//                   />
//                 </InputRightElement>
//               </InputGroup>
//             </Flex>
//           </GridItem>

//           <GridItem>
//             <OpenSchoolProfile />
//           </GridItem>

//           {/* Empty GridItem */}
//           <GridItem></GridItem>
//         </Grid>
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default Navbar;


import React from 'react';
import { ChakraProvider, Box, Flex, Input, InputGroup, InputRightElement, IconButton, Grid, GridItem } from '@chakra-ui/react';
import { FaUser, FaSearch } from 'react-icons/fa'; // Import icons from react-icons library
import OpenSchoolProfile from '../Profile/OpenschoolProfile';

const Navbar = () => {
  return (
    <ChakraProvider>
      <Box bg="white" color="white" p={4} >
        <Grid templateColumns="1fr auto 1fr"> {/* Splitting the navbar into three columns */}
          {/* Empty GridItem to push profile icon to the right */}
          <GridItem>
          </GridItem>


          
          {/* Search bar */}
          <GridItem>
            <Flex justify="center" align="center">
              <InputGroup size="md">
                <Input
                  variant="filled"
                  placeholder="Search courses"
                  bg="white"
                  color="black"
                  border="1px solid black" // Added black border to the input
                  borderRadius="7px" // Added border radius
                  w="30rem"
                  height="50px"
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Search"
                    icon={<FaSearch />}
                    bg="transparent"
                    color="grey"
                    fontSize="18px" // Reduced the font size
                  />
                </InputRightElement>
              </InputGroup>
            </Flex>
          </GridItem>
          <GridItem>
            <OpenSchoolProfile />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Navbar;

