import React from 'react';
import GlobalStyle from './global/global';
import { ThemeProvider } from 'styled-components';
import theme from './global/theme';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </ThemeProvider>

    </>
  );
};

export default App;