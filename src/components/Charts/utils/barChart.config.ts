import br from 'apexcharts/dist/locales/pt-br.json'

export const getBarChartOptions = (
  options: ApexCharts.ApexOptions,
  categories: string[],
): ApexCharts.ApexOptions => ({
  chart: {
    type: 'bar',
    locales: [br],
    height: 300,
    defaultLocale: 'pt-br',
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories,
    position: 'top',
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
    labels: {
      style: {
        fontFamily: 'Outfit',
        fontSize: '12px',
      },
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 12,
      borderRadiusApplication: 'end',
      barHeight: '100%',
      dataLabels: {
        position: 'top',
        orientation: 'horizontal',
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val.toString()
    },
    offsetY: -20,
    style: {
      fontFamily: 'Outfit',
      fontSize: '12px',
      fontWeight: 300,
    },
  },
  yaxis: {
    show: false,
  },
  colors: ['var(--mui-palette-primary-main)'],
  tooltip: {
    enabled: true,
  },
  ...options,
})
