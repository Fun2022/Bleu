import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import Register from './register';

export const registryApi = 'api/register';

function ForceDarkMode(props: { children: JSX.Element }) {
  const { colorMode, toggleColorMode } = useColorMode();

  React.useEffect(() => {
    if(colorMode == "dark") return;
    toggleColorMode();
  }, [colorMode]);
  return props.children;
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ForceDarkMode>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ForceDarkMode>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
