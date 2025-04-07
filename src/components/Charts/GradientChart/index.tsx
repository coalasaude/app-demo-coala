import { GradientChartProps } from '../chart.types'
import { getGradientChartOptions } from '../utils/gradientChart.config'

import { GradientChartDynamic } from './gradient-chart.dynamic'

export const GradientChart: React.FC<GradientChartProps> = ({ series, ...props }) => {
  const options = getGradientChartOptions({}, series)

  return (
    <GradientChartDynamic
      type='radialBar'
      options={options}
      series={series}
      {...props}
      width={'100%'}
    />
  )
}

export default GradientChart
