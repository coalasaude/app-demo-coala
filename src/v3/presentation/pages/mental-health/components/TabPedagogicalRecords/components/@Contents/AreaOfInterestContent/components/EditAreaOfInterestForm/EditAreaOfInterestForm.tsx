import { yupResolver } from '@hookform/resolvers/yup'
import { Divider } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useFetchReadMentalHealthAreaOfInterest } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/area-of-​​interest/useFetchReadAreaOfInterest'
import { useMutateEditMentalHealthAreaOfInterest } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/area-of-​​interest/useMutateEditAreaOfInterest'
import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import { SkeletonCard } from '../../../components/SkeletonCard/SkeletonCard'
import {
  FormFieldsInterestAreasProps,
  initialInterestAreasValues,
  schemaInterestAreas,
} from '../../AreaOfInterestContent.schema'
import { AreaOfInterestForm } from '../AreaOfInterestForm/AreaOfInterestForm'

type Props = {
  id: number
  userId: number
  onFinish: () => void
}

export const EditAreaOfInterestForm = ({ id, userId, onFinish }: Props) => {
  const router = useRouter()
  const category = router.query.category as InterestAreaCategory
  const editMutation = useMutateEditMentalHealthAreaOfInterest()
  const { isLoading, areaOfInterest } = useFetchReadMentalHealthAreaOfInterest({
    id,
    category,
    userId,
  })

  const form = useForm({
    defaultValues: initialInterestAreasValues,
    resolver: yupResolver(schemaInterestAreas),
  })

  useEffect(() => {
    if (areaOfInterest) {
      form.reset({
        category: areaOfInterest.category,
        interestSubjectIds: areaOfInterest.interestSubjects?.map((subject) => subject.id),
        observation: areaOfInterest.observation,
        proficientSubjectIds: areaOfInterest.proficientSubjects?.map((subject) => subject.id),
        title: areaOfInterest.title,
        interests: areaOfInterest.interests,
        proficients: areaOfInterest.proficients,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaOfInterest])

  const onSubmit = async (body: FormFieldsInterestAreasProps) => {
    await editMutation.mutateAsync({ userId, id, ...body })
    onFinish()
  }

  if (isLoading || !areaOfInterest) {
    return <SkeletonCard />
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <AreaOfInterestForm isEdit={true} />
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
