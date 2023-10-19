// import SignUp from './components/signup'
import Calender from './components/Student/Calender'
import { ChakraProvider } from '@chakra-ui/react'
export function App() {

  return (
    <ChakraProvider>
      {/* <SignUp /> */}
      <Calender/>
    </ChakraProvider>

  )
}