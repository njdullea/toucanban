import { useColorMode, Button } from 'theme-ui';

function Header() {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Button
      onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
      bg='muted'
      color='text'
      sx={{width: 5}}
    >
      {colorMode === 'default' ? 'light' : 'dark'}
    </Button>
  );
}

export default Header;