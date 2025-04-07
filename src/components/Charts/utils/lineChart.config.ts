import br from 'apexcharts/dist/locales/pt-br.json'

import { chartColors } from './chartColors'

export const getLineChartOptions = (
  options: ApexCharts.ApexOptions,
  categories: string[],
  title: string,
): ApexCharts.ApexOptions => ({
  chart: {
    id: 'line',
    locales: [br],
    defaultLocale: 'pt-br',
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories,
    title: {
      text: title,
      style: {
        fontFamily: 'Outfit',
        fontWeight: 'normal',
        fontSize: '14px',
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  colors: chartColors,
  ...options,
})
