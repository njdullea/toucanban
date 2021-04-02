import React, {useState} from 'react';
import { Card, Text, Divider, Box, Button, useColorMode, useThemeUI } from 'theme-ui';
import { Sun, User, Users, Activity } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';
import { animated, useSpring } from 'react-spring';
// import { SketchPicker } from 'react-color';

function ItemTypes() {
  const [colorMode, setColorMode] = useColorMode();
  const [displayItemTypesModal, setDisplayItemTypesModal] = useState(false);
  const context = useThemeUI();
  const { theme } = context;

  const animateProps = useSpring({ opacity: displayItemTypesModal ? 1 : 0 });

  return (
    <Box>
      <OutsideClickHandler
        onOutsideClick={() => {
          
          setDisplayItemTypesModal(false);
        }}
      >
      <Button
          onClick={() => {
            console.log('Clicked item types button');
            setDisplayItemTypesModal(!displayItemTypesModal);
          }}
          variant="secondary"
      >
        <Text sx={{fontFamily: 'Helvetica Neue', fontSize: 1}}>ITEM TYPES</Text>
        </Button>
        { displayItemTypesModal &&
          <animated.div style={animateProps}>
            <Box sx={{ position: 'absolute', top: 215, right: 30 }}>
              <Card sx={{
                width: 256,
                padding: 2,
                backgroundColor: 'muted',
                color: 'black',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'
              }}>
                <Button bg={'muted'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Task</Text>
                  {/* <User /> */}
                  <Box bg={'#4caf50'} sx={{width: '24px', height: '24px', borderRadius: '8px'}} />
                </Button>
                <Divider />
                <Button bg={'muted'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Fix</Text>
                {/* <Users /> */}
                  <Box bg={'#f44336'} sx={{width: '24px', height: '24px', borderRadius: '8px'}} />
                </Button>
                <Divider />
                <Button bg={'muted'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Review</Text>
                  {/* <Activity /> */}
                  <Box bg={'#3f51b5'} sx={{width: '24px', height: '24px', borderRadius: '8px'}} />
                </Button>
                <Button bg={'muted'} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Add Item</Text>
                  {/* <Activity /> */}
                  <Box bg={'muted'} sx={{width: '24px', height: '24px', borderRadius: '8px'}} />
                </Button>
              </Card>
            </Box>
          </animated.div>
        }
      </OutsideClickHandler>
    </Box>
  )
};

export default ItemTypes;