import { Box, Skeleton } from '@mui/material'

import { useFetchCurrentCourses } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchCurrentCourses'
import { useFetchPendingActions } from '@/v3/presentation/hooks/api/me/useFetchPendingActions'

import { PendingSection } from '../../../FirstSection/components/PendingActions/components/PendingSection/PendingSection'
import { LastApointmentsList } from '../../../MetricsComponents/LastApointmentsList/LastApointmentsList'

export function ResponsibleSection() {
  const { isLoadingPendingActions, pendingActions } = useFetchPendingActions()
  const { data, isLoading } = useFetchCurrentCourses()

  if (isLoadingPendingActions || isLoading)
    return <Skeleton variant='rectangular' height='190px' width='100%' />

  const showPendingActions = !!pendingActions?.length && !isLoadingPendingActions
  const showCurrentCourses = data

  if (!showPendingActions && !showCurrentCourses) return null

  return (
    <Box display='flex' gap={2} flexWrap='wrap'>
      <Box
        flex={1}
        bgcolor={'var(--mui-palette-grey-100)'}
        borderRadius={2}
        width={showCurrentCourses ? ['100%', 'calc(50% - 8px)'] : '100%'}
      >
        <PendingSection
          isLoadingPendingActions={!!isLoadingPendingActions}
          pendingActions={pendingActions}
        />
      </Box>
      <LastApointmentsList />
    </Box>
  )
}
