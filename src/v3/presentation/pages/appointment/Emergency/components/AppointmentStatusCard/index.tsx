import { Box } from '@mui/material'
import { AccessTime, VideocamOutlined } from '@mui/icons-material'

import { AppointmentBrowseDataModel } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { AppointmentStatus } from '@/v3/domain/Appointment'

import { countAppointmentStatus } from './utils/countAppointmentStatus'
import { Card } from './components/Card'

type AppointmentStatusCardProps = {
  appointments?: AppointmentBrowseDataModel[]
}
export const AppointmentStatusCard = ({ appointments }: AppointmentStatusCardProps) => {
  const inAttendanceAppointments = countAppointmentStatus({
    appointments,
    status: [AppointmentStatus.IN_ATTENDANCE],
  })
  const waitingAppointments = countAppointmentStatus({
    appointments,
    status: [
      AppointmentStatus.WAITING_ATTENDANCE,
      AppointmentStatus.WAITING_DOCTOR,
      AppointmentStatus.WAITING_NURSE,
      AppointmentStatus.WAITING_RECIPE,
      AppointmentStatus.WAITING_REMOVAL,
    ],
  })

  return (
    <Box display='flex' gap={2}>
      <Card
        Icon={AccessTime}
        bgColor='var(--mui-palette-success-light)'
        number={waitingAppointments}
        title='Aguardando'
        titleColor='var(--mui-palette-success-main)'
      />
      <Card
        Icon={VideocamOutlined}
        bgColor='var(--mui-palette-info-light)'
        number={inAttendanceAppointments}
        title='Atendimento'
        titleColor='var(--mui-palette-info-main)'
      />
    </Box>
  )
}
