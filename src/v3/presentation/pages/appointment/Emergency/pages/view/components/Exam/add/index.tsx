import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import dayjs from 'dayjs'

import { CForm } from '@/components/Forms/Form'
import { ModalCertificate } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate'
import { useMutateAddExam } from '@/v3/presentation/hooks/api/@v2/appointment/exam/useMutateAddExam'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'

import RegisterAddWrapper from '../../Desktop/RegisterAddWrapper/RegisterAddWrapper'

import { ExamForm } from './components/ExamData/ExamData'
import { initialValues, schema } from './schema'

export const AddExam = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const [showModal, setShowModal] = useState(false)
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const watchCertificationPass = form?.watch('certificatePass')
  const addExam = useMutateAddExam()

  const onSubmit = () => {
    setShowModal(true)
  }

  const onFinish = async () => {
    const body = form.getValues()

    await addExam.mutateAsync({
      appointmentId,
      certificationPassword: body.certificatePass,
      description: body.description,
      recommendation: body.recommendation,
      validUntil: dayjs().add(Number(body.valid_until), 'day').toDate(),
    })

    setShowModal(false)

    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`, {
        id: appointmentId,
      }),
    )
  }

  return (
    <RegisterAddWrapper>
      <CForm form={form} onSubmit={onSubmit} id='myForm'>
        <ExamForm isPending={addExam.isPending} />
        <ModalCertificate
          open={showModal}
          onClose={() => setShowModal(false)}
          handleSubmit={onFinish}
          isLoading={addExam.isPending}
          isSubmitButtonDisabled={!watchCertificationPass}
        />
      </CForm>
    </RegisterAddWrapper>
  )
}

export default AddExam
