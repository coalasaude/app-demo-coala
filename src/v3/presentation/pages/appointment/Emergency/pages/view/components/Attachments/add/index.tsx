import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { CForm } from '@/components/Forms/Form'
import { useMutateAddAttachment } from '@/v3/presentation/hooks/api/appointment/records/useMutateAddAttachment'

import RegisterAddWrapper from '../../Desktop/RegisterAddWrapper/RegisterAddWrapper'

import AttachmentData from './components/AttachmentData'
import { initialValues, schema } from './schema'

export const AddAttachments = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const { mutateAsync, isPending } = useMutateAddAttachment()
  const form = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) })

  const onSubmit = async (body: { title: string; file: File | null }) => {
    mutateAsync({ appointmentId, data: body }).then(() => router.back())
  }

  return (
    <RegisterAddWrapper>
      <CForm form={form} onSubmit={onSubmit} id='myForm'>
        <AttachmentData isPending={isPending} />
      </CForm>
    </RegisterAddWrapper>
  )
}

export default AddAttachments
