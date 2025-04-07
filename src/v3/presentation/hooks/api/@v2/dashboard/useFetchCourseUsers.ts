import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getCourseUsers } from '@/v3/infra/services/@v2/dashboard/dashboard'
import { DashboardQueryParams } from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import { CourseUsersOutput } from '@/v3/domain/organizations/Dashboard'
import {
  getUserCourseStatus,
  PersonCourseType,
} from '@/v3/presentation/pages/organizations/pages/view/components/InstitutionCharts/Ranking/components/PersonCourse/type'

import { useFetch } from '../@shared/useFetch'

export const useFetchCourseUsers = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<CourseUsersOutput[]>({
    queryFn: () => getCourseUsers(params),
    queryKey: [QueryKeyEnum.DASHBOARD_COURSE_USERS, params],
  })

  const data = useMemo(() => {
    if (!response?.length) return []

    return response?.map((user) => {
      return {
        id: user.id,
        name: user.name,
        profile: user.profile,
        status: getUserCourseStatus(user),
      }
    }) as PersonCourseType
  }, [response])

  return {
    data,
    ...rest,
  }
}
