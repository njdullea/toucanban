// import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box } from 'theme-ui';
import Header from './components/header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bg='background' sx={{ height: '100vh' }}>
        <Header />
      </Box>
    </ThemeProvider>
  );
}

export default App;
