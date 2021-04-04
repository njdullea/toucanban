import { useState, useEffect, useRef } from 'react';
import { Chart, ChartItem, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js';
import { Box } from 'theme-ui';
import { format, subDays, addDays } from 'date-fns';
import { Schedule, Calendar, OccurrenceGenerator, Dates } from '../rschedule';
// import {XYPlot, LineSeries} from 'react-vis';

const data = [
//   {x: 0, y: 8},
//   {x: 1, y: 5},
//   {x: 2, y: 4},
//   {x: 3, y: 9},
//   {x: 4, y: 1},
//   {x: 5, y: 7},
//   {x: 6, y: 6},
//   {x: 7, y: 3},
//   {x: 8, y: 2},
//   {x: 9, y: 0}
// ];

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

const ItemChart = ({ items  }: itemChartInput) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [calendar] = useState(createCalendarFromItems(items));

  useEffect(() => {
    const myChartRef = chartRef.current?.getContext('2d') as ChartItem;
    // const ctx = document.getElementById('myChart') as ChartItem;

    const chart = new Chart(myChartRef, {
      type: "line",
      data: {
          //Bring in data
          labels: ["Jan", "Feb", "March"],
          datasets: [
            {
                label: "Sales",
                data: [86, 67, 91],
            },
            {
              label: 'Expenditures',
              data: [90, 54, 65],
            }
          ]
      },
      options: {
        responsive: false,
          //Customize chart options
        events: ['click', 'mousemove'],
        onClick: (e) => {
          console.log('On click: ', e);
          // const canvasPosition = Chart.helpers.getRelativePosition(e, chart);

          // // Substitute the appropriate scale IDs
          // const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          // const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
          // console.log('Data X: ', dataX, 'and Data Y: ', dataY);
        }
      }
    });

    return () => {
      chart.destroy();
    }
  });
  return (
    <Box sx={{display: 'flex', flex: 1, pt: 3, justifyContent: 'center'}}>
      <canvas id="myChart" ref={chartRef} />
    </Box>
  );
};

export default ItemChart;