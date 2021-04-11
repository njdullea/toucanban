import { useState } from 'react';
import { Box, Text, Button, Heading } from 'theme-ui';
import ItemTypes from './itemTypes';
import AddItem from './addItem';
import ItemChart from './itemChart';

function ProjectInfo() {
  const [itemTypes, setItemTypes] = useState([
    {
      id: '1',
      name: 'Task',
      color: '#4caf50'
    },
    {
      id: '2',
      name: 'Fix',
      color: '#f44336'
    },
    {
      id: '3',
      name: 'Review',
      color: '#3f51b5'
    },
  ]);

  return (
    <Box pl={4} pr={4} pb={4} sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
      <Box sx={{ pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Button variant="secondary" mr={3}>
            <Text sx={{fontFamily: 'Helvetica Neue', fontSize: 1}}>EXIT</Text>
          </Button>
          <Heading as='h2'>Project Name</Heading>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <AddItem />
          <ItemTypes itemTypes={itemTypes} setItemTypes={setItemTypes}/>
        </Box>
      </Box>
      <ItemChart />
    </Box>
  )
};

export default ProjectInfo;