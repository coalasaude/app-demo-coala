import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { PedagogicalRecordType } from '@/v3/domain/@v2/mental-health/enums/pedagogical-record-type.enum'
import { useFetchBrowseMentalHealthRegisterCategories } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/categories/useFetchBrowseCategories'
import { useAvailableMentalHealthTabs } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthTabs'

import { ListContentMap } from '../../../constants/list-content.map'
import { EmptyRegisters } from '../../EmptyRegisters'
import { ManageContentProps } from '../../../types/manage-content.type'
import canViewContentRecords from '../../../constants/can-view-content-records'

import { AccordionContent } from './components/AccordionContent'
import { ListSkeletonContent } from './components/SkeletonContent'

export const DefaultContent = ({
  userId,
  onAdd: handleAdd,
  onEdit: handleEdit,
}: ManageContentProps) => {
  const { results, isLoading, isRefetching } = useFetchBrowseMentalHealthRegisterCategories({
    userId,
  })
  const { canViewPermissions: permissions } = useAvailableMentalHealthTabs()
  const [open, setOpen] = useState<Partial<Record<PedagogicalRecordType, boolean>>>({})

  useEffect(() => {
    const type = results?.data[0]
    if (type) setOpen({ [type]: true })
  }, [results])

  if (isLoading || !results || isRefetching) {
    return <ListSkeletonContent />
  }

  const isEmpty = !results?.data.length

  return (
    <Box>
      <Typography display={['block', 'none']} fontSize={22} fontWeight={500} mb={3}>
        Todos os registros
      </Typography>
      {results.data.map((type) => {
        const { label } = ListContentMap[type]
        const canView = canViewContentRecords({ label, permissions })

        return (
          <>
            {canView && (
              <AccordionContent
                onAdd={() => handleAdd({ type })}
                isOpen={!!open[type]}
                setIsOpen={(isOpen) => setOpen({ ...open, [type]: isOpen })}
                key={type}
                label={ListContentMap[type].label}
              >
                {ListContentMap[type].component({
                  userId,
                  handleEdit: (id, category) => handleEdit({ type, id, category }),
                })}
              </AccordionContent>
            )}
          </>
        )
      })}
      {isEmpty && <EmptyRegisters />}
    </Box>
  )
}
