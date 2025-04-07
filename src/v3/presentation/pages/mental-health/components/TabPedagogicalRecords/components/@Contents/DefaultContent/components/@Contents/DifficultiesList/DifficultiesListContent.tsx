import { Box } from '@mui/material'

import { useFetchBrowseMentalHealthDifficulties } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/difficulties/useFetchBrowseDifficulties'
import { useMutateDeleteMentalHealthDifficulties } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/difficulties/useMutateDeleteDifficulties'

import { ListContentProps } from '../../../../../../types/list-content.type'
import { CardContent } from '../components/CardContent'
import { SkeletonContent } from '../components/SkeletonContent'

export const DifficultiesListContent = ({ userId, handleEdit }: ListContentProps) => {
  const { results, isLoading } = useFetchBrowseMentalHealthDifficulties({ userId })
  const deleteMutation = useMutateDeleteMentalHealthDifficulties()

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync({ id, userId })
  }

  if (isLoading || !results) {
    return <SkeletonContent />
  }

  return (
    <Box display='flex' gap={2} flexDirection='column'>
      {results.data.map((model) => {
        return (
          <CardContent
            key={model.id}
            onDelete={() => handleDelete(model.id)}
            onEdit={() => handleEdit(model.id)}
            title={model.title}
            textLabel='Dificuldade ou desafio'
            text={model.name}
            createdAt={model.createdAt}
            description={model.description}
            descriptionLabel='Descrição'
          />
        )
      })}
    </Box>
  )
}
