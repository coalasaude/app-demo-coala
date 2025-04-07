import React from 'react'

import { Course } from '@/v3/domain/Course'
import { TCourseResponse } from '@/v3/domain/api/ApiCourseResponse'
import { CourseApiFilter, listMyCourse } from '@/v3/infra/services/course'

import { useFetch } from './useFetch'

export const useFetchMyCourseList = () => {
  const [filter, setFilter] = React.useState<CourseApiFilter>({})
  const { data: myCourseData, ...rest } = useFetch({
    queryKey: ['my-courses', filter],
    queryFn: () => listMyCourse(filter),
    refetchInterval: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const data: Course[] = React.useMemo(
    () => myCourseData?.data?.results.map((course: TCourseResponse) => new Course(course)) || [],
    [myCourseData]
  )

  return {
    data,
    filter,
    setFilter,
    ...rest,
  }
}
