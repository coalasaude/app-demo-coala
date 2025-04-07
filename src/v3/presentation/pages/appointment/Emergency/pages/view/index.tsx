import { SocketAppointmentProvider } from '../../contexts/socket-appointment.provider'

import ViewAppointment from './components/ViewAppointment/ViewAppointment'

export const ViewAppointmentPage = () => {
  return (
    <SocketAppointmentProvider>
      <ViewAppointment />
    </SocketAppointmentProvider>
  )
}

export default ViewAppointmentPage
