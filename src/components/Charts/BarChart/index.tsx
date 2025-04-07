import { apexLineAdapter } from '../utils/adapters'
import { LineChartProps } from '../chart.types'
import { getBarChartOptions } from '../utils/barChart.config'

import { BarChartDynamic } from './bar-chart.dynamic'

export const BarChart: React.FC<LineChartProps> = ({ data, categories, ...props }) => {
  const series = apexLineAdapter(data || [])
  const options = getBarChartOptions({}, categories || [])

  return <BarChartDynamic type='bar' options={options} series={series} height={300} {...props} />
}

export default BarChart
