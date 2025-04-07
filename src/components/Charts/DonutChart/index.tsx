import React from 'react'
import { Props } from 'react-apexcharts'

import { DonutChartProps } from '../chart.types'
import { apexDonutAdapter } from '../utils/adapters'
import { getDonutChartOptions } from '../utils/donutChart.config'

import { StyledChart } from './styles'

const DonutChart: React.FC<DonutChartProps & Props> = ({ data, ...props }) => {
  const options = getDonutChartOptions({
    ...apexDonutAdapter(data || []),
  })

  return (
    <StyledChart options={options} height={350} series={options.series} type='donut' {...props} />
  )
}

export default DonutChart
