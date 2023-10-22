// import SignUp from './components/signup'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home';
import ViewEvents from './components/Events/ViewEvents'
import CreateEvent from './components/Events/CreateEvent'
import SignUp from './components/signup'
import { ChakraProvider } from '@chakra-ui/react'

export function App() {
  const currentUrl = window.location.pathname;
  return (
    <ChakraProvider>
      {currentUrl !== '/signup' && <NavBar />}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/signup" Component={SignUp} />
          <Route exact path="/events" Component={ViewEvents} />
          <Route exact path="/events/create" Component={CreateEvent} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}