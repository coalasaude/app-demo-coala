import { AppointmentQueue } from '@/v3/domain/Appointment'

export const QueueDescription: Record<string, string> = {
  [AppointmentQueue.DOCTOR]: 'Médico',
  [AppointmentQueue.NURSE]: 'Enfermeira',
}
export const AppointmentQueueOptions = [
  {
    label: QueueDescription[AppointmentQueue.DOCTOR],
    value: AppointmentQueue.DOCTOR,
  },
  {
    label: QueueDescription[AppointmentQueue.NURSE],
    value: AppointmentQueue.NURSE,
  },
]

export const QueueDescriptionList: Record<string, string> = {
  [AppointmentQueue.DOCTOR]: 'Fila Médico',
  [AppointmentQueue.NURSE]: 'Fila Enfermeira',
}
