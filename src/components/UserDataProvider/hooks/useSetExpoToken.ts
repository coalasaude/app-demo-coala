import { useCallback } from 'react'

import { useMutateExpoToken } from '@/v3/presentation/hooks/api/@v2/auth/useMutateExpoToken'

export const useSetExpoToken = () => {
  const { mutate: mutateExpoToken } = useMutateExpoToken()

  return useCallback(async () => {
    const expoToken = (document as any)?.expoToken
    if (expoToken) {
      mutateExpoToken({ token: expoToken })
    }
  }, [mutateExpoToken])
}
