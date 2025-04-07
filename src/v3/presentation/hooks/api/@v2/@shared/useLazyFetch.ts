import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export interface IUseLazyFetchProps<T, R> {
  queryKey: any[]
  queryFn: (...args: R[]) => Promise<T>
  onError?: (error: any) => void
  onSuccess?: (data: T) => void
}

export const useLazyFetch = <T, R>({
  queryKey,
  queryFn,
  onError,
  onSuccess,
}: IUseLazyFetchProps<T, R>) => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const fetch = useCallback(
    async (...args: R[]) => {
      setIsLoading(true)

      const data = await queryClient
        .fetchQuery({
          queryKey: [...queryKey, args],
          queryFn: () => queryFn(...args),
          staleTime: 10000,
        })
        .then((response) => {
          if (response) {
            if (onSuccess) {
              onSuccess(response)
            }
          }
          return response
        })
        .catch((error) => {
          if (onError) {
            onError(error)
            throw error
          }
        })
        .finally(() => {
          setIsLoading(false)
        })

      return data
    },
    [onError, onSuccess, queryClient, queryFn, queryKey],
  )

  return { fetch, isLoading }
}
