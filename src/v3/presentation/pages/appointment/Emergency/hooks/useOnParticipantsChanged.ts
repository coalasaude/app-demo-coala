import { useEffect, useState } from 'react'

import { UsersInCallModelType } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { SocketListenerEnum, SocketSubscribeEnum } from '@/v3/presentation/enums/socket.enum'
import { convertToArray } from '@/v3/utils/convert-to-array'

import { useSocketAppointment } from '../contexts/socket-appointment.provider'

import { AllResponsbileInCallType, ParticipantsMapType } from './useAppointmentEmergency'

export type ParticipantsChangedType = {
  appointmentId: number
  participantData: {
    participants: UsersInCallModelType[]
    allResponsibleInCall: boolean
  }
}

export const useOnParticipantsChanged = (appointmentIds: number | number[]) => {
  const [participantsMap, setParticipantsMap] = useState<ParticipantsMapType>({})
  const [allResponsibleInCall, setAllResponsibleInCall] = useState<AllResponsbileInCallType>({})
  const { socket } = useSocketAppointment()

  const onParticipantsChanged = (message: ParticipantsChangedType[]) => {
    const map = message.reduce((acc, item) => {
      acc[item.appointmentId] = item.participantData.participants
      return acc
    }, {} as ParticipantsMapType)

    const responsibleInCall = message.reduce((acc, item) => {
      acc[item.appointmentId] = item.participantData.allResponsibleInCall
      return acc
    }, {} as AllResponsbileInCallType)

    setParticipantsMap((prevMap) => {
      return { ...prevMap, ...map }
    })
    setAllResponsibleInCall((prevResponsible) => {
      return { ...prevResponsible, ...responsibleInCall }
    })
  }

  useEffect(() => {
    socket?.emit(
      SocketSubscribeEnum.SUBSCRIBE_PARTICIPANTS,
      { appointmentIds: convertToArray(appointmentIds) },
      (message: ParticipantsChangedType[]) => onParticipantsChanged(message)
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, appointmentIds])

  useEffect(() => {
    socket?.on(SocketListenerEnum.PARTICIPANTS_CHANGED, (message: ParticipantsChangedType) => {
      onParticipantsChanged([message])
    })

    return () => {
      socket?.off(SocketListenerEnum.PARTICIPANTS_CHANGED)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return { participantsMap, allResponsibleInCall }
}
