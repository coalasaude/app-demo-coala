import { SocketAppointmentProvider } from '../../contexts/socket-appointment.provider'

import { AppointmentCallView } from './components/AppointmentCallView'

export const AppointmentCallPage = () => {
  return (
    <SocketAppointmentProvider>
      <AppointmentCallView />
    </SocketAppointmentProvider>
  )
}

export default AppointmentCallPage
