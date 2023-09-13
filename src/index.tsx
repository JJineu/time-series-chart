import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import HttpClientImpl from './httpClient/httpClient.ts';
import ChartServiceImpl from './services/ChartService.ts';
import { ChartProvider } from './context/ChartContext.tsx';

const httpClient = new HttpClientImpl(import.meta.env.VITE_BASE_URL);
const chartService = new ChartServiceImpl(httpClient);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChartProvider chartService={chartService}>
    <App />
  </ChartProvider>,
);
