import { useColorMode, Button } from 'theme-ui';

function ThemeChanger() {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Button
      onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
      bg='muted'
      color='secondary'
      sx={{
        width: 5
      }}
    >
      {colorMode === 'default' ? 'light' : 'dark'}
    </Button>
  );
}

export default ThemeChanger;