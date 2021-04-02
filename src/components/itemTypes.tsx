import React, {useState} from 'react';
import { Card, Text, Divider, Box, Button, Grid, Heading, Input } from 'theme-ui';
import { Sun, User, Users, Activity, X, Plus } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';
import { animated, useSpring } from 'react-spring';
import { TwitterPicker } from 'react-color';

interface itemType {
  id: string,
  name: string,
  color: string
}

interface itemTypesManagerInput {
  itemTypes: itemType[],
  setItemTypes: (newItemTypes: itemType[]) => void,
}

function ItemTypes(props: itemTypesManagerInput) {
  const { itemTypes, setItemTypes } = props;
  const [displayItemTypesModal, setDisplayItemTypesModal] = useState(false);
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
                <Grid gap={2}>
                  {itemTypes.map(itemType => {
                    return (
                      <Box key={itemType.id} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                          <Button bg={itemType.color} p={0} m={0} sx={{ height: 24, width: 24 }}/>
                          <Button variant="basic" p={2} m={0} sx={{alignItems: 'center', display: 'flex'}}>
                            <Heading as="h4">{itemType.name}</Heading>
                          </Button>
                        </Box>
                        <Button variant="basic" p={0} m={0} sx={{alignItems: 'center', display: 'flex'}}>
                          <X />
                        </Button>
                      </Box>
                    )
                  })}
                  <Divider />
                  <Box key={'Add Item'} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <Button bg={'background'} p={0} m={0} sx={{ height: 24, width: 24 }}/>
                    <Input m={2} sx={{color: 'text'}} defaultValue="New Item Type" />
                    </Box>
                    <Button variant="basic" p={0} m={0} sx={{alignItems: 'center', display: 'flex'}}>
                      <Plus />
                    </Button>
                  </Box>
                </Grid>
              </Card>
            </Box>
          </animated.div>
        }
      </OutsideClickHandler>
    </Box>
  )
};

export default ItemTypes;