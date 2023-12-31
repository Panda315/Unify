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
import UserProfile from './components/Profile/UserProfile';
import TeacherHome from './components/Teacher/TeacherEvents';
import StudentRoutine from './components/Student/StudentRoutine';
import OpenSchool from './components/OpenSchool/OpenSchool';
import SingleClassroom from './components/Classroom/SingleClassroom';
// Create a function to check if the user is authenticated
const isAuthenticated = () => {
  const userId = localStorage.getItem('token');
  
  // Return true if the user ID is present, indicating the user is logged in
  return !!userId;
};

const isA = () => {
  const role = localStorage.getItem('role')
  return role;
}

export function App() {
  const currentUrl = window.location.pathname;
  return (
    <ChakraProvider>
      {currentUrl !== '/login' && <NavBar />}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/login" Component={Login} />
          {isAuthenticated() && isA() === "student" && <Route exact path="/home" Component={Home} />}
          {isAuthenticated() && isA() === "student" && <Route exact path="/events" Component={ViewEvents} />}
          {isAuthenticated() && isA() === "student" && <Route exact path="/routine" Component={StudentRoutine} />}
          {isAuthenticated() && isA() === "student" && <Route exact path='/classroom' element={<Classroom/>}/>}
          {isAuthenticated() && isA() === "student" && <Route exact path='/openschool' element={<OpenSchool/>}/>}

          {isAuthenticated() && isA() === "faculty" && <Route exact path="/home" Component={Home} />}
          {isAuthenticated() && isA() === "faculty" && <Route exact path="/events" Component={ViewEvents} />}
          {isAuthenticated() && isA() === "faculty" && <Route exact path="/events/create" Component={TeacherHome} />}
          {isAuthenticated() && isA() === "faculty" && <Route exact path="/routine" Component={StudentRoutine} />}
          {isAuthenticated() && isA() === "faculty" && <Route exact path='/classroom' element={<Classroom/>}/>}
          {isAuthenticated() && isA() === "faculty" && <Route exact path="/classroom/:Id" Component={SingleClassroom}/>}
      

          {isAuthenticated() && isA() === "faculty" && <Route exact path='/openschool' element={<OpenSchool/>}/>}
        </Routes>
      </BrowserRouter> 
    </ChakraProvider>
  )
}



