import { useEffect } from 'react'

import { SocketListenerEnum } from '@/v3/presentation/enums/socket.enum'

import { useSocketAppointment } from '../contexts/socket-appointment.provider'

export const useOnNewAppointment = (callback: () => void) => {
  const { socket } = useSocketAppointment()

  useEffect(() => {
    socket?.on(SocketListenerEnum.NEW_APPOINTMENT, () => {
      callback()
    })

    return () => {
      socket?.off(SocketListenerEnum.NEW_APPOINTMENT)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
}
