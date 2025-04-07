import React, { createContext, useContext } from 'react'
import { Socket } from 'socket.io-client'

import { useSocket } from '../../../../hooks/useSocket'

const SocketAppointmentContext = createContext<{ socket: Socket | null }>({ socket: null })

export const useSocketAppointment = () => useContext(SocketAppointmentContext)

export const SocketAppointmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket } = useSocket({ path: 'v2/appointments' })

  return (
    <SocketAppointmentContext.Provider value={{ socket }}>
      {children}
    </SocketAppointmentContext.Provider>
  )
}
