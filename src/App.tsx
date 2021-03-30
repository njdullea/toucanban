import ToucanLogo from './toucanLogo.svg';
// import './App.css';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Box, Heading, Image } from 'theme-ui';
import ThemeChanger from './components/themeChanger';
import Header from './components/header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bg='background' sx={{ height: '100vh' }}>
        <Header />
        {/* <Box p={4} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <Image src={ToucanLogo} color={'red'} sx={{height: 36, width: 36}}/>
          <Heading as='h1'>Toucanban</Heading>
          <ThemeChanger />
        </Box> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;
