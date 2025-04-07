import { Pie, Legend, Tooltip, PieChart, Cell } from 'recharts'
import { useCallback, useEffect, useState } from 'react'
import { Typography } from '@mui/material'

import { useLazyFetch } from '@/hooks/useFetch'
import { GetAppointmentFinished } from '@/types/getAppointmentFinished'
import { AppointmentFinishedStatus } from '@/constants/appointment'

import { DashboardContent } from '../styles'

type PieChartData = {
  name: string | undefined
  value: number
  color: string | undefined
}
const convertFinishedStatus = [
  {
    value: AppointmentFinishedStatus.CALL_CENTER,
    label: 'Resolução via teleatendimento',
    color: 'var(--mui-palette-info-light)',
  },
  {
    value: AppointmentFinishedStatus.SAMU_FIREFIGHTER,
    label: 'Remoção por SAMU/Bombeiro',
    color: 'var(--mui-palette-warning-light)',
  },
  {
    value: AppointmentFinishedStatus.EMERGENCY_ROOM,
    label: 'Encaminhamento ao pronto-socorro',
    color: 'var(--mui-palette-error-light)',
  },
  {
    value: AppointmentFinishedStatus.OUTPATIENT_INVESTIGATION,
    label: 'Encaminhamento para investigação ambulatorial',
    color: 'var(--mui-palette-emergency-light)',
  },
  {
    value: AppointmentFinishedStatus.INVALID,
    label: 'Solicitação inválida',
    color: 'var(--mui-palette-grey-300)',
  },
  {
    value: AppointmentFinishedStatus.EVASION,
    label: 'Evasão',
    color: 'var(--mui-palette-grey-800)',
  },
]

export const AppointmentFinishedChart = () => {
  const [apiRequest, { data: dataAppointment }] = useLazyFetch<GetAppointmentFinished[]>()
  const [appointment, setAppointment] = useState<PieChartData[]>([])

  const getAppointmentFinished = useCallback(async () => {
    await apiRequest({
      path: 'dashboard/appointment-finished-status',
      method: 'GET',
    })
  }, [apiRequest])

  useEffect(() => {
    getAppointmentFinished()
  }, [getAppointmentFinished])

  useEffect(() => {
    if (dataAppointment !== undefined) {
      const pieChart = dataAppointment.map((item) => {
        const label = convertFinishedStatus.find((status) => status.value === item.finished_status)
        return { name: label?.label, value: item._count.finished_status, color: label?.color }
      })
      const pieChartWithoutUndefined = pieChart.filter((item) => item.name !== undefined)

      setAppointment(pieChartWithoutUndefined)
    }
  }, [dataAppointment])

  return (
    <DashboardContent>
      <Typography variant='h4'>Desfechos de atendimentos</Typography>
      <PieChart style={{ width: '100%' }} width={100} height={150}>
        <Legend verticalAlign='top' wrapperStyle={{ paddingBottom: 20 }} />
        <Tooltip />
        <Pie
          data={appointment}
          dataKey='value'
          nameKey='name'
          outerRadius={100}
          fill='#8884d8'
          innerRadius={40}
        >
          {appointment.map(({ color }) => (
            <Cell fill={color} key={color} />
          ))}
        </Pie>
      </PieChart>
    </DashboardContent>
  )
}
