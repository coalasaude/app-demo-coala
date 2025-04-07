import { Dialog } from '@mui/material'

import { AppointmentStatus } from '@/types/appointment'
import { CDialogue } from '@/v3/presentation/components/Modal'
import { useMutateChangeStatusAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateChangeStatusAppointment'

interface IModal {
  appointmentId: number
  open: boolean
  onClose: () => void
}

export const StartAppointment = ({ appointmentId, open, onClose }: IModal) => {
  const changeStatus = useMutateChangeStatusAppointment()

  const onSubmit = async () => {
    await changeStatus.mutateAsync({
      status: AppointmentStatus.IN_ATTENDANCE,
      appointmentId,
    })

    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby='change-status-dialog'
      aria-describedby='change-status-description'
    >
      <CDialogue
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onSubmit}
        onClose={() => onClose()}
        title='Atenção!'
        description='Deseja iniciar o atendimento?'
      />
    </Dialog>
  )
}

export default StartAppointment
