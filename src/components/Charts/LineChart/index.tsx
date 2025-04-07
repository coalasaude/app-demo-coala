import { getLineChartOptions } from '../utils/lineChart.config'
import { apexLineAdapter } from '../utils/adapters'
import { LineChartProps } from '../chart.types'

import { LinedChartDynamic } from './line-chart.dynamic'

export const LineChart: React.FC<LineChartProps> = ({ data, title, categories = [], ...props }) => {
  const series = apexLineAdapter(data || [])
  const options = getLineChartOptions({}, categories, title!)

  return <LinedChartDynamic options={options} series={series} {...props} />
}

export default LineChart
