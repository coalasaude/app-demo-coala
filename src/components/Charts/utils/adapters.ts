import { reduce } from 'lodash'

import { ChartData } from '../chart.types'

export const apexDonutAdapter = (dataList: ChartData[]) =>
  reduce(
    dataList,
    (result: any, value) => {
      result.series.push(value.value)
      result.labels.push(value.label)

      return result
    },
    {
      series: [],
      labels: [],
    },
  )

export const apexLineAdapter = (dataList: ChartData[]) =>
  dataList.map(({ label, value }) => ({
    name: label,
    data: Array.isArray(value) ? value : [value],
  }))
