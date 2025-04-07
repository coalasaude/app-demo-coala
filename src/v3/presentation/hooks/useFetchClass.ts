import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Class } from '@/v3/domain/Class'
import { TClass } from '@/v3/domain/api/ApiCourseResponse'
import { getClass, registerStudentAttendance } from '@/v3/infra/services/course'

import { useFetch } from './useFetch'

export const useFetchClass = (classId: number) => {
  const { invalidateQueries } = useQueryClient()

  const { data: classData, ...rest } = useFetch({
    queryKey: ['class', classId],
    queryFn: () => getClass(classId),
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  const { mutate } = useMutation({
    mutationFn: registerStudentAttendance,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['class', classId] })
    },
  })

  const data: Class | undefined = React.useMemo(
    () => (classData?.data ? new Class(classData.data as TClass) : undefined),
    [classData]
  )

  return {
    data,
    registerAttendance: () => mutate(classId),
    ...rest,
  }
}
