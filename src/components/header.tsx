import { Box, Heading, useColorMode, useThemeUI } from 'theme-ui';
import ToucanIcon from './icon';
import SettingsModal from './settingsModal';

function Header() {
  const [colorMode] = useColorMode();
  const context = useThemeUI();
  const { theme } = context;

  return (
    <Box p={4} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <ToucanIcon
          background={theme.colors?.muted}
          stroke={colorMode === 'default' ? 'white' : theme.colors?.muted}
          fill={colorMode === 'default' ? 'black' : 'white'}
        />
        <Heading as='h1' pl={3}>Toucanban</Heading>
      </Box>
      <SettingsModal />
    </Box>
  );
}

export default Header;