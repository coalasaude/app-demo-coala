import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateEditMentalHealthExternalRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/external-register/useMutateEditExternalRegister'
import { useFetchReadMentalHealthExternalRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/external-register/useFetchReadExternalRegister'

import { SkeletonCard } from '../../../components/SkeletonCard/SkeletonCard'
import {
  FormFieldsExternalRegisterProps,
  initialExternalRegistersValues,
  schemaExternalRegisters,
} from '../../ExternalRegisterContent.schema'
import { ExternalRegisterForm } from '../ExternalRegisterForm/ExternalRegisterForm'

type Props = {
  id: number
  userId: number
  isUploading?: boolean
  onUpload: (file: File) => Promise<number>
  onFinish: () => void
}

export const EditExternalRegisterForm = ({
  id,
  userId,
  onFinish,
  onUpload,
  isUploading,
}: Props) => {
  const editMutation = useMutateEditMentalHealthExternalRegister()
  const { isLoading, externalRegister } = useFetchReadMentalHealthExternalRegister({ id, userId })

  const form = useForm({
    defaultValues: initialExternalRegistersValues,
    resolver: yupResolver(schemaExternalRegisters),
  })

  useEffect(() => {
    if (externalRegister) {
      form.reset({
        description: externalRegister.description,
        title: externalRegister.title,
        professionalName: externalRegister.profissional.name,
        professionalTypeId: externalRegister.profissional.register.id,
        professionalRegister: externalRegister.profissional.register.value,
        document: new File([], externalRegister.file?.fileName || 'arquivo'),
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalRegister])

  const onSubmit = async (body: FormFieldsExternalRegisterProps) => {
    await editMutation.mutateAsync({
      ...body,
      userId,
      id,
      documentId: body.document?.id ? Number(body.document.id) : null,
    })
    onFinish()
  }

  if (isLoading || !externalRegister) {
    return <SkeletonCard />
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <ExternalRegisterForm onUpload={onUpload} />
      <Divider sx={{ my: 2 }} />
      <FormButtons
        display='flex'
        justifyContent='flex-end'
        isLoading={editMutation.isPending}
        disableConfirm={isUploading}
        confirmLabel='Salvar'
        cancelLabel='Cancelar'
        onCancel={onFinish}
        minWidth={['100%', 135]}
      />
    </CForm>
  )
}
