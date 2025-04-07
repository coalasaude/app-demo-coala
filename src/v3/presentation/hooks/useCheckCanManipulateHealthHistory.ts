import { UserModel } from '@/v3/domain/@v2/users/users.model'

import { useAuth } from './useAuth'
import { useHealthHistoryAccess } from './useHealthHistoryAccess'

export const useCheckCanManipulateHealthHistory = (
  user: UserModel
): {
  canManipulate: boolean
  isSameUserOrChild: boolean | undefined
} => {
  const { auth } = useAuth()
  const canUseHealthHistory = useHealthHistoryAccess({ userId: user.id || 0 })
  const isSameUser = auth.userId === user.id
  const canManipulate = isSameUser ? user?.roles?.length > 0 : canUseHealthHistory

  const isChild = auth?.user?.children?.some((child) => user.id === child.id)

  return { canManipulate, isSameUserOrChild: isSameUser || isChild }
}
