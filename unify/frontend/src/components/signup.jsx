import React,{useState} from 'react';
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
import { redirect } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

    const HandleSubmit = async (e) => {
      try{
        e.preventDefault();
        const response = await fetch('http://localhost:8000/login/',{
          method : "POST",
          headers :{
            'Content-Type' : "application/json"
          },
          body : JSON.stringify({
            password  : password,
            email : email
          })
        });
        
      console.log(
        `Response received with status code ${response.status}`
      )
      if (response.status === 200){
        console.log("here")
        const data = await response.json()
        localStorage.setItem('token', data.token);
        localStorage.setItem('role',"student")
        window.location.href = "/student"
      }
      else if(response.status === 201){
        const data = await response.json()
        localStorage.setItem('token', data.token);
        localStorage.setItem('role',"faculty")
        window.location.href = "/student/classroom"
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
            <Heading>Login</Heading>
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

export default Login;
