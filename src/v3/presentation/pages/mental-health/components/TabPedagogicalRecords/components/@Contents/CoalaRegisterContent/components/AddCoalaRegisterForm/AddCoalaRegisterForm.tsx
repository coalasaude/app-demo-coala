import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, Stack } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddManyMentalHealthCoalaRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/coala-register/useMutateAddManyCoalaRegister'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import {
  FormFieldsProps,
  initialCoalaRegistersValues,
  initialValues,
  schemaManyCoalaRegister,
} from '../../CoalaRegisterContent.schema'
import { CoalaRegisterForm } from '../CoalaRegisterForm/CoalaRegisterForm'

type Props = {
  userId: number
  onFinish: () => void
  isUploading?: boolean
  onUpload: (file: File) => Promise<number>
}

export const AddCoalaRegisterForm = ({ userId, onFinish, onUpload, isUploading }: Props) => {
  const addMutation = useMutateAddManyMentalHealthCoalaRegister()
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schemaManyCoalaRegister),
  })
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const prefix = 'coalaRegisters'
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: prefix,
  })

  const onSubmit = async (body: FormFieldsProps) => {
    await addMutation.mutateAsync({
      userId,
      coalaRegisters: body.coalaRegisters.map((register) => ({
        ...register,
        documentId: register.document?.id ? Number(register.document.id) : null,
      })),
    })

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.COALA_REGISTER, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })

    onFinish()
  }

  const handleAdd = () => {
    append(initialCoalaRegistersValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          const isFirst = index === 0
          return (
            <CoalaRegisterForm
              key={field.id}
              onUpload={onUpload}
              prefix={`${prefix}.${index}.`}
              onDelete={isFirst ? undefined : () => remove(index)}
              onAdd={isFirst ? handleAdd : undefined}
            />
          )
        })}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <FormButtons
        display='flex'
        justifyContent='flex-end'
        isLoading={addMutation.isPending}
        disableConfirm={isUploading}
        confirmLabel='Salvar'
        cancelLabel='Cancelar'
        onCancel={onFinish}
        minWidth={['100%', 135]}
      />
    </CForm>
  )
}
