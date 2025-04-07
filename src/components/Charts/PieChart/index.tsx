import React from 'react'
import { Props } from 'react-apexcharts'

import { DonutChartProps } from '../chart.types'
import { apexDonutAdapter } from '../utils/adapters'
import { getPieChartOptions } from '../utils/pieChart.config'

import { StyledChart } from './styles'

const PieChart: React.FC<DonutChartProps & Props> = ({ data, ...props }) => {
  const options = getPieChartOptions({
    ...apexDonutAdapter(data || []),
  })

  return (
    <StyledChart options={options} series={options.series} type='pie' height={250} {...props} />
  )
}

export default PieChart
