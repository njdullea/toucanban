import { useState } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { Box, Text, Button, Heading } from 'theme-ui';
import { ArrowLeft, ArrowRight, PlusCircle }  from 'react-feather';

function Schedule() {
  const getStartingDates = () => {
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

  const [selectedDates, setSelectedDates] = useState(getStartingDates());

  return (
    <Box sx={{ margin: 4, backgroundColor: 'muted', p: 3, borderRadius: 4, flex: 1, boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)'}}>
      <Heading as='h3'>Task Board</Heading>
      <Box sx={{ pt: 3, display: 'flex', justifyContent: 'space-between' }}>
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
      </Box>
    </Box>
  )
};

export default Schedule;