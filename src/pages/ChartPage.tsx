import React, { useEffect, useState } from 'react';

import { useChart } from '../context/ChartContext';

export default function ChartPage() {
  const { chartData } = useChart();

  console.log(chartData);
  return <div></div>;
}
