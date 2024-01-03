import React,{useState} from 'react';
import Cookies from 'js-cookie';
import { FaRegUserCircle } from "react-icons/fa";

import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Icon,
  VStack,
  Checkbox,
  Link,
  Text,
  Heading,
} from '@chakra-ui/react';
import { redirect } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const csrfToken = Cookies.get('csrftoken')
  console.log(csrfToken)

    const HandleSubmit = async (e) => {
      try{
        e.preventDefault();
        const response = await fetch('http://localhost:8000/login/',{
          method : "POST",
          headers :{
            'Content-Type' : "application/json",
            'X-CSRFToken' : csrfToken,
          },
          body : JSON.stringify({
            password  : password,
            email : email
          }),
          credentials : 'include',
        });
        
      console.log(
        `Response received with status code ${response.status}`
      )
      if (response.status === 200){
        console.log("here")
        const data = await response.json()
        localStorage.setItem('token', data.token);
        localStorage.setItem('role',"student")
        window.location.href = "/home"
      }
      else if(response.status === 201){
        const data = await response.json()
        localStorage.setItem('token', data.token);
        localStorage.setItem('role',"faculty")
        window.location.href = "/classroom"
      }
      else {
        alert("Invalid Email or Password");
      }

      }
      catch(error){
        console.log(error)
      }
    }


  return (
    <ChakraProvider>
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        minH="100vh"
        bg="gray.100"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        height="100vh"    
           backgroundImage="url('https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2020/opinion/Kathmandu-University-(2).jpg&w=900&height=601')"
           backgroundPosition="center"
           minHeight="100vh"
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
          <Box textAlign="center" mb={4}>
          <Heading as="h1" size="lg">
            <Icon as={FaRegUserCircle} fontSize="6xl" mr={2} />
            
          </Heading>
          </Box>

          <form onSubmit={HandleSubmit}>
            <Grid templateColumns="1fr 1fr" gap={4}>

              <GridItem colSpan={2}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" 
                  placeholder="john@example.com" 
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" 
                  placeholder="********" 
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
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
Log In                 </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Login;
