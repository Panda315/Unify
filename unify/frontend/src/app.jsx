// import SignUp from './components/signup'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home';
import ViewEvents from './components/Events/ViewEvents'
import CreateEvent from './components/Events/CreateEvent'
import Login from './components/signup'
import { ChakraProvider } from '@chakra-ui/react'
import Classroom from './components/Classroom/Classroom';
import StudentRoutine from './components/Student/StudentRoutine';
// Create a function to check if the user is authenticated
const isAuthenticated = () => {
  const userId = localStorage.getItem('token');
  
  // Return true if the user ID is present, indicating the user is logged in
  return !!userId;
};

export function App() {
  const currentUrl = window.location.pathname;
  return (
    <ChakraProvider>
      {/* {currentUrl !== '/login' && <NavBar />}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/login" Component={Login} />
          {isAuthenticated() && <Route exact path="/student" Component={Home} />}
          {isAuthenticated() && <Route exact path="/student/events" Component={ViewEvents} />}
          {isAuthenticated() && <Route exact path="/student/events/create" Component={CreateEvent} />}
          {isAuthenticated() && <Route exact path="/student/routine" Component={StudentRoutine} />}


          {isAuthenticated() && <Route exact path='/student/classroom' element={<Classroom/>}/>}
        </Routes>
      </BrowserRouter> */}
      <StudentRoutine/>
    </ChakraProvider>
  )
}




