import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Divider } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddManyMentalHealthBehavior } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/behavior/useMutateAddManyBehavior'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import { BehaviorForm } from '../BehaviorForm/BehaviorForm'
import {
  FormFieldsProps,
  initialBehaviorsValues,
  initialValues,
  schemaManyBehavior,
} from '../../BehaviorContent.schema'

type Props = {
  userId: number
  onFinish: () => void
}

export const AddBehaviorForm = ({ userId, onFinish }: Props) => {
  const addMutation = useMutateAddManyMentalHealthBehavior()
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schemaManyBehavior),
  })
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const prefix = 'behaviors'
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: prefix,
  })

  const onSubmit = async (body: FormFieldsProps) => {
    await addMutation.mutateAsync({
      userId,
      behaviour: body.behaviors.map((behavior) => ({
        name: behavior.title,
        trigger: behavior.trigger,
        description: behavior.description,
        type: behavior.type,
      })),
    })

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.BEHAVIOUR, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })

    onFinish()
  }

  const handleAdd = () => {
    append(initialBehaviorsValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          const isFirst = index === 0
          return (
            <BehaviorForm
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
