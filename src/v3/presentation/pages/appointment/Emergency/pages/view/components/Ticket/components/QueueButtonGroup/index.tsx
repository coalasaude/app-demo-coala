import { Box, Typography } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import { AppointmentQueue } from '@/v3/domain/Appointment'
import { useMutateChangeQueueAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateChangeQueueAppointment'
import { CButton } from '@/v3/presentation/newComponents'
import { CButtonGroup } from '@/v3/presentation/newComponents/molecules/CButtonGroup'

export const QueueButtonGroup = ({ appointment }: { appointment: AppointmentReadDataModel }) => {
  const isMobile = useMediaQuery('sm')
  const changeQueue = useMutateChangeQueueAppointment()

  const onSubmit = async (queue: AppointmentQueue) => {
    await changeQueue.mutateAsync({
      appointmentId: appointment.id,
      queue,
    })
  }

  return (
    <Box
      display='flex'
      alignItems={isMobile ? 'flex-start' : 'center'}
      flexDirection={isMobile ? 'column' : 'row'}
      gap={1}
    >
      <Typography variant='h5' color='var(--blue_gray_100)'>
        Fila:
      </Typography>
      <CButtonGroup
        variant='secondary'
        loading={changeQueue.isPending}
        size='small'
        selectedIndex={appointment.queue === AppointmentQueue.NURSE ? 0 : 1}
        primary={isMobile ? 'split' : 'basic'}
      >
        <CButton onClick={() => onSubmit(AppointmentQueue.NURSE)} disabled={appointment.isFinished}>
          Enfermagem
        </CButton>
        <CButton
          onClick={() => onSubmit(AppointmentQueue.DOCTOR)}
          disabled={appointment.isFinished}
        >
          Médico
        </CButton>
      </CButtonGroup>
    </Box>
  )
}

export default QueueButtonGroup
