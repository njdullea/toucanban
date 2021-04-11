import { Dates, Calendar, Schedule } from './rschedule';
import { parse, format, add } from 'date-fns';

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
    duration: 3440,
    confirmedEndDateTime: undefined,
    continueUntilConfirmed: true,
  },
  {
    id: '2',
    description: 'Meet about Project Overview',
    startDateTime: '2021-04-02T13:00:00.000-07:00',
    duration: 1440,
    // endDateTime: '2021-04-02T14:00:00.000-07:00',
    confirmedEndDateTime: undefined,
    continueUntilConfirmed: false,
  },
  {
    id: '3',
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

// IDEA: add granularity so we can zoom in/out?
export function getDataPointSliceFromCalendar(startingDate: date, endingDate: date): NivoBumpChartData[] {
  // we will need to filter items with ending date before starting date manually
  const chartData: ChartDataObject = {};

  const calendar = createCalendarFromItems(items);

  // const occurenceIterator = calendar.occurrences({ start: new Date(startingDate), end: new Date(endingDate) });
  const occurenceIterator = calendar.occurrences({ end: new Date(endingDate) });

  for (const occurence of occurenceIterator) {
    const date = format(occurence.date as Date, 'yyyy-MM-dd');
    if (!chartData[date]) {
      // chartData[date] = {};
    }
    // console.log('Date time: ', date);
    const itemStart = occurence.date as Date;
    const startDate = format(itemStart, 'yyyy-MM-dd');
    const itemEnd = add(itemStart, {
      minutes: occurence.generators[1].maxDuration
    });
    const endDate = format(itemEnd, 'yyyy-MM-dd');
    // for (le)
    // GO FROM START TO END DATE AND ADD DATE POINTS TO CHART DATA OBJECT
    
    // console.log('Formatted date: ', format(parse(occurence.date, '', new Date()), 'yyyy-MM-dd'))
    // console.log('Generators: ', occurence.generators);
    console.log('Dates: ', occurence.generators[1]);



    // console.log('L', occurence.generators[0];
    // const ruleScheduleSomething = occurence.generators[1];
    // console.log('rss: ', ruleScheduleSomething.data);
    // const date = format(new Date(occurenceDate), 'yyyy-MM-dd');
  }

  // TODO: make object where keys are dates and values are array of items occuring on that date
  
  // TODO: go through each key, and assign each 'y' value a rank from oldest to newest, and a null point on each end to indicate line is not infinite

  // TODO: make a new object, where each key is an id, and value is array array of x: date, y: rank | null

  

  // let index = 0;
  // for (const dateOcc of occurences.toArray()) {
  //   // console.log('Date occ: ', dateOcc);
  //   const dateTime = dateOcc.toDateTime();
  //   // console.log('Date Time: ', dateTime);
  //   const date = format(dateTime.date, 'yyyy-MM-dd');
  //   // console.log('Check out the date: ', date);

  //   const dates = dateTime.generators[1] as Dates;
  //   console.log('Dates: ', dates.data);

  //   const startDateTime = dates.data.startDateTime;
  //   const endDateTime = dates.data.confirmedEndDateTime || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  //   const description = dates.data.description;
  //   const id = dates.data.id;

  //   chartData[id] = {
  //     id,
  //     data: [
  //       {
  //         x: startDateTime,
  //         y: 0,
  //         id,
  //         description,
  //       }
  //     ]
  //   }
  // }

  return Object.values(chartData);
}

function getItemDates(): date[] {
  
  return [];
};

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

