import { useState, useEffect, useRef } from 'react';
import { Chart, ChartItem, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js';
import { Box } from 'theme-ui';
import { format, subDays, addDays } from 'date-fns';
import { Calendar, Dates } from '../rschedule';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { ResponsiveBump } from '@nivo/bump';

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0}
];

Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);
// Chart.register(CategoryScale);

// The date and time in: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx" (using date fns). The is the same as the input for parsing a date: https://javascript.info/date#date-parse-from-a-string.
type dateTime = string;

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

interface itemChartInput {
  items: item[]
}

// goes through all items constructing rrules, and rdates to make a calendar.
// using the calendar we can query for occurences on dates, or monthly, etc.
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

const chartItemsExamples = [
  {
    id: '1',
    description: 'Setup Project',
    startDateTime: '2021-04-02T09:00:00.000-07:00',
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
    startDateTime: '2021-04-02T15:00:00.000-07:00',
    // endDateTime: '2021-04-04T09:00:00.000-07:00',
    duration: 60 * 5,
    confirmedEndDateTime: undefined,
    continueUntilConfirmed: false,
  },
]

// const ItemChart = ({ items }: itemChartInput) => {
const ItemChart = () => {
  // const chartRef = useRef<HTMLCanvasElement>(null);
  
  // const [calendar] = useState(createCalendarFromItems(chartItemsExamples));
  // const getStartingDisplayDates = () => {
  //   const dates = [];
  //   const date = new Date();
  //   dates.push(format(subDays(date, 2), 'MM-dd'));
  //   dates.push(format(subDays(date, 1), 'MM-dd'));
  //   dates.push(format(date, 'MM-dd'));
  //   dates.push(format(addDays(date, 1), 'MM-dd'));
  //   dates.push(format(addDays(date, 2), 'MM-dd'));
  //   dates.push(format(addDays(date, 3), 'MM-dd'));
  //   dates.push(format(addDays(date, 4), 'MM-dd'));
  //   return dates;
  // };

  // const [selectedDates, setSelectedDates] = useState([
  //   '2021-04-01',
  //   '2021-04-02',
  //   '2021-04-03',
  //   '2021-04-04',
  //   '2021-04-05',
  // ]);
  
  // const [chartItems, setChartItems] = useState(exampleItems);

  // const [chartData, setChartData] = useState({

  // });

  // useEffect(() => {
  //   const myChartRef = chartRef.current?.getContext('2d') as ChartItem;
  //   // const ctx = document.getElementById('myChart') as ChartItem;

  //   const chart = new Chart(myChartRef, {
  //     type: "line",
  //     data: {
  //         //Bring in data
  //         labels: ["Jan", "Feb", "March"],
  //         datasets: [
  //           {
  //               label: "Sales",
  //               data: [86, 67, 91],
  //           },
  //           {
  //             label: 'Expenditures',
  //             data: [90, 54, 65],
  //           }
  //         ]
  //     },
  //     options: {
  //       responsive: false,
  //         //Customize chart options
  //       events: ['click', 'mousemove'],
  //       onClick: (e) => {
  //         console.log('On click: ', e);
  //         // const canvasPosition = Chart.helpers.getRelativePosition(e, chart);

  //         // // Substitute the appropriate scale IDs
  //         // const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
  //         // const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
  //         // console.log('Data X: ', dataX, 'and Data Y: ', dataY);
  //       }
  //     }
  //   });

  //   return () => {
  //     // chart.destroy();
  //   }
  // });
  return (
    <Box sx={{display: 'flex', flex: 1, pt: 3, justifyContent: 'center'}}>
      {/* <canvas id="myChart" ref={chartRef} /> */}
      {/* <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries data={data} />
      </XYPlot> */}
    </Box>
  );
};

export default ItemChart;