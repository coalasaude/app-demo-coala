import { styled } from '@mui/material/styles'

import { DonutChartDynamic } from './donut-chart.dynamic'

export const StyledChart = styled(DonutChartDynamic)`
  height: 100% !important;

  @media (min-width: ${({ theme }) => theme.breakpoints.down('lg')}) {
    height: 100% !important;

    .apexcharts {
      height: 100% !important;
    }

    .apexcharts-legend {
      height: 100% !important;
      display: grid;
      grid-auto-columns: 240px;
      padding-left: 16px;
      padding-top: 12px;
      grid-template-rows: repeat(auto-fit, minmax(24px, auto));
      grid-auto-flow: column;
      max-height: 50px;
    }

    .apexcharts-legend-text {
      margin-left: ${({ theme }) => theme.spacing(-1)};
    }

    .apexcharts-legend-series {
      max-height: 50px;
      word-wrap: break-word;
    }
  }
`
