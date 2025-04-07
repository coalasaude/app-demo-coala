import { AppointmentStatus } from '@/v3/domain/Appointment'

export const getAppointmentStatusBgColor = (status: AppointmentStatus) => {
  if (status === AppointmentStatus.FINISHED || status === AppointmentStatus.FINISHED_REMOVAL) {
    return '--mui-palette-grey-100'
  }
  if (status === AppointmentStatus.IN_ATTENDANCE) {
    return '--mui-palette-info-light'
  }

  return '--mui-palette-success-light'
}
