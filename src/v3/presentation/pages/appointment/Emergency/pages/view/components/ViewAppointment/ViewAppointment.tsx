import { Box } from '@mui/material'
import Router, { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'
import { AppointmentStatus } from '@/types/appointment'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useInvalidateQuery } from '@/v3/presentation/hooks/api/@v2/@shared/useInvalidateQuery'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'
import { PageHeader } from '@/v3/presentation/newComponents'

import MotionWaitingAttendance from '../../../../components/MotionWaitingAttendance'
import { useOnUpdateAppointment } from '../../../../hooks/useOnUpdateAppointment'
import { useAppointmentSurvey } from '../../hooks/useAppointmentSurvey'
import AppointmentData from '../AppointmentData'
import { HeaderAppointment } from '../HeaderAppointment'
import { CAppointmentTicketHeader } from '../Ticket'

import { ViewAppointmentSkeleton } from './ViewAppointmentSkeleton'

export const ViewAppointment = () => {
  const router = useRouter()
  const appointmentId = useMemo(() => Number(router.query.id), [router.query.id])

  const { appointment, refetch } = useFetchReadAppointment({ appointmentId })
  const [canManageAppointment] = useHasPermission([Permissions.MANAGE_APPOINTMENT])
  const { invalidateQueryKey } = useInvalidateQuery()
  const { onOpenAppointmentSurvey, isPending } = useAppointmentSurvey(appointmentId)

  useOnUpdateAppointment(appointmentId, () => {
    invalidateQueryKey([QueryKeyEnum.TIMELINE, appointmentId])
    invalidateQueryKey([QueryKeyEnum.APPOINTMENT_ATTACHMENT, appointmentId])
    invalidateQueryKey([QueryKeyEnum.APPOINTMENT_DIAGNOSE, appointmentId])
    invalidateQueryKey([QueryKeyEnum.APPOINTMENT_EXAM, appointmentId])
    invalidateQueryKey([QueryKeyEnum.APPOINTMENT_MEDICAL_RECORD, appointmentId])
    invalidateQueryKey([QueryKeyEnum.APPOINTMENT_PRESCRIPTION, appointmentId])
    invalidateQueryKey([QueryKeyEnum.APPOINTMENT_REPORT, appointmentId])
    invalidateQueryKey([QueryKeyEnum.APPOINTMENT_SICK_NOTE, appointmentId])
    refetch()
  })

  const isWaitingAttendance = appointment?.status === AppointmentStatus.WAITING_ATTENDANCE

  useEffect(() => {
    if (!isPending) {
      onOpenAppointmentSurvey()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  return (
    <>
      <PageHeader
        title='Atendimento'
        onBack={() => Router.push(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.LIST.path)}
      />

      {!appointment ? (
        <ViewAppointmentSkeleton />
      ) : (
        <>
          <Box>
            <Box display='flex' flexDirection={['column', 'column', 'column', 'row']} gap={2}>
              <HeaderAppointment
                appointment={appointment}
                canEdit={canManageAppointment}
                refetchAppointment={refetch}
              />
              <CAppointmentTicketHeader
                appointment={appointment}
                canChangeAppointmentStatus={canManageAppointment}
              />
            </Box>
          </Box>
          {!canManageAppointment && isWaitingAttendance ? (
            <MotionWaitingAttendance />
          ) : (
            <AppointmentData appointment={appointment} />
          )}
        </>
      )}
    </>
  )
}

export default ViewAppointment
