import { yupResolver } from '@hookform/resolvers/yup'
import { Alert } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms/Form'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { CBaseContainer, PageHeader } from '@/v3/presentation/newComponents'
import { useMutateEditAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateEditAppointment'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'

import {
  IFormEditAppointment,
  initialEditAppointmentValues,
  schemaEdit,
} from '../../components/Appointment/FormAppointment/schema/edit-schema'
import { EditStep } from '../../components/Appointment/FormAppointment/steps'

export const EditAppointment = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)

  const editAppointment = useMutateEditAppointment()

  const { appointment } = useFetchReadAppointment({ appointmentId })

  const { handleSubmit, control, formState, reset, watch, ...others } = useForm({
    defaultValues: initialEditAppointmentValues,
    resolver: yupResolver(schemaEdit),
  })

  useEffect(() => {
    if (appointment) {
      reset({
        institutionId: appointment?.institution?.id,
        requestedUserId: appointment?.requestedUser?.id,
        patientId: appointment?.patient?.id,
      })
    }
  }, [appointment, reset])

  const onSubmit = async (body: IFormEditAppointment) => {
    await editAppointment.mutateAsync({
      appointmentId,
      patientId: body.patientId!,
    })

    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
        id: appointmentId,
      }),
    )
  }

  return (
    <>
      <PageHeader title='Editar atendimento' />

      {editAppointment.errorMessage && (
        <Alert severity='error' variant='filled'>
          {editAppointment.errorMessage}
        </Alert>
      )}
      <CForm
        form={{ handleSubmit, control, formState, reset, watch, ...others }}
        onSubmit={onSubmit}
        id='myForm'
      >
        <CBaseContainer>
          <EditStep disableButton={editAppointment.isPending} onNextStep={handleSubmit(onSubmit)} />
        </CBaseContainer>
      </CForm>
    </>
  )
}

export default EditAppointment
