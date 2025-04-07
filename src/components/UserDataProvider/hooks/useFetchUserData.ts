import { useCallback } from 'react'

import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateGetMe } from '@/v3/presentation/hooks/api/@v2/users/me/useMutateMe'

import { useSetExpoToken } from './useSetExpoToken'

export const useFetchUserData = () => {
  const { setAuth, logout } = useAuth()
  const { getMeMutate } = useMutateGetMe()
  const setExpoToken = useSetExpoToken()

  return useCallback(async () => {
    const { user, institutionalSettings, token } = await getMeMutate()
    if (user && institutionalSettings) {
      setAuth({ user, userId: user.id, institutionalSettings , token})
      await setExpoToken()
    } else {
      logout()
    }
  }, [getMeMutate, setAuth, logout, setExpoToken])
}
