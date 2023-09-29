import SignUp from './components/signup'
import { ChakraProvider } from '@chakra-ui/react'
export function App() {

  return (
    <ChakraProvider>
      <SignUp />
    </ChakraProvider>

  )
}