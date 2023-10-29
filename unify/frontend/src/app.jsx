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

export function App() {
  const currentUrl = window.location.pathname;
  return (
    <ChakraProvider>
      {currentUrl !== '/login' && <NavBar />}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/student" Component={Home} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/student/events" Component={ViewEvents} />
          <Route exact path="/student/events/create" Component={CreateEvent} />
          <Route exact path='/student/classroom' Component={Classroom}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}