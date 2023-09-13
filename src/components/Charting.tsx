import React, { useEffect, useState } from 'react';

import { Chart } from 'react-chartjs-2';
import { useChart } from '../context/ChartContext';
import { registChart } from '../utils/registChart';
import { initialChart, chartOptions } from '../utils/chart';

import { COLORS } from '../constants/color';

registChart();

const Charting = () => {
  const { data: chartData, setFilterID, filterID } = useChart();
  const [filterData, setFilterData] = useState<
    | typeof initialChart
    | {
        datasets: any[];
      }
  >(initialChart);

  const changeFilterID = (e: {
    chart: { tooltip: { title: React.SetStateAction<string | null>[] } };
  }) => {
    setFilterID(e.chart.tooltip.title[0]);
  };

  useEffect(() => {
    const filterdChart = {
      datasets: [
        {
          ...filterData.datasets[0],
          data: chartData.map((data) => ({ x: data.time, y: data.value_area, id: data.id })),
        },
        {
          ...filterData.datasets[1],
          data: chartData.map((data) => ({ x: data.time, y: data.value_bar, id: data.id })),
          backgroundColor: chartData.map((data) =>
            data.id === filterID ? COLORS.lightCoral : COLORS.lightGray,
          ),
          borderColor: chartData.map((data) =>
            data.id === filterID ? COLORS.lightCoral : COLORS.lightGray,
          ),
        },
      ],
    };

    setFilterData(filterdChart);
  }, [filterID, chartData]);

  return (
    <Chart
      options={chartOptions(changeFilterID)}
      data={filterData}
      style={{ width: '90vw', height: '90vw' }}
      type={'line'}
    />
  );
};

export default Charting;
