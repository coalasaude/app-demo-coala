import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, Stack } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddManyMentalHealthDifficulties } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/difficulties/useMutateAddManyDifficulties'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import {
  FormFieldsProps,
  initialDifficultiessValues,
  initialValues,
  schemaManyDifficulties,
} from '../../DifficultiesContent.schema'
import { DifficultiesForm } from '../DifficultiesForm/DifficultiesForm'

type Props = {
  userId: number
  onFinish: () => void
}

export const AddDifficultiesForm = ({ userId, onFinish }: Props) => {
  const addMutation = useMutateAddManyMentalHealthDifficulties()
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schemaManyDifficulties),
  })
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const prefix = 'difficulties'
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: prefix,
  })

  const onSubmit = async (body: FormFieldsProps) => {
    const difficulties = body.difficulties.map(({ name, description }) => ({
      title: name,
      name,
      description,
    }))

    await addMutation.mutateAsync({ userId, difficulties })

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.DIFFICULTIES, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })

    onFinish()
  }

  const handleAdd = () => {
    append(initialDifficultiessValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          const isFirst = index === 0
          return (
            <DifficultiesForm
              key={field.id}
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
        confirmLabel='Salvar'
        cancelLabel='Cancelar'
        onCancel={onFinish}
        minWidth={['100%', 135]}
      />
    </CForm>
  )
}
