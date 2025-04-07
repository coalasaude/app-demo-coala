import React from 'react'

import { Course } from '@/v3/domain/Course'
import { TCourseResponse } from '@/v3/domain/api/ApiCourseResponse'
import { getMeCourseList } from '@/v3/infra/services/course'

import { useFetch } from './useFetch'

export const useFetchMeCourseList = () => {
  const { data: meCourseData, ...rest } = useFetch({
    queryKey: ['me-courses'],
    queryFn: () => getMeCourseList(),
    refetchInterval: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const data: Course[] = React.useMemo(
    () => meCourseData?.data?.results?.map((course: TCourseResponse) => new Course(course)) || [],
    [meCourseData]
  )

  return {
    data,
    ...rest,
  }
}
