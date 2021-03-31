import React, { useState } from 'react';
import { Box, Heading, useColorMode, Button, useThemeUI } from 'theme-ui';
import ToucanIcon from './icon';
import { Settings } from 'react-feather';
import SettingsModal from './settingsModal';

function Header() {
  const [colorMode, setColorMode] = useColorMode();
  const [displaySettingsModal, setDisplaySettingsModal] = useState(false);
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
      <Button
        onClick={() => setDisplaySettingsModal(!displaySettingsModal)}
        bg={theme.colors?.muted as string}
        p={0}
        sx={{ display: 'flex', height: '48px', width: '48px', borderRadius: '8px', alignItems: 'center', justifyContent: 'center' }}
      >
        <Settings />
        {displaySettingsModal && 
          <Box
            sx={{position: 'absolute', top: 100, right: 30}}  
          >
            <SettingsModal />
          </Box>
        }
      </Button>
      {/* <Button
        onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
        bg='muted'
        color='text'
        sx={{width: 5}}
      >
        {colorMode === 'default' ? 'light' : 'dark'}
      </Button> */}
    </Box>
  );
}

export default Header;