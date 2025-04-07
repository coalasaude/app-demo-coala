import { AreaChartProps } from '../chart.types'
import { apexLineAdapter } from '../utils/adapters'
import { getAreaChartOptions } from '../utils/areaChart.config'

import { AreaChartDynamic } from './area-chart.dynamic'

export const AreaChart: React.FC<AreaChartProps> = ({ title, data, categories, ...props }) => {
  const series = apexLineAdapter(data)
  const options = getAreaChartOptions({}, categories, categories, title)

  return <AreaChartDynamic type='area' options={options} series={series} height={280} {...props} />
}

export default AreaChart
