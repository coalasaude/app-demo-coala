import { Box } from '@mui/material'

import { useFetchBrowseMentalHealthExternalRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/external-register/useFetchBrowseExternalRegister'
import { useMutateDeleteMentalHealthExternalRegister } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/external-register/useMutateDeleteExternalRegister'

import { ListContentProps } from '../../../../../../types/list-content.type'
import { CardContent } from '../components/CardContent'
import { SkeletonContent } from '../components/SkeletonContent'

export const ExternalRegisterListContent = ({ userId, handleEdit }: ListContentProps) => {
  const { results, isLoading } = useFetchBrowseMentalHealthExternalRegister({ userId })
  const deleteMutation = useMutateDeleteMentalHealthExternalRegister()

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
