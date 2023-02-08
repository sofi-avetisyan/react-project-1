import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { UserProvider } from './Contexts/UserContext';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <UserProvider>
          <Router/>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
    
  );
}

export default App;
