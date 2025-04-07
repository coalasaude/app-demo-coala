import { Appointment as IAppointment } from '@/types/appointment'

import { User } from './User'

type TAppointment = Omit<IAppointment, 'requestedUser' | 'patient'> & {
  requestedUser: User
  patient?: User
  scheduledMentalHealthId: number
}
export class Appointment {
  data: TAppointment = {} as TAppointment

  constructor(params: IAppointment) {
    const { requestedUser, patient, ...data } = params
    this.data = {
      ...data,
      patient: patient ? new User(patient) : undefined,
      requestedUser: new User(requestedUser),
      scheduledMentalHealthId: params.scheduled_mental_health_id,
    }
  }
}
