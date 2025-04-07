import { yupResolver } from '@hookform/resolvers/yup'
import { Dialog, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useEffect, useState } from 'react'

import { CForm } from '@/components/Forms'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import { AppointmentStatus } from '@/v3/domain/Appointment'
import { useMutateChangeStatusAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateChangeStatusAppointment'
import { AppointmentFinishedStatus } from '@/constants/appointment'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'

import GeneralData from './components/GeneralData/GeneralData'

interface IForm {
  finishedReason?: AppointmentFinishedStatus | null
}

const schema = yup.object({
  finishedReason: yup.string().required(),
}) as any

interface IModal {
  open: boolean
  appointment: AppointmentReadDataModel
  onClose: (isSuccess: boolean) => void
}

export const FinishedAppointment = ({ appointment, open, onClose }: IModal) => {
  const isMobile = useMediaQuery('sm')
  const changeStatus = useMutateChangeStatusAppointment()
  const theme = useTheme()
  const [showModal, setShowModal] = useState(false)

  const { handleSubmit, control, formState, reset, watch, ...others } = useForm({
    defaultValues: {
      finishedReason: appointment?.finishedReason || null,
    },
    resolver: yupResolver(schema),
  })

  const finishedReason = watch('finishedReason')

  const onFinish = async () => {
    const isInvalid =
      finishedReason === AppointmentFinishedStatus.INVALID ||
      finishedReason === AppointmentFinishedStatus.EVASION

    if (!appointment.complaint && !isInvalid) {
      setShowModal(true)
    } else {
      onFinishAppointment()
    }
  }

  const onFinishAppointment = async () => {
    const body: IForm = others.getValues()

    await changeStatus.mutateAsync({
      appointmentId: appointment.id,
      finishedReason: body.finishedReason,
      status: AppointmentStatus.FINISHED,
    })

    onClose(true)
  }

  useEffect(() => {
    if (!appointment?.finishedReason) return

    reset({
      finishedReason: appointment?.finishedReason || null,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment?.finishedReason])

  return (
    <>
      <Dialog
        open={!!open}
        onClose={() => onClose(false)}
        aria-labelledby='change-status-dialog'
        aria-describedby='change-status-description'
        PaperProps={{
          sx: {
            maxWidth: isMobile ? theme.spacing(48) : theme.spacing(64),
            width: '100%',
          },
        }}
      >
        <CForm
          form={{ handleSubmit, control, formState, reset, watch, ...others }}
          onSubmit={onFinish}
        >
          <GeneralData
            loading={changeStatus.isPending}
            finishedStatus={appointment.finishedReason}
            isFinished={appointment.isFinished}
            onClose={onClose}
          />
        </CForm>
      </Dialog>

      <ComplaintModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onFinish={onFinishAppointment}
      />
    </>
  )
}

export default FinishedAppointment
