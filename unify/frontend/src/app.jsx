// import SignUp from './components/signup'
// import Calender from './components/Student/Calender'
import Events from './components/Student/Events'
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