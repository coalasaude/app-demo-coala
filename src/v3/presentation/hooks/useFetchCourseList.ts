import React from 'react'

import { Course } from '@/v3/domain/Course'
import { TCourseResponse } from '@/v3/domain/api/ApiCourseResponse'
import { CourseApiFilter, listCourse } from '@/v3/infra/services/course'

import { useFetch } from './api/@v2/@shared/useFetch'

export const useFetchCourseList = (userId: number) => {
  const [filter, setFilter] = React.useState<CourseApiFilter>({})
  const { data: courseData, ...rest } = useFetch({
    queryKey: ['courses', filter, userId],
    queryFn: () => listCourse(filter),
    refetchOnMount: true,
  })

  const data: Course[] = React.useMemo(
    () => courseData?.data?.results.map((course: TCourseResponse) => new Course(course)) || [],
    [courseData],
  )

  return {
    data,
    filter,
    setFilter,
    ...rest,
  }
}
