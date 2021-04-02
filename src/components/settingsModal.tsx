import React, {useState} from 'react';
import { Card, Text, Divider, Box, Button, useColorMode, useThemeUI } from 'theme-ui';
import { Sun, User, Users, Activity } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';
import { animated, useSpring } from 'react-spring';

function SettingsModal() {
  const [colorMode, setColorMode] = useColorMode();
  const [displaySettingsModal, setDisplaySettingsModal] = useState(false);
  const animateProps = useSpring({ opacity: displaySettingsModal ? 1 : 0 });

  return (
    <Box>
      <OutsideClickHandler
        onOutsideClick={() => {
          setDisplaySettingsModal(false);
        }}
      >
        <Button
            onClick={() => setDisplaySettingsModal(!displaySettingsModal)}
            variant="secondary"
        >
          <Text sx={{fontFamily: 'Helvetica Neue', fontSize: 1}}>SETTINGS</Text>
        </Button>
        {
          displaySettingsModal &&
          <animated.div style={animateProps}>
            <Box sx={{ position: 'absolute', top: 95, right: 30, zIndex: 1}}>
              <Card sx={{
                width: 256,
                padding: 2,
                backgroundColor: 'muted',
                color: 'black',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'
              }}>
                <Button bg={'muted'} variant="basic" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Profile</Text>
                  <User />
                </Button>
                <Divider />
                <Button bg={'muted'} variant="basic" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Organizations</Text>
                  <Users />
                </Button>
                <Divider />
                <Button bg={'muted'} variant="basic" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Projects</Text>
                  <Activity />
                </Button>
                <Divider />
                <Button
                  bg={'muted'}
                  variant="basic"
                  sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}
                  onClick={() => setColorMode(colorMode === 'default' ? 'dark' : 'default')}
                >
                  <Text>Color Mode</Text>
                  <Sun />
                </Button>
              </Card>
            </Box>
          </animated.div>
        }
      </OutsideClickHandler>
    </Box>
  )
};

export default SettingsModal;