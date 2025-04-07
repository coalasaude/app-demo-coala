import { Appointment } from '@/v2/domain/Appointment'
import { Appointment as IAppointment } from '@/types/appointment'
import { TApiRequest } from '@/v2/infra/request'

export class GetAppointment {
  constructor(private readonly apiRequest: TApiRequest) {}
  async get({ id }: { id?: number }) {
    const appointmentData = await this.apiRequest.execute<IAppointment>({
      method: 'GET',
      path: 'appointments/:id',
      pathParams: {
        id,
      },
    })
    return new Appointment(appointmentData)
  }
}
