import { Box } from '@mui/material'

import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'
import { useFetchBrowseMentalHealthAreaOfInterest } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/area-of-​​interest/useFetchBrowseAreaOfInterest'
import { useMutateDeleteMentalHealthAreaOfInterest } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/area-of-​​interest/useMutateDeleteAreaOfInterest'

import { PedagogicalAreaTypeMap } from '../../../../../../constants/pedagogical-area-type.map'
import { ListContentProps } from '../../../../../../types/list-content.type'
import { SkeletonContent } from '../components/SkeletonContent'
import { HeaderContent } from '../components/HeaderContent'

import { AreaContentMap } from './constants/area-content.map'

export const AreaOfInterestListContent = ({ userId, handleEdit }: ListContentProps) => {
  const { results, isLoading } = useFetchBrowseMentalHealthAreaOfInterest({ userId })
  const deleteMutation = useMutateDeleteMentalHealthAreaOfInterest()

  const handleDelete = async (id: number, category: InterestAreaCategory) => {
    await deleteMutation.mutateAsync({ id, userId, category })
  }

  const handleEditArea = (id: number, category: InterestAreaCategory) => {
    handleEdit(id, category)
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
              num={values.length}
              text={PedagogicalAreaTypeMap[key as InterestAreaCategory].label}
            />
            {values.map((area) => {
              return (
                <Box key={area.id}>
                  {AreaContentMap[key as InterestAreaCategory].component({
                    model: area,
                    handleDelete,
                    handleEdit: () => handleEditArea(area.id, key as InterestAreaCategory),
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
