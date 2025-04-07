import br from 'apexcharts/dist/locales/pt-br.json'

import { pieChartColors } from './chartColors'

export const getPieChartOptions = (options: ApexCharts.ApexOptions): ApexCharts.ApexOptions => ({
  chart: {
    type: 'pie',
    locales: [br],
    defaultLocale: 'pt-br',
  },
  colors: pieChartColors,
  legend: {
    position: 'right',
    fontFamily: 'Outfit',
    fontSize: '16px',
    height: 450,
    horizontalAlign: 'left',
    offsetX: 24,
    itemMargin: {
      vertical: 3,
    },
  },
  responsive: [
    {
      breakpoint: 1460,
      options: {
        chart: { height: 350 },
        legend: {
          height: 0,
          position: 'bottom',
          fontFamily: 'Outfit',
          horizontalAlign: 'left',
          fontSize: '16px',
        },
      },
    },
    {
      breakpoint: 900,
      options: {
        height: 350,
        legend: {
          height: 0,
          position: 'bottom',
          fontFamily: 'Outfit',
          fontSize: '12px',
          horizontalAlign: 'left',
          offsetX: 0,
          itemMargin: {
            vertical: 3,
          },
        },
        dataLabels: {
          show: true,
        },
      },
    },
  ],
  dataLabels: {
    enabled: false,
    style: {
      colors: ['rgba(0,0,0,0)'],
    },
    background: {
      enabled: true,
      borderColor: '#fff',
      borderRadius: 2,
      borderWidth: 1,
    },
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
