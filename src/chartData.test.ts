import { getData } from './chartData';

describe('Data Tools', () => {
  test('Get data point slice from calendar', () => {
    getData('2021-04-01', '2021-04-04');
  });
});