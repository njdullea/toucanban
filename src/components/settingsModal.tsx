import React from 'react';
import { Card, Text, Divider, Box, Button, useColorMode } from 'theme-ui';
import { Sun, User, Users, Activity } from 'react-feather';

function SettingsModal() {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Card sx={{
      width: 256,
      padding: 2,
      backgroundColor: 'muted',
      color: 'black'
    }}>
      <Button bg={'muted'} sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}} p={1}>
        <Text>Profile</Text>
        <User />
      </Button>
      <Divider />
      <Button bg={'muted'} sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}} p={1}>
        <Text>Organizations</Text>
        <Users />
      </Button>
      <Divider />
      <Button bg={'muted'} sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}} p={1}>
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
  )
};

export default SettingsModal;