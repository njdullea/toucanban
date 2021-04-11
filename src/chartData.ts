import { DateTime, Interval, Duration } from 'luxon';

// The date and time in: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx" (using date fns). The is the same as the input for parsing a date: https://javascript.info/date#date-parse-from-a-string.
// For sorting, would the 'T' cause an issue?
type dateTime = string;

// The date and time in: "yyyy-MM-dd" (using date fns). This can be used to automatically parse a date. 
type date = string;

interface task {
  id: string,
  description: string,
  // The time the task starts.
  startDateTime: dateTime,
  // The time the task ends. 
  endDateTime: dateTime | undefined,
}

type tasks = task[];

interface tasksObject {
  [key: string]: task
}

const tasksObject: tasksObject = {
  'Setup Project': {
    id: 'Setup Project',
    description: 'Setup Project',
    startDateTime: '2021-03-31T09:00:00.000-07:00',
    endDateTime: '2021-04-03T09:00:00.000-07:00',
  },
  'Distribute Project Materials': {
    id: 'Distribute Project Materials',
    description: 'Meet about Project Overview',
    startDateTime: '2021-04-01T13:00:00.000-07:00',
    endDateTime: '2021-04-04T14:00:00.000-07:00',
  },
  'Begin Prototype Implementation': {
    id: 'Begin Prototype Implementation',
    description: 'Begin Prototype Implementation',
    startDateTime: '2021-04-03T15:00:00.000-07:00',
    endDateTime: '2021-07-02T14:00:00.000-07:00',
  }
}

/**
 * x is the dateTime of the data.
 * 
 * y is the ranking in the chart. On each end of the task will be a null point to indicate it does not go forever on chart.
 * 
 * id is the id of the task it is associated too. We keep track of this while in the data container to sort out to arrays separated by task after.
 */
interface xyPoint {
  x: string,
  y: number | null,
  id: string,
}

/**
 * id is the id of the task.
 * 
 * data contains item ranking sorted by date.
 */
interface TaskDataPoints {
  id: string,
  data: xyPoint[]
}

/**
 * Key is task id, value is object with id and data points for all the dates in the time range.
 */
interface TaskDataContainer {
  [key: string]: TaskDataPoints
}

/**
 * List of Object representing each task and their rankings over a split interval of time.
 */
type ChartData = TaskDataPoints[];

/**
 * Keys are date times, with an array of xyPoint from each task. 
 * 
 * Essentially this is a matrix where each column is the next date, and a list of items for each task where the x is the date, and y 0 or null depending on if it occurs on that date.
 */
interface DataContainer {
  [key: string]: xyPoint[]
}

function getTaskInterval(task: task): Interval {
  const start = DateTime.fromISO(task.startDateTime);
  const end = task.endDateTime ? DateTime.fromISO(task.endDateTime) : DateTime.fromJSDate(new Date());
  const interval = Interval.fromDateTimes(start, end);
  return interval;
}

