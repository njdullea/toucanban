// import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box } from 'theme-ui';
import Header from './components/header';
import Schedule from './components/schedule';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bg='background' sx={{ height: '100vh' }}>
        <Header />
        <Schedule />
      </Box>
    </ThemeProvider>
  );
}

export default App;
