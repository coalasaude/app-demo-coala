import { Alert } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

export const CanStartAppointmentAlert = ({
  beginHour,
  endHour,
}: {
  beginHour: Dayjs
  endHour: Dayjs
}) => {
  const date = dayjs()
  const canStartAppointment = date.isBetween(beginHour, endHour)

  if (!!canStartAppointment) {
    return null
  }

  return (
    <Alert severity='error' sx={{ boxShadow: 'none' }}>
      Só é possível iniciar um pronto atendimento das {beginHour.format('H:mm')}h às{' '}
      {endHour.format('H:mm')}h.
    </Alert>
  )
}

export default CanStartAppointmentAlert
