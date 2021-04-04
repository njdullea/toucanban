import { getDataPointSliceFromCalendar } from './chartData';

describe('Data Tools', () => {
  test('Get data point slice from calendar', () => {
    const startingDate = '2021-04-01';
    const endingDate = '2021-04-04';
    const result = getDataPointSliceFromCalendar(startingDate, endingDate);
  });
});