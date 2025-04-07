import { Dialog } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { CBaseContainer } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'
import { useMutateUpdateAppointmentComplaint } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateUpdateAppointmentComplaint'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'
import { useFetchBrowseComplaint } from '@/v3/presentation/hooks/api/@v2/appointment/complaint/useFetchBrowseComplaint'

import { InformationStep } from '../WithStepModal/steps/InformationStep'

export interface ModalComplaintProps {
  open?: boolean
  onClose: () => void
  onFinish?: () => void
}

const schema = yup
  .object({
    complaintId: yup.number().required().nullable(),
    isAccident: yup.string().required().nullable(),
  })
  .required()

export const ComplaintModal = ({ open, onClose, onFinish }: ModalComplaintProps) => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const { appointment } = useFetchReadAppointment({ appointmentId })
  const { complaints } = useFetchBrowseComplaint({
    name: appointment?.complaint,
    limit: 1,
  })

  const appointmentComplaint =
    appointment?.complaint && complaints?.data[0]?.id ? complaints?.data[0]?.id : null
  const appointmentIsAccident = appointment?.isAccident ? String(!!appointment?.isAccident) : null

  const initialValues = {
    complaintId: appointmentComplaint,
    isAccident: appointmentIsAccident,
  }

  const form = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) })
  const { mutateAsync: updateAppointment, isPending } = useMutateUpdateAppointmentComplaint()
  const { complaintId, isAccident } = form.getValues()
  const isMissingValue = !complaintId || !isAccident

  useEffect(() => {
    if (!complaints) return

    form.reset({
      complaintId: appointmentComplaint,
      isAccident: appointmentIsAccident,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complaints])

  const onSubmit = async () => {
    if (!isAccident) form.setError('isAccident', { message: 'Campo obrigatório.' })
    if (!complaintId) form.setError('complaintId', { message: 'Campo obrigatório.' })

    await updateAppointment({
      appointmentId,
      complaintId: Number(complaintId),
      isAccident: isAccident === 'true' ? true : false,
    })

    onFinish && onFinish()
    onClose()
  }

  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      aria-labelledby='modal-with-step-dialog'
      aria-describedby='modal-with-step-dialog'
    >
      <CForm form={form} onSubmit={onSubmit} id='myForm'>
        <CBaseContainer
          title='Atenção'
          buttonLabel='Atualizar'
          buttonDisabled={isMissingValue}
          isLoading={isPending}
          cancelLabel='Cancelar'
          boxShadow='none'
          onConfirm={onSubmit}
          onCancel={onClose}
        >
          <InformationStep />
        </CBaseContainer>
      </CForm>
    </Dialog>
  )
}
