import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateEditMentalHealthBehavior } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/behavior/useMutateEditBehavior'
import { useFetchReadMentalHealthBehavior } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/behavior/useFetchReadBehavior'

import { SkeletonCard } from '../../../components/SkeletonCard/SkeletonCard'
import {
  FormFieldsBehaviorProps,
  initialBehaviorsValues,
  schemaBehaviors,
} from '../../BehaviorContent.schema'
import { BehaviorForm } from '../BehaviorForm/BehaviorForm'

type Props = {
  id: number
  userId: number
  onFinish: () => void
}

export const EditBehaviorForm = ({ id, userId, onFinish }: Props) => {
  const editMutation = useMutateEditMentalHealthBehavior()
  const { isLoading, behavior } = useFetchReadMentalHealthBehavior({ id, userId })

  const form = useForm({
    defaultValues: initialBehaviorsValues,
    resolver: yupResolver(schemaBehaviors),
  })

  useEffect(() => {
    if (behavior) {
      form.reset({
        description: behavior.description,
        trigger: behavior.trigger,
        title: behavior.title,
        type: behavior.type,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [behavior])

  const onSubmit = async (body: FormFieldsBehaviorProps) => {
    await editMutation.mutateAsync({ userId, id, ...body })
    onFinish()
  }

  if (isLoading || !behavior) {
    return <SkeletonCard />
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <BehaviorForm isEdit />
      <Divider sx={{ my: 2 }} />
      <FormButtons
        display='flex'
        justifyContent='flex-end'
        isLoading={editMutation.isPending}
        confirmLabel='Salvar'
        cancelLabel='Cancelar'
        onCancel={onFinish}
        minWidth={['100%', 135]}
      />
    </CForm>
  )
}