export function getData(start: date, end: date): ChartData {
  // we can make an interval out of this, generate the splits, make an interval on each of the items, check overlay and return all the x points. then, we can make y points by ordering on the oldest start date time.
  const startDate = DateTime.fromFormat(start, 'yyyy-MM-dd');
  const endDate = DateTime.fromFormat(end, 'yyyy-MM-dd');
  const dataView: Interval = Interval.fromDateTimes(startDate, endDate);
  const frequency: Duration = Duration.fromISOTime('24:00');
  // TODO: we should just make go through all the tasks and check on these intervals instead of turning the columns into dateTimes and checking if task contains that datetime.
  const dataIntervals = dataView.splitBy(frequency);
  const dataColumns: string[] = dataIntervals.map(intrvl => intrvl.end.toFormat('yyyy-MM-dd'));
  dataColumns.unshift(dataIntervals[0].start.toFormat('yyyy-MM-dd'));
  // console.log('Data columns: ', dataColumns);

  // DATA CONTAINER SORTED BY DATETIME COLUMNS
  const dataContainer: DataContainer = {};
  dataColumns.map(column => {
    dataContainer[column] = [];
  });

  // APPEND XY POINT FOR EACH TASK TO EACH COLUMN CREATING A MATRIX. 0 IF TASK OCCURED ON DATE, NULL IF NOT.
  for (const task of Object.values(tasksObject)) {
    const interval = getTaskInterval(task);
    for (const column of Object.keys(dataContainer)) {
      const dateTime = DateTime.fromFormat(column, 'yyyy-MM-dd');
      const contained = interval.contains(dateTime);
      // For now we will sort the data points which 'y' is not null after we are done.
      // Once we take a look into how we want to filter out data more, there is probably a smarter way to do this.
      // Remember, we need to have a null point at the beginning and end of each task though.
      const yPoint = contained ? 0 : null;
      dataContainer[column].push({
        x: column,
        y: yPoint,
        id: task.id,
      });
    }
  }
  
  // GO THROUGH DATETIME DATA CONTAINER, SORT ITEMS IN EACH COLUMN SO TOP IS OLDEST, AND BOTTOM IS NEWEST
  // AFTER SORTING, ASSIGN RANK TO Y BASED ON INDEX IN COLUMN (NULL ITEMS ARE NOT RANKED)
  for (const column of Object.keys(dataContainer)) {
    const columnData = dataContainer[column];
    columnData.sort(rankTasks);
    for (const [index, point] of columnData.entries()) {
      if (point.y !== null) {
        point.y = index + 1;
      }
    }
  }

  // Go through all the datetime columns and sort items by task id
  const dataContainerSortedByTaskId: TaskDataContainer = {};
  for (const dateTimeColumn of Object.keys(dataContainer)) {
    const data = dataContainer[dateTimeColumn];
    for (const item of data) {
      if (!dataContainerSortedByTaskId[item.id]) {
        dataContainerSortedByTaskId[item.id] = {
          id: item.id,
          data: [],
        };
      }

      dataContainerSortedByTaskId[item.id].data.push(item);
    }
  }

  // const data: ChartData = [];
  const chartData = Object.values(dataContainerSortedByTaskId);
  console.log('Chart Data: ', JSON.stringify(chartData));
  return chartData;
}

/**
 * 
 * @param xy1 
 * @param xy2 
 * @returns 0 if equal rank, 1 if both exist and xy2 is older, -1 is xy1 is older. Numbers seem revers because we want reverse order.
 */
function rankTasks(xy1: xyPoint, xy2: xyPoint): number {
  if (xy1.y === null && xy2.y === null) {
    return 0;
  } else if (xy1.y === null) {
    return 1;
  } else if (xy2.y === null) {
    return -1;
  }

  const task1 = tasksObject[xy1.id];
  const task2 = tasksObject[xy2.id];
  const task1Start = DateTime.fromFormat(task1.startDateTime, 'yyyy-MM-dd');
  const task2Start = DateTime.fromFormat(task2.startDateTime, 'yyyy-MM-dd');
  const diff = task2Start.toMillis() - task1Start.toMillis();
  if (diff === 0) {
    return 0;
  } else if (diff > 0) {
    return -1;
  } else {
    return 1;
  }
}

/*

HERE IS AN EXAMPLE OF CHART DATA:

const data = [
  {
    "id": "Setup Project Board",
    "data": [
      {
        "x": '2021-04-01',
        "y": 1
      },
      {
        "x": '2021-04-02',
        "y": 1
      },
      {
        "x": '2021-04-03',
        "y": null
      },
      {
        "x": '2021-04-04',
        "y": null
      },
      {
        "x": '2021-04-05',
        "y": null
      }
    ]
  },
  {
    "id": "Review Project Materials",
    "data": [
      {
        "x": '2021-04-01',
        "y": 2
      },
      {
        "x": '2021-04-02',
        "y": 2
      },
      {
        "x": '2021-04-03',
        "y": 1
      },
      {
        "x": '2021-04-04',
        "y": 1
      },
      {
        "x": '2021-04-05',
        "y": null
      }
    ]
  },
  {
    "id": "Conduct Project Meeting",
    "data": [
      // {
      //   "x": '2021-04-01',
      //   "y": null
      // },
      {
        "x": '2021-04-02',
        "y": null
      },
      {
        "x": '2021-04-03',
        "y": 2
      },
      {
        "x": '2021-04-04',
        "y": 2
      },
      {
        "x": '2021-04-05',
        "y": 1
      }
    ]
  }
]

*/