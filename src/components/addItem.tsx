import React, {useState} from 'react';
import { Card, Text, Divider, Box, Button, Input } from 'theme-ui';
import { Sun, User, Users, Activity } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';
import { animated, useSpring } from 'react-spring';

function AddItem() {
  const [displayAddItemModal, setDisplayAddItemModal] = useState(false);
  const animateProps = useSpring({ opacity: displayAddItemModal ? 1 : 0 });

  return (
      <OutsideClickHandler
        onOutsideClick={() => {
          setDisplayAddItemModal(false);
        }}
      >
        
        <Button
          mr={3}
          onClick={() => setDisplayAddItemModal(!displayAddItemModal)}
        >
          <Text sx={{fontFamily: 'Helvetica Neue', fontSize: 1}}>ADD ITEM</Text>
        </Button>
        <Box sx={{position: 'relative'}}>
        {
          displayAddItemModal &&
          <animated.div style={animateProps}>
            <Box sx={{ position: 'absolute', top: 10, right: 15}}>
              <Card sx={{
                width: 256,
                padding: 2,
                backgroundColor: 'muted',
                color: 'black',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'
              }}>
                <Button bg={'muted'} variant="basic" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Item Description</Text>
                  <User />
                </Button>
                <Divider />
                <Button bg={'muted'} variant="basic" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Item Type</Text>
                  <Users />
                </Button>
                <Divider />
                <Button bg={'muted'} variant="basic" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>Start Date Time (auto-start)</Text>
                  <Activity />
                </Button>
                <Divider />
                <Button bg={'muted'} variant="basic" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} p={1}>
                  <Text>End Date Time (auto-end)</Text>
                  <Activity />
                </Button>
              </Card>
            </Box>
          </animated.div>
        }
        </Box>
      </OutsideClickHandler>
  )
};

export default AddItem;