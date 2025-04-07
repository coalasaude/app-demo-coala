import { Box, Grid, useMediaQuery as mUseMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { ListSkeleton } from '@/components/Skeletons'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { Meeting } from '@/containers/Appointment/components/Meeting'
import { useHasPermission } from '@/hooks/useHasPermission'
import { useLayout } from '@/hooks/useLayout'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useParams } from '@/hooks/useParams'
import { AppointmentStatus } from '@/types/appointment'
import { bindPathParams } from '@/utils/bindParams'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useInvalidateQuery } from '@/v3/presentation/hooks/api/@v2/@shared/useInvalidateQuery'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'
import { useMutateEnableNotificationAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateEnableNotification'
import { useActivateRedirect } from '@/v3/presentation/hooks/useActivateRedirect'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { PageHeader } from '@/v3/presentation/newComponents'
import MotionWaitingAttendance from '@/v3/presentation/pages/appointment/Emergency/components/MotionWaitingAttendance'
import { useOnParticipantsChanged } from '@/v3/presentation/pages/appointment/Emergency/hooks/useOnParticipantsChanged'
import AppointmentData from '@/v3/presentation/pages/appointment/Emergency/pages/view/components/AppointmentData'
import { HeaderAppointment } from '@/v3/presentation/pages/appointment/Emergency/pages/view/components/HeaderAppointment'
import { CAppointmentTicketHeader } from '@/v3/presentation/pages/appointment/Emergency/pages/view/components/Ticket'

import { CDialogue } from '../../../../../../../presentation/newComponents/layout/CDialogue'
import { useOnUpdateAppointment } from '../../../hooks/useOnUpdateAppointment'
import { useAppointmentSurvey } from '../../view/hooks/useAppointmentSurvey'

import VideoCallResume from './VideoCallResume'

export const AppointmentCallView = () => {
  const router = useRouter()
  const appointmentId = useMemo(
    () => Number(router.query.subId) || Number(router.query.id),
    [router.query.id, router.query.subId],
  )

  const { params } = useParams()
  const { showSnackBar } = useLayout()
  const { auth } = useAuth()
  const { appointment, meeting, refetch } = useFetchReadAppointment({ appointmentId })
  const { mutateAsync: enableNotification } = useMutateEnableNotificationAppointment()
  const { handleModal } = useModalContext()
  const { participantsMap, allResponsibleInCall } = useOnParticipantsChanged(appointmentId)
  const { onOpenActivateModal } = useActivateRedirect()

  const [canManageAppointment] = useHasPermission([
    Permissions.MANAGE_APPOINTMENT,
    Permissions.VIEW_OTHER_APPOINTMENT,
  ])
  const isSmallDevice = useMediaQuery('sm')
  const isMediumDevice = useMediaQuery('md')
  const isDesktop = mUseMediaQuery('(min-width:1280px)')
  const [showWaitingRoom, setShowWaitingRoom] = useState(false)
  const [isEndCall, setIsEndCall] = useState(false)
  const { invalidateQueryKey } = useInvalidateQuery()
  const { onOpenAppointmentAttendance, refetchSurvey, isPending } =
    useAppointmentSurvey(appointmentId)

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

  const handleOpenModal = async (id: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => {
          await enableNotification({ appointmentId: id })
        }}
        title='Atenção'
        description='Você deseja enviar uma notificação de abertura de atendimento para o responsável?'
      />,
    )
  }

  useEffect(() => {
    if (!isPending) {
      onOpenAppointmentAttendance()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  useEffect(() => {
    const participants = participantsMap[appointmentId]

    const currentUserInCall = participants?.some((participant) => participant.id === auth?.user?.id)
    const hasResume = !!appointment?.medicalRecord

    setShowWaitingRoom(!currentUserInCall && !!hasResume && !isEndCall)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndCall, participantsMap])

  useEffect(() => {
    if (isEndCall && auth.token?.attendanceOnly) {
      onOpenActivateModal()
    }
  }, [auth.token, isEndCall, onOpenActivateModal])

  useEffect(() => {
    if (params?.classificationIsNull === true) {
      showSnackBar({
        message: 'Existe algum campo obrigatório não preenchido. Por favor, verifique.',
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.classificationIsNull])

  const handleIsEndCall = () => {
    setIsEndCall(true)
    refetchSurvey()
  }

  if (!appointment?.id) {
    return <ListSkeleton />
  }

  const isWaitingAttendance = appointment?.status === AppointmentStatus.WAITING_ATTENDANCE

  if (!canManageAppointment && isWaitingAttendance) {
    return <MotionWaitingAttendance />
  }

  return (
    <>
      <PageHeader
        title='Atendimento em vídeo'
        onBack={() =>
          router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
              id: router.query.id,
            }),
          )
        }
        actionButtonProps={{
          children: 'Notificar responsável',
          onClick: () => handleOpenModal(appointmentId),
          variant: 'outlined',
          disabled: allResponsibleInCall[appointmentId],
        }}
      />
      <Box display='flex' flexDirection={isDesktop ? 'row' : 'column'} gap={2}>
        <HeaderAppointment appointment={appointment} canEdit={canManageAppointment} />
        <CAppointmentTicketHeader
          appointment={appointment}
          canChangeAppointmentStatus={canManageAppointment}
        />
      </Box>
      <Grid container xs={12} md={12} lg={12} height='90vh'>
        <Grid
          item
          xs={12}
          md={canManageAppointment ? 8 : 12}
          lg={canManageAppointment ? 8 : 12}
          pr={canManageAppointment && !isSmallDevice && !isMediumDevice ? 2 : 0}
          height='100%'
        >
          <Meeting
            isEndCall={isEndCall}
            handleIsEndCall={handleIsEndCall}
            roomId={meeting?.roomId || ''}
            token={meeting?.token || ''}
          />
        </Grid>

        {canManageAppointment && (
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            height='100%'
            pt={isSmallDevice || isMediumDevice ? 2 : 0}
            mb={isSmallDevice || isMediumDevice ? 2 : 0}
          >
            <Box
              id='GridVideoViewAddAppointment'
              position='relative'
              height={isSmallDevice ? '100%' : '90vh'}
            >
              {!!showWaitingRoom ? (
                <VideoCallResume
                  users={participantsMap[appointmentId]}
                  medicalRecord={appointment.medicalRecord}
                />
              ) : (
                <AppointmentData appointment={appointment} isResumeVideoLog />
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  )
}
