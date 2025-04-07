import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateEditMentalHealthDifficulties } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/difficulties/useMutateEditDifficulties'
import { useFetchReadMentalHealthDifficulties } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/difficulties/useFetchReadDifficulties'

import { SkeletonCard } from '../../../components/SkeletonCard/SkeletonCard'
import {
  FormFieldsDifficultiesProps,
  initialDifficultiessValues,
  schemaDifficultiess,
} from '../../DifficultiesContent.schema'
import { DifficultiesForm } from '../DifficultiesForm/DifficultiesForm'

type Props = {
  id: number
  userId: number
  onFinish: () => void
}

export const EditDifficultiesForm = ({ id, userId, onFinish }: Props) => {
  const editMutation = useMutateEditMentalHealthDifficulties()
  const { isLoading, difficulties } = useFetchReadMentalHealthDifficulties({ id, userId })

  const form = useForm({
    defaultValues: initialDifficultiessValues,
    resolver: yupResolver(schemaDifficultiess),
  })

  useEffect(() => {
    if (difficulties) {
      form.reset({
        description: difficulties.description,
        name: difficulties.name,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulties])

  const onSubmit = async (body: FormFieldsDifficultiesProps) => {
    await editMutation.mutateAsync({ userId, id, title: body.name, ...body })
    onFinish()
  }

  if (isLoading || !difficulties) {
    return <SkeletonCard />
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <DifficultiesForm />
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
