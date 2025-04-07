import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, Stack } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddManyMentalHealthExternalRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/external-register/useMutateAddManyExternalRegister'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import {
  FormFieldsProps,
  initialExternalRegistersValues,
  initialValues,
  schemaManyExternalRegister,
} from '../../ExternalRegisterContent.schema'
import { ExternalRegisterForm } from '../ExternalRegisterForm/ExternalRegisterForm'

type Props = {
  userId: number
  onFinish: () => void
  isUploading?: boolean
  onUpload: (file: File) => Promise<number>
}

export const AddExternalRegisterForm = ({ userId, onFinish, onUpload, isUploading }: Props) => {
  const addMutation = useMutateAddManyMentalHealthExternalRegister()
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schemaManyExternalRegister),
  })
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const prefix = 'externalRegisters'
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: prefix,
  })

  const onSubmit = async (body: FormFieldsProps) => {
    await addMutation.mutateAsync({
      userId,
      externalRegisters: body.externalRegisters.map((register) => ({
        ...register,
        documentId: register.document?.id ? Number(register.document.id) : null,
      })),
    })

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.EXTERNAL_REGISTER, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })

    onFinish()
  }

  const handleAdd = () => {
    append(initialExternalRegistersValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          const isFirst = index === 0
          return (
            <ExternalRegisterForm
              key={field.id}
              prefix={`${prefix}.${index}.`}
              onDelete={isFirst ? undefined : () => remove(index)}
              onAdd={isFirst ? handleAdd : undefined}
              onUpload={onUpload}
            />
          )
        })}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <FormButtons
        display='flex'
        justifyContent='flex-end'
        isLoading={addMutation.isPending}
        confirmLabel='Salvar'
        disableConfirm={isUploading}
        cancelLabel='Cancelar'
        onCancel={onFinish}
        minWidth={['100%', 135]}
      />
    </CForm>
  )
}
