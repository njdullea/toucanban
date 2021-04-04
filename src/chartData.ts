import { Dates, Calendar, Schedule } from './rschedule';
import { parse, format } from 'date-fns';

// The date and time in: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx" (using date fns). The is the same as the input for parsing a date: https://javascript.info/date#date-parse-from-a-string.
// For sorting, would the 'T' cause an issue?
type dateTime = string;

// The date and time in: "yyyy-MM-dd" (using date fns). This can be used to automatically parse a date. 
type date = string;

interface item {
  id: string,
  description: string,
  // The time the task starts.
  startDateTime: dateTime,
  // Time this task will take to complete
  duration: number | undefined,
  // The time the task should end. 
  // endDateTime: dateTime | undefined,
  // The time the user marked the task as complete.
  confirmedEndDateTime: dateTime | undefined,
  // If its a meeting, we shouldn't have to confirm complete. If it is a task, we should.
  continueUntilConfirmed: boolean,
}

const items: item[] = [
  {
    id: '1',
    description: 'Setup Project',
    startDateTime: '2021-04-01T09:00:00.000-07:00',
    // endDateTime: undefined,
    duration: undefined,
    confirmedEndDateTime: undefined,
    continueUntilConfirmed: true,
  },
  {
    id: '2',
    description: 'Meet about Project Overview',
    startDateTime: '2021-04-02T13:00:00.000-07:00',
    duration: 60,
    // endDateTime: '2021-04-02T14:00:00.000-07:00',
    confirmedEndDateTime: undefined,
    continueUntilConfirmed: false,
  }, 
  {
    id: '2',
    description: 'Begin Prototype Implementation',
    startDateTime: '2021-04-03T15:00:00.000-07:00',
    // endDateTime: '2021-04-04T09:00:00.000-07:00',
    duration: 60 * 5,
    confirmedEndDateTime: undefined,
    continueUntilConfirmed: false,
  },
]

function createCalendarFromItems(items: item[]): Calendar {
  const rDatesItems: Dates[] = [];
  for (const item of items) {
    const dateItem = new Dates({
      dates: [new Date(item.startDateTime)],
      duration: item.duration,
      data: {
        ...item,
      }
    });
    
    rDatesItems.push(dateItem);
  }

  const calendar = new Calendar({
    schedules: rDatesItems,
  });

  return calendar;
}

export function getDataPointSliceFromCalendar(startingDate: date, endingDate: date): NivoBumpChartData[] {
  const chartData: ChartDataObject = {};

  const calendar = createCalendarFromItems(items);


  // TODO: make object where keys are dates and array it items occuring on that date
  
  // TODO: sort the arrays of objects in the above based on start date time of each item

  // TODO: map object to new object where keys are ids, and each data point x is the date and y is the index in the sorted array of items on that date

  const occurences = calendar.occurrences({ start: new Date(startingDate), end: new Date(endingDate) });

  let index = 0;
  for (const dateOcc of occurences.toArray()) {
    // console.log('Date occ: ', dateOcc);
    const dateTime = dateOcc.toDateTime();
    // console.log('Date Time: ', dateTime);
    const date = format(dateTime.date, 'yyyy-MM-dd');
    // console.log('Check out the date: ', date);

    const dates = dateTime.generators[1] as Dates;
    console.log('Dates: ', dates.data);

    const startDateTime = dates.data.startDateTime;
    const endDateTime = dates.data.confirmedEndDateTime || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const description = dates.data.description;
    const id = dates.data.id;

    chartData[id] = {
      id,
      data: [
        {
          x: startDateTime,
          y: 0,
          id,
          description,
        }
      ]
    }
  }

  return Object.values(chartData);
}

interface xyPoint {
  x: number,
  y: number,
  id: string,
  description: string,
}

interface NivoBumpChartData {
  id: string,
  data: xyPoint[]
}

interface ChartDataObject {
  [key: string]: NivoBumpChartData,
}

