import { useFetchPendingActions } from '@/v3/presentation/hooks/api/me/useFetchPendingActions'

import { PendingSection } from './components/PendingSection/PendingSection'

export const PendingActions = () => {
  const { isLoadingPendingActions, pendingActions } = useFetchPendingActions()

  if (pendingActions?.length === 0 || isLoadingPendingActions) return null

  return (
    <PendingSection
      isLoadingPendingActions={!!isLoadingPendingActions}
      pendingActions={pendingActions}
    />
  )
}
