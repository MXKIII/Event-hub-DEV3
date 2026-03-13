import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AppWrapper } from './modules/base/ui/AppWrapper'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper>
      <ChakraProvider value={defaultSystem}>
      <App />
      </ChakraProvider>
    </AppWrapper>
  </StrictMode>,
)
