import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useCallback, useEffect } from 'react'
import dayjs from 'dayjs'
import { Box, Typography } from '@mui/material'

import { useLazyFetch } from '@/hooks/useFetch'
import { GetMedicalRecordsMonthly } from '@/types/getMedicalRecordsMonthly'

import { DashboardContent } from '../styles'

type LineChartData = {
  name: string
  emergency: number
  veryUrgent: number
  urgent: number
  notUrgent: number
  lowUrgent: number
}

export const MedicalRecordMonthlyChart = () => {
  const [apiRequest, { data: dataMedicalRecords }] = useLazyFetch<GetMedicalRecordsMonthly[]>()

  const getAppointmentMonthly = useCallback(async () => {
    await apiRequest({
      path: 'dashboard/medical-record-monthly',
      method: 'GET',
    })
  }, [apiRequest])

  useEffect(() => {
    getAppointmentMonthly()
  }, [getAppointmentMonthly])

  let data: LineChartData[] = []
  if (dataMedicalRecords !== undefined) {
    data = dataMedicalRecords.map((item) => {
      const month = dayjs(item.month, 'MM').format('MMMM')
      let emergency = 0
      let veryUrgent = 0
      let urgent = 0
      let notUrgent = 0
      let lowUrgent = 0
      item.medicalRecords.map((medicalRecords) => {
        if (medicalRecords.classification === 'EMERGENCY') {
          emergency = medicalRecords._count.id
        } else if (medicalRecords.classification === 'VERY_URGENT') {
          veryUrgent = medicalRecords._count.id
        } else if (medicalRecords.classification === 'URGENT') {
          urgent = medicalRecords._count.id
        } else if (medicalRecords.classification === 'LOW_URGENT') {
          notUrgent = medicalRecords._count.id
        } else if (medicalRecords.classification === 'NOT_URGENT') {
          lowUrgent = medicalRecords._count.id
        }
      })
      return {
        name: month,
        emergency,
        veryUrgent,
        urgent,
        notUrgent,
        lowUrgent,
      }
    })
  }

  return (
    <DashboardContent>
      <Typography variant='h4'>Classificações de risco de pronto atendimento</Typography>
      <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
        <LineChart data={data} width={730} height={250}>
          <Legend verticalAlign='top' wrapperStyle={{ paddingBottom: 20 }} />
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='emergency'
            name='Emergência'
            stroke='var(--mui-palette-error-light)'
            strokeWidth={3}
            fill='var(--mui-palette-error-light)'
            fillOpacity={0.3}
          />
          <Line
            type='monotone'
            dataKey='veryUrgent'
            name='Muito Urgente'
            stroke='var(--mui-palette-emergency-light)'
            strokeWidth={3}
            fill='var(--mui-palette-emergency-light)'
            fillOpacity={0.3}
          />
          <Line
            type='monotone'
            dataKey='lowUrgent'
            name='Baixa urgência'
            stroke='var(--mui-palette-success-light)'
            strokeWidth={3}
            fill='var(--mui-palette-success-light)'
            fillOpacity={0.3}
          />
          <Line
            type='monotone'
            dataKey='notUrgent'
            name='Não urgente'
            stroke='var(--mui-palette-info-light)'
            strokeWidth={3}
            fill='var(--mui-palette-info-light)'
            fillOpacity={0.3}
          />
          <Line
            type='monotone'
            dataKey='urgent'
            name='Urgente'
            stroke='var(--mui-palette-warning-light)'
            strokeWidth={3}
            fill='var(--mui-palette-warning-light)'
            fillOpacity={0.3}
          />
        </LineChart>
      </Box>
    </DashboardContent>
  )
}
