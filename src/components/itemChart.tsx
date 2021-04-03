import React, { useState, useEffect, useRef } from 'react';
import { Chart, ChartItem, ChartConfiguration, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js';

// const chartConfig: ChartConfiguration = {
//   type: 'bar',
//   data: {
//     // ...
//   },
//   options: {
//     // ...
//   }
// };

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
    // const myChartRef = chartRef.current?.getContext('2d') as ChartItem;
    const ctx = document.getElementById('myChart') as ChartItem;

    new Chart(ctx, {
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
          //Customize chart options
      }
    });
  });

  // useEffect(() => {
  //   const ctx = document.getElementById("myChart") as ChartItem;
  //   new Chart(ctx, {
  //     type: "pie",
  //     data: {
  //       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //       datasets: [
  //         {
  //           label: "# of Votes",
  //           data: [12, 19, 3, 5, 2, 3],
  //           backgroundColor: [
  //             "Red",
  //             "Blue",
  //             "Yellow",
  //             "Green",
  //             "Purple",
  //             "Orange"
  //           ],
  //           borderColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //           borderWidth: 1
  //         }
  //       ]
  //     }
  //   });
  // });
  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default ItemChart;