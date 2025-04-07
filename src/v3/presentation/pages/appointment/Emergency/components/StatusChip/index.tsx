import { AppointmentStatusDescription } from '@/constants/status'
import { AppointmentStatus } from '@/v3/domain/Appointment'
import {
  AppointmentFinishedStatus,
  AppointmentFinishedStatusDescription,
} from '@/constants/appointment'

import { AppointmentStatusChip } from '../AppointmentStatusChip'
import { getAppointmentStatusColor } from '../../utils/getAppointmentStatusColor'
import { getAppointmentStatusBgColor } from '../../utils/getAppointmentStatusBgColorts'

type Props = {
  status: AppointmentStatus
  finishedStatus?: AppointmentFinishedStatus
}

export const StatusChip = ({ status, finishedStatus }: Props) => {
  const title =
    status === AppointmentStatus.FINISHED
      ? AppointmentFinishedStatusDescription[finishedStatus || '']
      : AppointmentStatusDescription[status || '']

  return (
    <AppointmentStatusChip
      title={title}
      circleColor={getAppointmentStatusColor(status || AppointmentStatus.FINISHED)}
      bgColor={getAppointmentStatusBgColor(status || AppointmentStatus.FINISHED)}
    />
  )
}
