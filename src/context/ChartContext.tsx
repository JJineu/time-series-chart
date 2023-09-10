import React, { createContext, useContext, useEffect, useState } from 'react';

import ChartService from '../services/ChartService';
import { Idata } from '../types/data';

interface IchartContext {
  chartData: Idata[];
}

const ChartContext = createContext<IchartContext | undefined>(undefined);

export const useChart = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('Cannot find RepoProvider');
  }

  return context;
};

export function ChartProvider({
  children,
  chartService,
}: {
  children: React.ReactNode;
  chartService: ChartService;
}) {
  const [chartData, setChartdata] = useState<Idata[]>([]);

  useEffect(() => {
    chartService.get().then((data) => {
      setChartdata(data.response);
    });
  }, [chartService, setChartdata]);

  return <ChartContext.Provider value={{ chartData }}>{children}</ChartContext.Provider>;
}
