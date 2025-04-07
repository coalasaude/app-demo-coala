import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Course } from '@/v3/domain/Course'
import { getCourse, registerInCourse, deleteCourse } from '@/v3/infra/services/course'

import { useFetch } from './useFetch'

export const useFetchCourse = (id: number) => {
  const { invalidateQueries } = useQueryClient()
  const [status, setStatus] = React.useState<boolean>(false)

  const { data: courseData, ...rest } = useFetch({
    queryKey: ['course', id],
    queryFn: () => getCourse(id),
    refetchInterval: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const { mutate } = useMutation({
    mutationFn: registerInCourse,
    onSuccess: () => {
      setStatus(true)
      invalidateQueries({ queryKey: ['course', 'courses', id] })
    },
  })

  const mutateDelete = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['course', 'courses', id] })
    },
  })

  const data: Course | undefined = React.useMemo(
    () => (courseData?.data ? new Course(courseData?.data) : undefined),
    [courseData]
  )

  const postRegisterInCourse = React.useCallback(
    (id: number) =>
      mutate({
        courseId: id,
      } as any),
    [mutate]
  )

  const reqDeleteCourse = React.useCallback(
    (id: number) =>
      mutateDelete.mutate({
        courseId: id,
      } as any),
    [mutateDelete]
  )

  return {
    data,
    ...rest,
    postRegisterInCourse,
    reqDeleteCourse,
    couldRegister: status,
  }
}
