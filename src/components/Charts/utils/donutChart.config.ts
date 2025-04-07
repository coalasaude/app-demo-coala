import br from 'apexcharts/dist/locales/pt-br.json'

import { chartColors } from './chartColors'

export const getDonutChartOptions = (options: ApexCharts.ApexOptions): ApexCharts.ApexOptions => ({
  chart: {
    type: 'donut',
    locales: [br],
    defaultLocale: 'pt-br',
  },
  colors: chartColors,
  legend: {
    offsetY: 50,
    position: 'right',
    fontFamily: 'Outfit',
    fontSize: '14px',
    horizontalAlign: 'left',
    itemMargin: {
      vertical: 2,
    },
  },
  responsive: [
    {
      breakpoint: 1460,
      options: {
        legend: {
          offsetY: 0,
          position: 'bottom',
          fontFamily: 'Outfit',
          horizontalAlign: 'center',
          fontSize: '16px',
        },
      },
    },
    {
      breakpoint: 900,
      options: {
        legend: {
          offsetY: 0,
          position: 'bottom',
          fontFamily: 'Outfit',
          fontSize: '14px',
          horizontalAlign: 'left',
        },
        dataLabels: {
          show: true,
        },
      },
    },
  ],
  dataLabels: {
    enabled: false,
    dropShadow: {
      enabled: false,
    },
  },
  fill: {
    opacity: 1,
  },
  stroke: {
    width: 3,
  },
  ...options,
})
