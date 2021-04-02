import { Box, Heading, useColorMode, useThemeUI, Divider } from 'theme-ui';
import ToucanIcon from './icon';
import SettingsModal from './settingsModal';

function Header() {
  const [colorMode] = useColorMode();
  const context = useThemeUI();
  const { theme } = context;

  return (
    <Box p={4}>
      <Box pb={2} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <ToucanIcon
            background={theme.colors?.muted}
            stroke={theme.colors?.muted}
            fill={colorMode === 'default' ? 'black' : 'white'}
          />
          <Heading as='h1' pl={3}>Toucanban</Heading>
        </Box>
        <SettingsModal />
      </Box>
      <Divider />
    </Box>
  );
}

export default Header;