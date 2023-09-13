import { COLORS } from '../constants/color';

export const initialChart = {
  datasets: [
    {
      type: 'line' as const,
      label: 'Area',
      fill: true,
      data: [],
      yAxisID: 'Area',
      xAxisID: 'times',
      backgroundColor: COLORS.lightBlue,
      borderColor: COLORS.blue,
      borderWidth: 2,
    },
    {
      type: 'bar' as const,
      label: 'Bar',
      data: [],
      yAxisID: 'Bar',
      xAxisID: 'times',
      backgroundColor: [],
      borderColor: [],
      borderWidth: 2,
      hoverBorderColor: COLORS.coral,
      hoverBackgroundColor: COLORS.lightCoral,
    },
  ],
};

export const chartOptions: any = (changeFilterID: (e: any) => void) => ({
  grouped: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  onClick: changeFilterID,
  plugins: {
    tooltip: {
      backgroundColor: COLORS.grayBlue,
      padding: 10,
      bodySpacing: 5,
      usePointStyle: true,
      callbacks: {
        title: (context: { raw: { id: any } }[]) => {
          const title = context[0].raw.id;
          return title;
        },
      },
    },
  },
  scales: {
    Area: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        display: false,
      },
      afterDataLimits: (scale: { max: number }) => {
        scale.max = scale.max * 2;
      },
      title: {
        display: true,
        align: 'end',
        color: COLORS.gray,
        font: {
          size: 12,
          weight: 300,
        },
        text: 'Area',
      },
    },
    Bar: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        align: 'end',
        color: COLORS.gray,
        font: {
          size: 12,
          weight: 300,
        },
        text: 'Bar',
      },
    },
    times: {
      afterTickToLabelConversion: function (scaleInstance: any) {
        const ticks = scaleInstance.ticks;
        const newTicks = ticks.filter((tick: { label: string | number | Date }) => {
          const seconds = new Date(tick.label).getSeconds();
          return seconds === 0 || seconds === 30;
        });
        scaleInstance.ticks = newTicks;
      },
      grid: {
        drawTicks: true,
        tickLength: 4,
        color: '#E2E2E230',
      },
      axis: 'x',
      position: 'bottom',
      ticks: {
        minRotation: 90,
        padding: 5,
      },
    },
  },
});
