import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts'
import { useCallback, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { useLazyFetch } from '@/hooks/useFetch'
import { GetStudentsVaccineCovid } from '@/types/getStudentsVaccineCovid'

import { DashboardContent } from '../styles'

type RadarChartData = {
  subject: string
  value: number
}

export const VaccineCovidChart = () => {
  const [apiRequest, { data: dataVaccine }] = useLazyFetch<GetStudentsVaccineCovid[]>()
  const [dataVaccineCovid, setVaccineCovid] = useState<RadarChartData[]>()
  const [maxDomain, setMaxDomain] = useState<number>()

  const getStudentsVaccineCovid = useCallback(async () => {
    await apiRequest({
      path: 'dashboard/students-vaccine-covid',
      method: 'GET',
    })
  }, [apiRequest])

  useEffect(() => {
    getStudentsVaccineCovid()
  }, [getStudentsVaccineCovid])

  useEffect(() => {
    if (dataVaccine !== undefined) {
      let maxValue = 0
      const radarChart = []
      for (let i = 0; i < 4; i++) {
        const value = dataVaccine.length > i ? dataVaccine[i]?._count?.vaccine_id : 0
        radarChart.push({ subject: `${i + 1}ª dose`, value })
        if (dataVaccine[i]?._count?.vaccine_id > maxValue) {
          maxValue = dataVaccine[i]._count.vaccine_id
        }
      }
      setMaxDomain(maxValue)
      setVaccineCovid(radarChart)
    }
  }, [dataVaccine])

  return (
    <DashboardContent>
      <Typography variant='h4'>Alunos vacinados contra a COVID-19</Typography>
      <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
        <RadarChart
          outerRadius={90}
          data={dataVaccineCovid}
          style={{ width: '100%' }}
          width={730}
          height={250}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey='subject' />
          <PolarRadiusAxis
            angle={30}
            domain={[0, maxDomain ? maxDomain + Math.round(maxDomain / 2) : 0]}
          />
          <Radar
            name='Alunos vacinados'
            dataKey='value'
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </Box>
    </DashboardContent>
  )
}
