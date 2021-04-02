// import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box } from 'theme-ui';
import Header from './components/header';
import Project from './components/project';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bg='background' sx={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Header />
        <Project />
      </Box>
    </ThemeProvider>
  );
}

export default App;
