import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, Stack } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddManyMentalHealthAreaOfInterest } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/area-of-​​interest/useMutateAddManyAreaOfInterest'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import { initiaAcademicValues } from '../AreaOfInterestForm/components/AcademicForm/AcademicForm.type'
import {
  FormFieldsProps,
  initialValues,
  schemaManyInterestAreas,
} from '../../AreaOfInterestContent.schema'
import { AreaOfInterestForm } from '../AreaOfInterestForm/AreaOfInterestForm'

type Props = {
  userId: number
  onFinish: () => void
}

export const AddAreaOfInterestForm = ({ userId, onFinish }: Props) => {
  const addMutation = useMutateAddManyMentalHealthAreaOfInterest()
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schemaManyInterestAreas),
  })
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const prefix = 'interestAreas'
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: prefix,
  })

  const onSubmit = async (body: FormFieldsProps) => {
    await addMutation.mutateAsync({ userId, interestAreas: body.interestAreas })
    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.AREA_OF_INTEREST, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })
    onFinish()
  }

  const handleAdd = () => {
    append(initiaAcademicValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <Stack spacing={2}>
        {fields.map((field, index) => {
          const isFirst = index === 0
          return (
            <AreaOfInterestForm
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
