import { useState } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { Box, Text, Button, Heading } from 'theme-ui';
import { ArrowLeft, ArrowRight, PlusCircle } from 'react-feather';
import ItemTypes from './itemTypes';
import AddItem from './addItem';

// The date and time in: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx" (using date fns). The is the same as the input for parsing a date: https://javascript.info/date#date-parse-from-a-string.
type dateTime = string;

interface item {
  id: string,
  description: string,
  // The time the task starts.
  startDateTime: dateTime,
  // The time the task should end. 
  endDateTime: dateTime | undefined,
  // The time the user marked the task as complete.
  confirmedEndDateTime: dateTime | undefined,
  // If its a meeting, we shouldn't have to confirm complete. If it is a task, we should.
  continueUntilConfirmed: boolean,
}

function ProjectInfo() {
  const [items, setItems] = useState([
    {
      id: '1',
      description: 'Setup Project',
      startDateTime: '2021-04-02T09:00:00.000-07:00',
      continueUntilConfirmed: true,
    },
    {
      id: '2',
      description: 'Meet about Project Overview',
      startDateTime: '2021-04-02T13:00:00.000-07:00',
      endDateTime: '2021-04-02T14:00:00.000-07:00',
      continueUntilConfirmed: false,
    },
    {
      id: '2',
      description: 'Begin Prototype Implementation',
      startDateTime: '2021-04-02T15:00:00.000-07:00',
      endDateTime: '2021-04-04T09:00:00.000-07:00',
      continueUntilConfirmed: false,
    },
  ]);

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
    // {
    //   id: '4',
    //   name: 'Meeting',
    //   color: '#42c5f5',
    // For things like meetings they have a set start and date time, and we don't want to both users with clocking them.
    // For other tasks we need them to track it, or we can just have estimated end or actual end?
    //   fixedTiming: false
    // }
  ]);

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
          <AddItem />
          <ItemTypes itemTypes={itemTypes} setItemTypes={setItemTypes}/>
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