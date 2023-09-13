import React, { createContext, useContext, useEffect, useState } from 'react';

import ChartService from '../services/ChartService';
import { Idata } from '../types/data';

interface IchartContext {
  data: Idata[];
  filterID: string | null;
  setFilterID: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [data, setData] = useState<Idata[]>([]);
  const [filterID, setFilterID] = useState<string | null>(null);

  useEffect(() => {
    chartService.get().then((data) => {
      const jsonData = data.response;
      const dataArray = Object.keys(jsonData).map((key) => ({
        time: key,
        id: jsonData[key].id,
        value_area: jsonData[key].value_area,
        value_bar: jsonData[key].value_bar,
      }));
      setData(dataArray);
    });
  }, [chartService, setData]);

  return (
    <ChartContext.Provider value={{ data, filterID, setFilterID }}>
      {children}
    </ChartContext.Provider>
  );
}
