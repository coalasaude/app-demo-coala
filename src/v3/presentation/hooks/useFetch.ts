import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { AuthStorage } from '@/services/AuthStorage'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import asynRequest, { TRequest } from '../../infra/services/api'

import { useRequest } from './useRequest'

export interface ILazyFetch<T> {
  loading?: boolean
  data?: T
  error?: {
    code?: number
    data?: any
  }
}

interface HookParams {
  useSpinner?: boolean
}
export const useLazyFetch = <T extends Record<string, any>>({
  useSpinner: hUseSpinner,
}: HookParams = {}): [(params: TRequest<T>) => Promise<ILazyFetch<T>>, ILazyFetch<T>] => {
  const { isLoaded, auth } = useAuth()
  const { setRequestCounter } = useRequest()
  const [data, setData] = useState<ILazyFetch<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  })

  const apiRequest = useCallback(
    async ({ useSpinner, ...params }: TRequest<T>) => {
      const withSpinner = hUseSpinner || useSpinner
      if (!isLoaded) {
        return {}
      }

      if (withSpinner) {
        setRequestCounter((prevState) => prevState + 1)
      }
      setData((prevState) => ({
        ...prevState,
        loading: true,
      }))

      let data = params

      if (
        params.useApiFilters &&
        (auth.accessToken || auth.selectedInstitution || auth.selectedChildren || auth.selfAccess)
      ) {
        const storage = AuthStorage.get()
        data = Object.assign(data, {
          headers: {
            'x-institution-id': storage.selectedInstitution,
            'x-children-id': storage.selectedChildren,
            'x-self-access': storage.selfAccess,
          },
        })
      }

      const response = await asynRequest<T>(data)

      if (withSpinner) {
        setRequestCounter((prevState) => prevState - 1)
      }

      if (
        (response instanceof Boolean && !response) ||
        (response instanceof Object && response && 'isError' in response)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isError, ...others } = response
        setData({
          loading: false,
          error: others,
        })
        return {
          error: others,
        }
      }
      const formattedValues = params.formatter ? params.formatter(response) : response
      setData({
        loading: false,
        data: formattedValues,
      })
      return {
        data: formattedValues,
      }
    },
    [setData, isLoaded, setRequestCounter, hUseSpinner, auth]
  )

  return [apiRequest, data]
}

export interface IUseFetchProps {
  queryKey: any[]
  queryFn: () => Promise<any>
  refetchInterval?: number
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
}

export interface IUseFetch<T = any> {
  data?: T
  error?: unknown
  isError?: boolean
  fetchStatus?: 'fetching' | 'paused' | 'idle'
  isLoading?: boolean
  isPaused?: boolean
  isSuccess?: boolean
  status?: 'error' | 'success' | 'pending'
  refetch: () => void
}

/**
 * @deprecated - Use useFetch from v2
 */
export const useFetch = <T = any>({
  queryKey,
  queryFn,
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
}: IUseFetchProps): IUseFetch<T> => {
  const { data, error, isError, fetchStatus, isLoading, isPaused, isSuccess, status, refetch } =
    useQuery<T>({
      queryKey,
      queryFn,
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
    })

  return {
    data,
    error,
    isError,
    fetchStatus,
    isLoading,
    isPaused,
    isSuccess,
    status,
    refetch,
  }
}
