import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box, Heading } from 'theme-ui';
import ThemeChanger from './components/themeChanger';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bg='background' sx={{ height: '100vh' }}>
        <Box p={4} sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
          <Heading as='h1'>Toucanban</Heading>
          <ThemeChanger />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
