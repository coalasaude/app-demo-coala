export interface ChartData {
  label: string
  value: number | number[]
}

export interface DonutChartProps {
  data?: ChartData[]
}

export interface LineChartProps {
  data?: ChartData[]
  categories?: string[]
  title?: string
}

export interface GradientChartProps {
  series: number[]
}

export interface AreaChartProps {
  title: string
  categories: string[]
  data: ChartData[]
}
