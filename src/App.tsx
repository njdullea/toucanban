// import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box } from 'theme-ui';
import Header from './components/header';
import Schedule from './components/schedule';
import ProjectSettings from './components/projectSettings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bg='background' sx={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Header />
        <ProjectSettings />
        <Schedule />
      </Box>
    </ThemeProvider>
  );
}

export default App;
