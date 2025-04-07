import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateEditMentalHealthCoalaRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/coala-register/useMutateEditCoalaRegister'
import { useFetchReadMentalHealthCoalaRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/coala-register/useFetchReadCoalaRegister'

import { SkeletonCard } from '../../../components/SkeletonCard/SkeletonCard'
import {
  FormFieldsCoalaRegisterProps,
  initialCoalaRegistersValues,
  schemaCoalaRegisters,
} from '../../CoalaRegisterContent.schema'
import { CoalaRegisterForm } from '../CoalaRegisterForm/CoalaRegisterForm'

type Props = {
  id: number
  userId: number
  onFinish: () => void
  isUploading?: boolean
  onUpload: (file: File) => Promise<number>
}

export const EditCoalaRegisterForm = ({ id, userId, onFinish, onUpload, isUploading }: Props) => {
  const editMutation = useMutateEditMentalHealthCoalaRegister()
  const { isLoading, coalaRegister } = useFetchReadMentalHealthCoalaRegister({ id, userId })

  const form = useForm({
    defaultValues: initialCoalaRegistersValues,
    resolver: yupResolver(schemaCoalaRegisters),
  })

  useEffect(() => {
    if (coalaRegister) {
      form.reset({
        title: coalaRegister.title,
        description: coalaRegister.description,
        document: new File([], coalaRegister.file?.fileName || 'arquivo'),
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coalaRegister])

  const onSubmit = async (body: FormFieldsCoalaRegisterProps) => {
    await editMutation.mutateAsync({
      userId,
      id,
      description: body.description,
      title: body.title,
      documentId: body.document?.id ? Number(body.document.id) : null,
    })
    onFinish()
  }

  if (isLoading || !coalaRegister) {
    return <SkeletonCard />
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <CoalaRegisterForm onUpload={onUpload} />
      <Divider sx={{ my: 2 }} />
      <FormButtons
        display='flex'
        justifyContent='flex-end'
        isLoading={editMutation.isPending}
        confirmLabel='Salvar'
        cancelLabel='Cancelar'
        disableConfirm={isUploading}
        onCancel={onFinish}
        minWidth={['100%', 135]}
      />
    </CForm>
  )
}
