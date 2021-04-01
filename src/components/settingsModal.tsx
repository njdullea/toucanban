import React, {useState} from 'react';
import { Card, Text, Divider, Box, Button, useColorMode, useThemeUI } from 'theme-ui';
import { Sun, User, Users, Activity } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';
import { Settings } from 'react-feather';

function SettingsModal() {
  const [colorMode, setColorMode] = useColorMode();
  const [displaySettingsModal, setDisplaySettingsModal] = useState(false);
  const context = useThemeUI();
  const { theme } = context;

  return (
    <Box>
      <Button
        onClick={() => setDisplaySettingsModal(!displaySettingsModal)}
        bg={theme.colors?.muted as string}
        p={0}
        sx={{ display: 'flex', height: '48px', width: '48px', borderRadius: '8px', alignItems: 'center', justifyContent: 'center' }}
      >
        <Settings />
      </Button>
      { displaySettingsModal &&
        <Box sx={{position: 'absolute', top: 100, right: 30}}> 
          <OutsideClickHandler
            onOutsideClick={() => {
              setDisplaySettingsModal(false);
            }}
          >
            <Card sx={{
              width: 256,
              padding: 2,
              backgroundColor: 'muted',
              color: 'black'
            }}>
              <Button bg={'muted'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                <Text>Profile</Text>
                <User />
              </Button>
              <Divider />
              <Button bg={'muted'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                <Text>Organizations</Text>
                <Users />
              </Button>
              <Divider />
              <Button bg={'muted'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                <Text>Projects</Text>
                <Activity />
              </Button>
              <Divider />
              <Button
                bg={'muted'}
                sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}
                onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
              >
                <Text>Color Mode</Text>
                <Sun />
              </Button>
            </Card>
          </OutsideClickHandler>
        </Box>
      }
    </Box>
  )
};

export default SettingsModal;