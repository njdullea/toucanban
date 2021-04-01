import { useState } from 'react';
import { Box, Text, Button, Heading } from 'theme-ui';
import { ArrowLeft, ArrowRight, PlusCircle }  from 'react-feather';

function ProjectSettings() {
  return (
    <Box sx={{ margin: 2, ml: 4, mr: 4, backgroundColor: 'muted', p: 3, borderRadius: 4, boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)'}}>
      <Heading pb={2} as='h3'>Project Settings</Heading>
      <Heading pb={1} as='h4'>Item Types</Heading>
      <div><Text>Task</Text></div>
      <div><Text>Bug</Text></div>
      <div><Text>Docs</Text></div>
      <div><Text>Uncat</Text></div>
      {/* <Box sx={{ pt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{display: 'flex'}}>
          <ArrowLeft />
          <Text sx={{pl: 1, pr: 1}}>Change Date</Text>
          <ArrowRight />
        </Box>
        <Button variant="secondary" sx={{display: 'flex', backgroundColor: 'background'}}>
          <PlusCircle />
          <Text sx={{pl: 1}}>Add Item</Text>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3, pb: 3}}>
        {selectedDates.map(date => {
          return (
            <Text>
              {date}
            </Text>
          )
        })}
      </Box> */}
    </Box>
  )
}

export default ProjectSettings;