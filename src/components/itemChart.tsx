import { useState, useEffect, useRef } from 'react';
import { Chart, ChartItem, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js';
import { Box } from 'theme-ui';

Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);
// Chart.register(CategoryScale);

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

const ItemChart = (props: { items: item[] }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const myChartRef = chartRef.current?.getContext('2d') as ChartItem;
    // const ctx = document.getElementById('myChart') as ChartItem;

    new Chart(myChartRef, {
      type: "line",
      data: {
          //Bring in data
          labels: ["Jan", "Feb", "March"],
          datasets: [
              {
                  label: "Sales",
                  data: [86, 67, 91],
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
  });
  return (
    <Box sx={{display: 'flex', flex: 1, pt: 3, justifyContent: 'center'}}>
      <canvas id="myChart" ref={chartRef} />
    </Box>
  );
};

export default ItemChart;