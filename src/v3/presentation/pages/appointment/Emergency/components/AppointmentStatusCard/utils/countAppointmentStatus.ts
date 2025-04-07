import { AppointmentBrowseDataModel } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { AppointmentStatus } from '@/v3/domain/Appointment'

export const countAppointmentStatus = ({
  appointments,
  status,
}: {
  appointments?: AppointmentBrowseDataModel[]
  status: AppointmentStatus[]
}): number => {
  const count = appointments?.filter((appointment) => status.includes(appointment.status)).length

  return count || 0
}
