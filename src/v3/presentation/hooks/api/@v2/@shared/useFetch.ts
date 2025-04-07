import { Query, useQuery } from '@tanstack/react-query'

export interface IUseFetchProps<T> {
  queryKey: any[]
  queryFn: () => Promise<T>
  refetchInterval?: number | false | ((query: Query<T>) => number | false | undefined)
  refetchOnWindowFocus?: boolean
  refetchOnMount?: boolean
  enabled?: boolean
}

export const useFetch = <T>(params: IUseFetchProps<T>) => {
  const query = useQuery<T>({
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...params,
  })

  return query
}
