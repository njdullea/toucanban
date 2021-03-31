import React, { useState } from 'react';
import { Box, Heading, useColorMode, Button, useThemeUI } from 'theme-ui';
import ToucanIcon from './icon';
import { Settings } from 'react-feather';
import SettingsModal from './settingsModal';
import OutsideClickHandler from 'react-outside-click-handler';

function Header() {
  const [colorMode] = useColorMode();
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
          <OutsideClickHandler
            onOutsideClick={() => {
            setDisplaySettingsModal(false);
            }}
          >
          <Box
            sx={{position: 'absolute', top: 100, right: 30}}  
          >
            
            <SettingsModal />
          </Box>
          </OutsideClickHandler>
        }
      </Button>
    </Box>
  );
}

export default Header;