import { Box } from '@mui/material'

import { useFetchBrowseMentalHealthBehavior } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/behavior/useFetchBrowseBehavior'
import { useMutateDeleteMentalHealthBehavior } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/behavior/useMutateDeleteBehavior'
import { BehaviorType } from '@/v3/domain/@v2/mental-health/enums/behavior-type.enum'

import { ListContentProps } from '../../../../../../types/list-content.type'
import { HeaderContent } from '../components/HeaderContent'
import { SkeletonContent } from '../components/SkeletonContent'
import { BehaviorTypeMap } from '../../../../../../constants/behavior-type.map'

import { BehaviorContentMap } from './constants/behavior-content.map'

export const BehaviorListContent = ({ userId, handleEdit }: ListContentProps) => {
  const { results, isLoading } = useFetchBrowseMentalHealthBehavior({ userId })
  const deleteMutation = useMutateDeleteMentalHealthBehavior()

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync({ id, userId })
  }

  if (isLoading || !results) {
    return <SkeletonContent />
  }

  return (
    <Box display='flex' gap={2} flexDirection='column'>
      {Object.entries(results.data).map(([key, values]) => {
        if (!values.length) return null

        return (
          <Box key={key} display='flex' gap={2} flexDirection='column'>
            <HeaderContent
              numText='registro'
              num={values.length}
              text={BehaviorTypeMap[key as BehaviorType].label}
            />
            {values.map((model) => {
              return (
                <Box key={model.id}>
                  {BehaviorContentMap[key as BehaviorType].component({
                    model,
                    handleDelete,
                    handleEdit: () => handleEdit(model.id),
                  })}
                </Box>
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}
