import { Box, Skeleton } from '@mui/material'

import { useFetchPendingActions } from '@/v3/presentation/hooks/api/me/useFetchPendingActions'
import { useFetchCurrentCourses } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchCurrentCourses'

import { PendingSection } from '../../../FirstSection/components/PendingActions/components/PendingSection/PendingSection'

import { CurrentCourseContent } from './components/CurrentCourseContent'

export function CollaboratorSection() {
  const { isLoadingPendingActions, pendingActions } = useFetchPendingActions()
  const { data, isLoading } = useFetchCurrentCourses()

  if (isLoadingPendingActions || isLoading)
    return <Skeleton variant='rectangular' height='190px' width='100%' />

  const showPendingActions = !!pendingActions?.length && !isLoadingPendingActions
  const showCurrentCourses = !!data?.length

  if (!showPendingActions && !showCurrentCourses) return null

  return (
    <Box display='flex' gap={2} flexWrap='wrap'>
      <Box width={showCurrentCourses ? ['100%', '50%'] : '100%'}>
        <PendingSection
          isLoadingPendingActions={!!isLoadingPendingActions}
          pendingActions={pendingActions}
        />
      </Box>
      <CurrentCourseContent courses={data || []} />
    </Box>
  )
}
