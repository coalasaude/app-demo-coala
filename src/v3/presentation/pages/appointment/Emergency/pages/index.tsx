import { PageHeader } from '@/v3/presentation/newComponents'

import AppointmentsListTab from '../components/AppointmentListTab'
import { SocketAppointmentProvider } from '../contexts/socket-appointment.provider'

export const AppointmentsList = () => {
  return (
    <SocketAppointmentProvider>
      <PageHeader title='Pronto atendimento' />
      <AppointmentsListTab />
    </SocketAppointmentProvider>
  )
}

export default AppointmentsList
