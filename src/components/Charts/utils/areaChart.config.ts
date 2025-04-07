import { areaChartColors } from './chartColors'

export const getAreaChartOptions = (
  options: ApexCharts.ApexOptions,
  labels: string[],
  categories: string[],
  title: string,
): ApexCharts.ApexOptions => ({
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: areaChartColors,
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    fill: {
      type: 'solid',
      colors: areaChartColors,
    },
  },
  labels,
  responsive: [
    {
      breakpoint: 900,
      options: {
        chart: {
          height: 250,
        },
        xaxis: {
          offsetY: 0,
          title: {
            offsetY: -4,
          },
        },
      },
    },
  ],
  xaxis: {
    categories,
    offsetY: 7,
    position: 'bottom',
    title: {
      text: title,
      style: {
        fontFamily: 'Outfit',
        fontWeight: 'normal',
        fontSize: '14px',
      },
    },
  },
  ...options,
})
