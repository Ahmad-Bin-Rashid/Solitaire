import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
