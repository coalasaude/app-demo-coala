import { Box } from '@mui/material'

import { useFetchBrowseMentalHealthCoalaRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/coala-register/useFetchBrowseCoalaRegister'
import { useMutateDeleteMentalHealthCoalaRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/coala-register/useMutateDeleteCoalaRegister'

import { ListContentProps } from '../../../../../../types/list-content.type'
import { CardContent } from '../components/CardContent'
import { SkeletonContent } from '../components/SkeletonContent'

export const CoalaRegistersListContent = ({ userId, handleEdit }: ListContentProps) => {
  const { results, isLoading } = useFetchBrowseMentalHealthCoalaRegister({ userId })
  const deleteMutation = useMutateDeleteMentalHealthCoalaRegister()

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
            textLabel='Profissional'
            withProfessional
            text={model.professional.name}
            secondTextLabel={model.professional.registerType}
            secondText={model.professional.register}
            file={model.file}
            createdAt={model.createdAt}
            description={model.description}
            descriptionLabel='Descrição'
          />
        )
      })}
    </Box>
  )
}
