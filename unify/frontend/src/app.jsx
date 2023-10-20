// import SignUp from './components/signup'
import Events from './components/Student/Events'
import SignUp from './components/signup'
import { ChakraProvider } from '@chakra-ui/react'
export function App() {

  return (
    <ChakraProvider>
      {/* <SignUp /> */}
      {/* <Calender/> */}
      <Events/>    
</ChakraProvider>

  )
}