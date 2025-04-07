import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { limit } from '@/constants/api'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'
import { bindPathParams } from '@/utils/bindParams'
import { UsersInCallModelType } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { useFetchBrowseAppointments } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseAppointments'
import { useOnNewAppointment } from '@/v3/presentation/pages/appointment/Emergency/hooks/useOnNewAppointment'
import { queryStringToObject } from '@/v3/utils/query-string-to-object'

import { convertFilterParams } from '../components/AppointmentListTable/utils/convert-filter-params'

import AudioSong from '/public/assets/sounds/appointment.mp3'

import { playAudioSound } from '../../../../../utils/play-audio-sound'

import { useOnParticipantsChanged } from './useOnParticipantsChanged'
import { useOnUpdateAppointmentList } from './useOnUpdateAppointmentList'

export type ParticipantsMapType = Record<number, UsersInCallModelType[]>
export type AllResponsbileInCallType = Record<number, boolean>

export const useAppointmentEmergency = () => {
  const [canManageAppointment] = useHasPermission([Permissions.MANAGE_APPOINTMENT])

  const router = useRouter()
  const queryParams = convertFilterParams(router.query)

  const { appointments, isPending, refetch } = useFetchBrowseAppointments({
    limit: limit,
    ...queryParams,
  })

  const appointmentIds = useMemo(
    () => appointments?.data?.map((appointment) => appointment.id) || [],
    [appointments?.data],
  )

  const { participantsMap } = useOnParticipantsChanged(appointmentIds)

  const onViewAppointment = (appointmentId: number) => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, { id: appointmentId }),
    )
  }

  const onNewAppointment = () => {
    const offset = queryStringToObject(window.location.search)?.offset
    const isFirstPage = !offset || Number(offset) == 0
    if (isFirstPage) playAudioSound(AudioSong)
    refetch()
  }

  useOnNewAppointment(onNewAppointment)
  useOnUpdateAppointmentList(appointmentIds, () => {
    refetch()
  })

  return {
    appointments,
    isLoading: isPending,
    canManageAppointment,
    onViewAppointment,
    participantsMap,
  }
}
