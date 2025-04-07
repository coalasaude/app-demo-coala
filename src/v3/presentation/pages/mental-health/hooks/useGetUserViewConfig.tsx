import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { UserViewConfigKeys } from '../types/userViewConfigKeys'

export const useGetUserViewConfig = (): UserViewConfigKeys => {
  const { auth } = useAuth()

  if (auth.user?.children) {
    return UserViewConfigKeys.RESPONSIBLE
  }

  if (auth?.user?.isChild) {
    return UserViewConfigKeys.CHILD
  }

  return UserViewConfigKeys.NO_PERMISSION
}
