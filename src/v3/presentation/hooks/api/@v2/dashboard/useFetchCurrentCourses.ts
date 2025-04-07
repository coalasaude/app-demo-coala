import { getCurrentCourses } from '@/v3/infra/services/@v2/dashboard/get-current-course'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../@shared/useFetch'

export const useFetchCurrentCourses = () => {
  const { data, ...rest } = useFetch({
    queryFn: () => getCurrentCourses(),
    queryKey: [QueryKeyEnum.DASHBOARD_CURRENT_COURSES],
  })

  return {
    data,
    ...rest,
  }
}
