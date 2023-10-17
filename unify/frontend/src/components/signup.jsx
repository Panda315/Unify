import React from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  VStack,
  Checkbox,
  Link,
  Text,
  Heading,
} from '@chakra-ui/react';

function SignUp() {
  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        minH="100vh"
        bg="gray.100"
        backgroundImage="url('https://scontent.fbhr4-1.fna.fbcdn.net/v/t1.6435-9/75303675_1356536567854965_3535707865085902848_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=qN7o8jxiNH8AX-m5EaU&_nc_ht=scontent.fbhr4-1.fna&oh=00_AfBNV2UDjbyL6-8JD1vQav1nbKmWPhbd-8_p4p1HAsjkYA&oe=653DE29B')"
        backgroundSize="cover"
      >
        <Box
          p={8}
          maxW="md"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg="rgba(255, 255, 255, 0.6)" // Transparent white for the glassy effect
          backdropFilter="blur(10px)" // Apply a blur to create the glassy look
          display="flex"
          flexDirection="column"
          alignItems="center"
          mr={10}
        >
          <Box textAlign="center" mb={5}>
            <Heading>Sign Up</Heading>
          </Box>

          <form>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem colSpan={1}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" placeholder="John" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <FormControl id="middleName">
                  <FormLabel>Middle Name</FormLabel>
                  <Input type="text" placeholder="Lee" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder="Doe" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" placeholder="john@example.com" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="********" />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <Checkbox id="rememberMe">Remember Me</Checkbox>
              </GridItem>

              <GridItem colSpan={2} textAlign="right">
                <Link color="blue.500" fontSize="sm">
                  Forgot Password?
                </Link>
              </GridItem>

              <GridItem colSpan={2}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  w="100%"
                >
                  Sign Up
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default SignUp;
