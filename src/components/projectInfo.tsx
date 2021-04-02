import { useState } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { Box, Text, Button, Heading } from 'theme-ui';
import { ArrowLeft, ArrowRight, PlusCircle } from 'react-feather';
import ItemTypes from './itemTypes';

function ProjectInfo() {
  const getStartingDisplayDates = () => {
    const dates = [];
    const date = new Date();
    dates.push(format(subDays(date, 2), 'MM-dd'));
    dates.push(format(subDays(date, 1), 'MM-dd'));
    dates.push(format(date, 'MM-dd'));
    dates.push(format(addDays(date, 1), 'MM-dd'));
    dates.push(format(addDays(date, 2), 'MM-dd'));
    dates.push(format(addDays(date, 3), 'MM-dd'));
    dates.push(format(addDays(date, 4), 'MM-dd'));
    return dates;
  };

  const [selectedDates, setSelectedDates] = useState(getStartingDisplayDates());

  return (
    <Box pl={4} pr={4} pb={4} sx={{ flex: 1 }}>
      <Box sx={{ pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Button variant="secondary" mr={3}>
            <Text sx={{fontFamily: 'Helvetica Neue', fontSize: 1}}>EXIT</Text>
          </Button>
          <Heading as='h2'>Project Name</Heading>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Button mr={3}>
            <Text>ADD ITEM</Text>
          </Button>
          <ItemTypes />
        </Box>
      </Box>
      {/* <Box sx={{display: 'flex'}}>
        <ArrowLeft />
        <Text sx={{pl: 1, pr: 1}}>Change Date</Text>
        <ArrowRight />
      </Box> */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3, pb: 3}}>
        {selectedDates.map(date => {
          return (
            <Text>
              {date}
            </Text>
          )
        })}
      </Box>
    </Box>
  )
};

export default ProjectInfo;