import dynamic from 'next/dynamic'
import ReactApexChart from 'react-apexcharts'

export const DonutChartDynamic = dynamic(
  () => import('react-apexcharts').then((mod) => mod as any),
  { ssr: false },
) as typeof ReactApexChart
