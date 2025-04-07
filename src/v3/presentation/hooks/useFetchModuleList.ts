import React from 'react'

import { Module } from '@/v3/domain/Module'
import { TModule } from '@/v3/domain/api/ApiCourseResponse'
import { moduleList } from '@/v3/infra/services/course'

import { useFetch } from './useFetch'

export const useFetchModuleList = (id: number) => {
  const { data: moduleData, ...rest } = useFetch({
    queryKey: ['modules'],
    queryFn: () => moduleList(id),
    refetchInterval: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const data: Module[] = React.useMemo(
    () => moduleData?.data?.map((moduleRes: TModule) => new Module(moduleRes)) || [],
    [moduleData]
  )

  return {
    data,
    ...rest,
  }
}
