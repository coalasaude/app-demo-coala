import { AppointmentStatus } from '@/v3/domain/Appointment'

export const getAppointmentStatusColor = (status: AppointmentStatus) => {
  if (status === AppointmentStatus.FINISHED || status === AppointmentStatus.FINISHED_REMOVAL) {
    return '--mui-palette-grey-400'
  }
  if (status === AppointmentStatus.IN_ATTENDANCE) {
    return '--mui-palette-info-main'
  }
  if (status === AppointmentStatus.FOLLOW_UP) {
    return '--mui-palette-emergency-main'
  }
  return '--mui-palette-success-main'
}
