import br from 'apexcharts/dist/locales/pt-br.json'

import { gradientChartColors } from './chartColors'

export const getGradientChartOptions = (
  options: ApexCharts.ApexOptions,
  series: number[],
): ApexCharts.ApexOptions => ({
  series,
  chart: {
    type: 'radialBar',
    locales: [br],
    defaultLocale: 'pt-br',
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1100,
      options: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              value: {
                fontFamily: 'Outfit',
                fontSize: '24px',
              },
            },
          },
        },
      },
    },
    {
      breakpoint: 900,
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          height: 180,
          offsetY: 0,
          offsetX: 0,
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              value: {
                offsetY: 9,
                fontFamily: 'Outfit',
                fontSize: '20px',
              },
            },
          },
        },
      },
    },
  ],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: '70%',
        background: '#fff',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: true,
          opacity: 0.1,
        },
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0,
        dropShadow: {
          enabled: true,
          opacity: 0.1,
        },
      },

      dataLabels: {
        show: true,
        name: {
          show: false,
        },
        value: {
          formatter: function (val) {
            return `${val}%`
          },
          color: 'var(--mui-palette-primary-main)',
          fontSize: '36px',
          fontFamily: 'Outfit',
          fontWeight: 700,
          show: true,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: gradientChartColors,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'round',
  },
  labels: ['Percent'],
  ...options,
})
