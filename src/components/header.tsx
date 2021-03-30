import { Box, Heading, useColorMode, Button, useThemeUI } from 'theme-ui';
import ToucanIcon from './icon';
import { Settings } from 'react-feather';

function Header() {
  const [colorMode, setColorMode] = useColorMode();
  const context = useThemeUI()
  const { theme } = context;

  return (
    <Box p={4} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <ToucanIcon
          background={theme.colors?.muted}
          stroke={colorMode === 'default' ? 'white' : 'black'}
          fill={colorMode === 'default' ? 'black' : 'white'}
        />
        <Heading as='h1' pl={3}>Toucanban</Heading>
      </Box>
      <Settings />
      <Button
        onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
        bg='muted'
        color='text'
        sx={{width: 5}}
      >
        {colorMode === 'default' ? 'light' : 'dark'}
      </Button>
    </Box>
  );
}

export default Header;