import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { CForm } from '@/components/Forms/Form'
import { ModalCertificate } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate'
import { useMutateAddSickNote } from '@/v3/presentation/hooks/api/appointment/records/useMutateAddSickNote'
import { useParams } from '@/hooks/useParams'

import RegisterAddWrapper from '../../Desktop/RegisterAddWrapper/RegisterAddWrapper'

import { GeneralData } from './components/GeneralData'
import { initialValues, schema } from './schema'

export const AddSickNote = () => {
  const form = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) })
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const watchCertificationPass = form.watch('certificatePass')
  const { mutateAsync, isPending } = useMutateAddSickNote()
  const { params } = useParams()

  const onSubmit = () => {
    setShowModal(true)
  }

  const onFinish = async () => {
    const body = {
      ...form.getValues(),
      certificatePass: form.getValues().certificatePass || params?.certificatePass,
    }

    await mutateAsync({ appointmentId, data: body }).then(() => router.back())
  }

  return (
    <RegisterAddWrapper>
      <CForm form={form} onSubmit={onSubmit} id='myForm'>
        <GeneralData isPending={isPending} />
        <ModalCertificate
          open={showModal}
          onClose={() => setShowModal(false)}
          handleSubmit={onFinish}
          isLoading={isPending}
          isSubmitButtonDisabled={!watchCertificationPass}
        />
      </CForm>
    </RegisterAddWrapper>
  )
}

export default AddSickNote
