// import SignUp from './components/signup'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home';
import Events from './components/Student/Events'
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
          <Route exact path="/events" Component={Events} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}