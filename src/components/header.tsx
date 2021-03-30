import ToucanLogo from '../toucanLogo.svg';
import ToucanLogoWhite from '../toucanLogoWhite.svg';
import { Box, Heading, Image, useColorMode, Button } from 'theme-ui';

function Header() {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <Box p={4} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      
      {
        colorMode === 'default' ?
          <Image src={ToucanLogo} color={'red'} sx={{ height: 36, width: 36 }} />
        :
          <Image src={ToucanLogoWhite} color={'red'} sx={{ height: 36, width: 36 }} />
      }
      <Heading as='h1'>Toucanban</Heading>
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