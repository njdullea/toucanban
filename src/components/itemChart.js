import { useState, useEffect, useRef } from 'react';
import { Box } from 'theme-ui';
import { ResponsiveBump } from '@nivo/bump';
import { getDataPointSliceFromCalendar } from '../chartData';

// TODO: monitor this issue and convert to typescript
// https://github.com/plouc/nivo/issues/1225

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

const CustomPoint = ({ x, y, isActive, isInactive, size, color, borderColor, borderWidth }) => {
    return (
        <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
            {/* <rect
                x={size * -0.5 - 4}
                y={size * -0.5 + 4}
                width={size + borderWidth}
                height={size + borderWidth}
                fill="rgba(0, 0, 0, .07)"
            />
            <rect
                x={size * -0.5}
                y={size * -0.5}
                width={size}
                height={size}
                fill={color}
                stroke={borderColor}
                strokeWidth={borderWidth}
            /> */}
            {/* {isActive && (
                <text textAnchor="middle" y={4} fill={borderColor}>
                    A
                </text>
            )}
            {isInactive && (
                <text textAnchor="middle" y={4} fill={borderColor}>
                    I
                </text>
            )} */}
        </g>
    )
}

const commonProps = {
    width: 900,
    height: 360,
    margin: { top: 40, right: 100, bottom: 40, left: 100 },
    titleOffsetX: -80,
    // data: generateData(),
    spacing: 20,
}

const ItemChart = () => {
  // const [inputData] = useState(getDataPointSliceFromCalendar('2021-04-01', '2021-04-05'));
  return (
    <Box sx={{height: 400}}>
      <ResponsiveBump
        {...commonProps}
        pointComponent={CustomPoint}
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        legend={false}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisRight={null}
        axisBottom={null}
        // axisBottom={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: '',
        //     legendPosition: 'middle',
        //     legendOffset: 32
        // }}
        axisLeft={null}
        // axisLeft={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'ranking',
        //     legendPosition: 'middle',
        //     legendOffset: -40
        // }}
      />
    </Box>
  );
};

export default ItemChart;