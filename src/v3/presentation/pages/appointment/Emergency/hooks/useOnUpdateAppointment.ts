import { useEffect } from 'react'

import { SocketListenerEnum, SocketSubscribeEnum } from '@/v3/presentation/enums/socket.enum'
import { convertToArray } from '@/v3/utils/convert-to-array'

import { useSocketAppointment } from '../contexts/socket-appointment.provider'

export const useOnUpdateAppointment = (appointmentIds: number[] | number, callback?: () => void) => {
  const { socket } = useSocketAppointment()

  useEffect(() => {
    socket?.emit(SocketSubscribeEnum.SUBSCRIBE_UPDATE_APPOINTMENT, {
      appointmentIds: convertToArray(appointmentIds),
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, appointmentIds])

  useEffect(() => {
    socket?.on(SocketListenerEnum.UPDATE_APPOINTMENT, () => {
      callback?.()
    })

    return () => {
      socket?.off(SocketListenerEnum.UPDATE_APPOINTMENT)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
}
