import { VideocamOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { NEW_ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import { AppointmentStatus } from '@/types/appointment'
import { bindPathParams } from '@/utils/bindParams'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import HeaderButtonsPortal from '@/v3/presentation/components/PageHeader/HeaderButtonsPortal'
import { useMutateChangeStatusAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateChangeStatusAppointment'
import { CButton } from '@/v3/presentation/newComponents'

import { StyledMedicalActionsWrapper } from './styles'

export const AppointmentActions = ({
  appointment,
  canChangeAppointmentStatus,
  onShowStartAppointment,
  onShowFinishAppointment,
}: {
  appointment: AppointmentReadDataModel
  onShowStartAppointment: () => void
  onShowFinishAppointment: () => void
  canChangeAppointmentStatus: boolean
}) => {
  const changeStatus = useMutateChangeStatusAppointment()
  const isMobile = useMediaQuery('sm')
  const router = useRouter()
  const isCallPage = router.pathname === NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path
  const openMoreThanOneHourAgo = dayjs().diff(dayjs(appointment?.createdAt), 'hour') > 1
  const canReopen = !appointment.isFinished || !openMoreThanOneHourAgo

  const handleReOpenAppointment = () => {
    changeStatus.mutate({
      status: AppointmentStatus.IN_ATTENDANCE,
      appointmentId: appointment.id,
      finishedReason: null,
    })
  }

  const handleVideoCall = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path, { id: appointment.id }),
    )
  }

  return (
    <StyledMedicalActionsWrapper>
      {canChangeAppointmentStatus && canReopen && (
        <HeaderButtonsPortal boxProps={{ width: '100%' }} isFlexButtons>
          <CButton
            variant='link'
            size='small'
            loading={changeStatus.isPending}
            onClick={appointment.isFinished ? handleReOpenAppointment : onShowFinishAppointment}
            fullWidth
          >
            {appointment.isFinished ? 'Reabrir' : 'Finalizar'}
          </CButton>
        </HeaderButtonsPortal>
      )}
      {appointment.isWaitingAttendance && canChangeAppointmentStatus && (
        <HeaderButtonsPortal boxProps={{ width: '100%' }} isFlexButtons>
          <CButton size='small' variant='primary' onClick={onShowStartAppointment} fullWidth>
            Iniciar
          </CButton>
        </HeaderButtonsPortal>
      )}
      {!appointment.isWaitingAttendance && (
        <HeaderButtonsPortal boxProps={{ width: '100%' }} isFlexButtons>
          <CButton
            size='small'
            variant='primary'
            onClick={handleVideoCall}
            sx={isMobile ? { width: '100%' } : { minWidth: '160px' }}
            disabled={isCallPage || appointment.isFinished}
          >
            <>
              <VideocamOutlined />
              <Box ml={1}>{'Vídeo chamada'}</Box>
            </>
          </CButton>
        </HeaderButtonsPortal>
      )}
    </StyledMedicalActionsWrapper>
  )
}
