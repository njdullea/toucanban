import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Hello World</h1>
      <p>Toggle here</p>
    </ThemeProvider>
  );
}

export default App;
