// import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box } from 'theme-ui';
import Header from './components/header';
import ProjectInfo from './components/projectInfo';
import ProjectSettings from './components/projectSettings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bg='background' sx={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Header />
        {/* <ProjectSettings /> */}
        <ProjectInfo />
      </Box>
    </ThemeProvider>
  );
}

export default App;
