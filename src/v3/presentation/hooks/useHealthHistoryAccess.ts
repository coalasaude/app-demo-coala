import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'

import { useAuth } from './useAuth'

export const useHealthHistoryAccess = ({ userId }: { userId: number }) => {
  const { auth } = useAuth()
  const [canUseHealthHistory, canUseOtherHealthHistory] = useHasPermission([
    Permissions.MANAGE_HEALTH_HISTORY,
    Permissions.MANAGE_OTHER_HEALTH_HISTORY,
  ])

  const isChild = auth.user?.children?.some((child) => child.id === userId)
  const isSame = auth.user?.id === userId

  if (isChild || isSame) {
    return canUseHealthHistory
  }

  return canUseOtherHealthHistory
}
